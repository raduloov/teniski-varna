import React, { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { v4 as uuid4 } from 'uuid';
import {
  TShirtSize,
  TShirtSizes,
  TShirtType
} from '../../domain/models/ProductDTO';
import { db, storage } from '../../firebase/firebaseConfig';
import { Color } from '../../assets/constants';
import { ImageInput } from '../../components/common/ImageInput';
import { Checkbox } from '../../components/common/Checkbox';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
  ColorImages,
  defaultImagesObj,
  defaultImageDetails,
  defaultSizesObj,
  ImageDetails,
  selectLabelIds,
  SizesCheckbox,
  supportedImageTypes,
  mapSizeToString
} from './utils';
import { Label, useLabels } from '../../hooks/useLabels';
import { EdittableAndSelectableItems } from '../../components/common/EdittableAndSelectableItems';
import { ColorTile } from '../../components/common/ColorTile';

export const NewProductContainer = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
  const [images, setImages] = useState<ColorImages>(defaultImagesObj);
  const [sizes, setSizes] = useState<SizesCheckbox>(defaultSizesObj.all);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getLabels, isFetchingLabels } = useLabels();

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    setLabelsFromFirebase();
  }, []);

  const imageForTypeIsSelected = (type: TShirtType) =>
    Object.values(images[type]).some((image) => image);

  const noImagesAreSelected =
    Object.values(images.men).every((image) => image === null) &&
    Object.values(images.women).every((image) => image === null) &&
    Object.values(images.kids).every((image) => image === null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice(0);
    setImages(defaultImagesObj);
    setThumbnailImage(null);
    setSizes(defaultSizesObj.all);
  };

  const handleSelectImage = (
    files: FileList | null,
    color: string,
    colors: keyof ColorImages
  ) => {
    if (files) {
      setImages({
        ...images,
        [colors]: {
          ...images[colors],
          [color]: files[0]
        }
      });
    }
  };

  const handleSelectSize = (size: TShirtSize, sizeType: TShirtType) => {
    const newSizes = {
      ...sizes,
      [sizeType]: {
        ...sizes[sizeType],
        [size]:
          // @ts-ignore
          !sizes[sizeType][size]
      }
    };
    setSizes(newSizes);
  };

  const createProduct = async () => {
    if (noImagesAreSelected || !thumbnailImage) {
      return;
    }

    const productId = uuid4();

    let imageDetails: ImageDetails = JSON.parse(
      JSON.stringify(defaultImageDetails)
    );
    const thumbnailImageDetails = {
      name: '',
      url: ''
    };
    for (const [colorType, colors] of Object.entries(images)) {
      for await (const [color, image] of Object.entries(colors)) {
        if (image) {
          const storageRef = ref(
            storage,
            `images/${productId}/${title}-${colorType}-${color}`
          );
          const snapshot = await uploadBytes(storageRef, image as File);
          const imageUrl = await getDownloadURL(snapshot.ref);

          const imageName = (image as File).name;

          imageDetails = {
            ...imageDetails,
            [colorType as keyof ImageDetails]: {
              ...imageDetails[colorType as keyof ImageDetails],
              [color]: {
                name: imageName,
                url: imageUrl
              }
            }
          };

          if (thumbnailImage === imageName) {
            thumbnailImageDetails.name = imageName;
            thumbnailImageDetails.url = imageUrl;
          }
        }
      }
    }

    const sizesObj: TShirtSizes = {
      men: [],
      women: [],
      kids: [],
      oversized: []
    };
    for (const [sizeType, sizesArray] of Object.entries(sizes)) {
      const imageSelected = imageForTypeIsSelected(sizeType as TShirtType);
      if (!imageSelected) {
        continue;
      }

      for (const [size, selected] of Object.entries(sizesArray)) {
        if (selected) {
          sizesObj[sizeType as TShirtType].push(size as TShirtSize);
        }
      }
    }

    const product = {
      title,
      description,
      price,
      thumbnail: thumbnailImageDetails,
      images: imageDetails,
      sizes: sizesObj,
      labels: selectedLabelIds
    };

    await setDoc(doc(db, 'products', productId), product);
  };

  const addNewProduct = async () => {
    if (!title) {
      return toast.error('💥 Please add a title for your product!');
    }
    if (!description) {
      return toast.error('💥 Please add a description for your product.');
    }
    if (!price) {
      return toast.error('💥 Please add a price for your product.');
    }
    if (noImagesAreSelected) {
      return toast.error('💥 Please add at least one image for your product.');
    }
    if (!thumbnailImage) {
      return toast.error('💥 Please add a thumbnail image for your product.');
    }
    const hasSize = Object.values(sizes).filter((selected) => selected).length;
    if (!hasSize) {
      return toast.error(
        '💥 Please choose at least one size for your product.'
      );
    }

    setIsLoading(true);
    try {
      await createProduct();

      resetForm();
      return toast.success('Product added successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Add new product</Title>
      <InputContainer>
        <Text>Title</Text>
        <Input
          value={title}
          placeholder={'Title...'}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Text>Description</Text>
        <Input
          value={description}
          placeholder={'Description...'}
          onChange={(e) => setDescription(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Text>Price</Text>
        <Input
          value={price}
          placeholder={'Price...'}
          type={'number'}
          onChange={(e) => setPrice(e.target.value)}
        />
      </InputContainer>
      <Text>Thumbnail Image</Text>
      <SizesWrapper>
        <ImageInputContainer>
          <SmallText>Thumbnail:</SmallText>
          <Thumbnail thumbnail={thumbnailImage}>
            {thumbnailImage ?? 'N/A'}
          </Thumbnail>
        </ImageInputContainer>
      </SizesWrapper>
      <Text>Images</Text>
      <SizesWrapper>
        <ImageInputWrapper>
          {Object.keys(images).map((colors, index) => (
            <ColorTypeContainer key={index}>
              <SmallText key={index}>{colors.toUpperCase()}:</SmallText>
              {Object.keys(images[colors as keyof ColorImages]).map(
                (color, index) => (
                  <ImageInputContainer key={index}>
                    <ColorTile color={color} />
                    <ImageInput
                      fileName={
                        // @ts-ignore
                        images[colors as keyof ColorImages][color]?.name
                      }
                      supportedTypes={supportedImageTypes}
                      onChange={(e) =>
                        handleSelectImage(
                          e.target.files,
                          color,
                          colors as keyof ColorImages
                        )
                      }
                      onMakeThumbnail={(fileName) =>
                        setThumbnailImage(fileName)
                      }
                      thumbnailSelected={
                        thumbnailImage ===
                        // @ts-ignore
                        images[colors as keyof ColorImages][color]?.name
                      }
                    />
                  </ImageInputContainer>
                )
              )}
            </ColorTypeContainer>
          ))}
        </ImageInputWrapper>
      </SizesWrapper>
      <Text>T-Shirt Sizes</Text>
      <SizesWrapper>
        {Object.keys(sizes).map((sizeType, index) => {
          const showSizesForType = imageForTypeIsSelected(
            sizeType as TShirtType
          );

          return (
            <SizesRow disabled={!showSizesForType} key={index}>
              <SmallText key={index}>{sizeType.toUpperCase()}:</SmallText>
              <InputContainer key={index}>
                <SizesContainer>
                  {Object.keys(sizes[sizeType as TShirtType]).map(
                    (size, index) => {
                      const checked =
                        // @ts-ignore
                        sizes[sizeType][size];

                      return (
                        <CheckboxContainer key={index}>
                          <Checkbox
                            label={mapSizeToString(size as TShirtSize)}
                            checked={checked}
                            onClick={() =>
                              handleSelectSize(
                                size as TShirtSize,
                                sizeType as TShirtType
                              )
                            }
                          />
                        </CheckboxContainer>
                      );
                    }
                  )}
                </SizesContainer>
              </InputContainer>
            </SizesRow>
          );
        })}
      </SizesWrapper>
      <InputContainer>
        <Text>Labels</Text>
        <EdittableAndSelectableItems
          items={labels}
          selectedItemIds={selectedLabelIds}
          handleSelectItem={(labelId) =>
            selectLabelIds(labelId, selectedLabelIds, setSelectedLabelIds)
          }
          isFetchingItems={isFetchingLabels}
          selective
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          label={'Add new product'}
          loading={isLoading}
          onClick={addNewProduct}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

const Thumbnail = styled.div<{ thumbnail: string | null }>`
  border: none;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.thumbnail ? Color.ACCENT : Color.LIGHT_GRAY};
  border-radius: 2rem;
  color: ${(props) => (props.thumbnail ? Color.BLACK : Color.GRAY)};
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const SizesRow = styled.div<{ disabled: boolean }>`
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      opacity: 0.25;
      filter: blur(2px);
  `}
`;

const ColorTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${Color.GRAY};
  padding-bottom: 10px;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SizesWrapper = styled.div`
  margin: 10px 0 10px 0;
  padding: 10px;
  background-color: ${Color.DARK_GRAY};
  border-radius: 10px;
  overflow-y: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SizesContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SmallText = styled.p`
  color: ${Color.WHITE};
`;

const ImageInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: ${Color.WHITE};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0 10px 0;
`;

const Title = styled.p`
  font-size: 24px;
  color: ${Color.WHITE};
`;

const Wrapper = styled.div`
  padding-top: 20px;
`;
