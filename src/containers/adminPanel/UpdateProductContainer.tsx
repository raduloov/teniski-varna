import React, { useEffect, useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  listAll,
  deleteObject
} from 'firebase/storage';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import {
  Product,
  TShirtSize,
  TShirtSizes,
  TShirtType
} from '../../domain/models/ProductDTO';
import { db, storage } from '../../firebase/firebaseConfig';
import { useProducts } from '../../hooks/useProducts';
import { Input } from '../../components/common/Input';
import { ImageInput } from '../../components/common/ImageInput';
import { Checkbox } from '../../components/common/Checkbox';
import { Button } from '../../components/common/Button';
import {
  ColorImages,
  defaultImageDetails,
  defaultImagesObj,
  defaultSizesObj,
  ImageDetails,
  mapSizeToString,
  selectLabelIds,
  SizesCheckbox,
  supportedImageTypes
} from './utils';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { EdittableAndSelectableItems } from '../../components/common/EdittableAndSelectableItems';
import { Label, useLabels } from '../../hooks/useLabels';
import { ColorTile } from '../../components/common/ColorTile';

interface Props {
  productId: string;
  handleBackToAllProducts: () => void;
}

export const UpdateProductContainer = ({
  productId,
  handleBackToAllProducts
}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [images, setImages] = useState<ColorImages | ImageDetails>(
    defaultImagesObj
  );
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);
  const [sizes, setSizes] = useState<SizesCheckbox>(defaultSizesObj.none);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState<boolean>(false);

  const { getProductById, isLoading: isFetchingProduct } = useProducts();
  const { getLabels, isFetchingLabels } = useLabels();

  const setLabelsFromFirebase = async () => {
    const fetchedLabels = await getLabels();
    setLabels(fetchedLabels);
  };

  useEffect(() => {
    const getProductAndFillForm = async () => {
      const product = await getProductById(productId);

      if (!product) {
        return toast.error('💥 Product not found!');
      }

      if (product) {
        setLabelsFromFirebase();
        fillForm(product);
      }
    };

    getProductAndFillForm();
  }, []);

  const imageForTypeIsSelected = (type: TShirtType) =>
    Object.values(images[type]).some((image) => image);

  const fillForm = (product: Product) => {
    const hasSelectedProduct = !!product.id;

    setTitle(hasSelectedProduct ? product.title : '');
    setDescription(product.description);
    setPrice(hasSelectedProduct ? product.price : '');
    setImages(product.images);
    setThumbnailImage(product.thumbnail.name);
    setSizes(mapSizesToObject(product.sizes));
    setSelectedLabelIds(product.labels);
  };

  const mapSizesToObject = (sizes: TShirtSizes): SizesCheckbox => {
    const productSizes: SizesCheckbox = JSON.parse(
      JSON.stringify(defaultSizesObj.none)
    );

    for (const [sizeType, sizesArray] of Object.entries(productSizes)) {
      for (const [size] of Object.entries(sizesArray)) {
        for (const productSize of sizes[sizeType as TShirtType]) {
          if (productSize === size) {
            // @ts-ignore
            productSizes[sizeType as TShirtType][productSize] = true;
          }
        }
      }
    }

    return productSizes;
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

  const updateProduct = async () => {
    let imageDetails: ImageDetails = JSON.parse(
      JSON.stringify(defaultImageDetails)
    );
    const thumbnailImageDetails = {
      name: '',
      url: ''
    };
    for (const [colorType, colors] of Object.entries(images)) {
      for await (const [color, image] of Object.entries(colors)) {
        let imageName = '';
        let imageUrl = '';

        if (image) {
          // @ts-ignore
          if (image.name && image.url) {
            // @ts-ignore
            imageName = image.name;
            // @ts-ignore
            imageUrl = image.url;
          } else {
            const storageRef = ref(
              storage,
              `images/${productId}/${title}-${colorType}-${color}`
            );
            const snapshot = await uploadBytes(storageRef, image as File);
            imageUrl = await getDownloadURL(snapshot.ref);

            imageName = (image as File).name;
          }

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
        }

        if (thumbnailImage === imageName) {
          thumbnailImageDetails.name = imageName;
          thumbnailImageDetails.url = imageUrl;
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

    const updatedProduct = {
      title,
      description,
      price,
      thumbnail: thumbnailImageDetails,
      images: imageDetails,
      sizes: sizesObj,
      labels: selectedLabelIds
    };

    await updateDoc(doc(db, 'products', productId), updatedProduct);
  };

  const updateExistingProduct = async () => {
    if (!title) {
      return toast.error('💥 Please add a title for your product!');
    }
    if (!description) {
      return toast.error('💥 Please add a description for your product.');
    }
    if (!price) {
      return toast.error('💥 Please add a price for your product.');
    }
    const hasSize = Object.values(sizes).filter((selected) => selected).length;
    if (!hasSize) {
      return toast.error(
        '💥 Please choose at least one size for your product.'
      );
    }

    setIsLoading(true);
    try {
      await updateProduct();
      handleBackToAllProducts();

      return toast.success('🎉 Product updated successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setIsDeletingProduct(true);

    try {
      await deleteDoc(doc(db, 'products', productId));

      const imagesRef = ref(storage, `images/${productId}`);
      const images = await listAll(imagesRef);
      images.items.forEach(async (image) => {
        await deleteObject(image);
      });

      toast.success('🎉 Product deleted successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setIsDeletingProduct(false);
      return toast.error(`💥 ${e.message}`);
    } finally {
      setLabelsFromFirebase();
      setIsDeletingProduct(false);
      handleBackToAllProducts();
    }
  };

  return (
    <Wrapper>
      {isFetchingProduct ? (
        <ActivityIndicatorWrapper>
          <ActivityIndicator size={100} color={Color.ACCENT} />
        </ActivityIndicatorWrapper>
      ) : (
        <>
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
              label={'Update product'}
              loading={isLoading}
              onClick={updateExistingProduct}
            />
            <Button
              label={'Delete product'}
              backgroundColor={Color.RED}
              loading={isDeletingProduct}
              onClick={() => handleDeleteProduct(productId)}
            />
          </ButtonContainer>
        </>
      )}
    </Wrapper>
  );
};

const ActivityIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

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

const Wrapper = styled.div`
  padding-top: 20px;
`;
