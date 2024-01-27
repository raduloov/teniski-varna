import React, { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Product, TShirtSize } from '../../domain/models/ProductDTO';
import { db, storage } from '../../firebase/firebaseConfig';
import { useProducts } from '../../hooks/useProducts';
import { Input } from '../../components/common/Input';
import { ImageInput } from '../../components/common/ImageInput';
import { Checkbox } from '../../components/common/Checkbox';
import { Button } from '../../components/common/Button';
import {
  ColorImages,
  defaultImagesObj,
  defaultSizesObj,
  SizesCheckbox,
  supportedImageTypes,
  TShirtColor
} from './utils';

export const UpdateProductContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [images, setImages] = useState<ColorImages>(defaultImagesObj);
  const [sizes, setSizes] = useState<SizesCheckbox>(defaultSizesObj);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAllProducts, getProductById } = useProducts();

  const emptyProduct = {
    id: '',
    title: 'Select a product',
    description: '',
    price: 0,
    images: {
      white: '',
      black: '',
      red: '',
      blue: ''
    },
    sizes: [],
    colors: []
  };

  const setProductsFromFirebase = async () => {
    const fetchedProducts = await getAllProducts();

    const products = [emptyProduct, ...fetchedProducts];
    setProducts(products);
    fillForm(products[0]);
  };

  useEffect(() => {
    setProductsFromFirebase();
  }, []);

  const onSelectProduct = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    const product = productId ? await getProductById(productId) : emptyProduct;

    if (product) {
      setSelectedProduct(product);
      fillForm(product);
    }
  };

  const fillForm = (product: Product) => {
    const hasSelectedProduct = !!product.id;

    setTitle(hasSelectedProduct ? product.title : '');
    setDescription(product.description);
    setPrice(hasSelectedProduct ? product.price : '');
    setSizes(mapSizesToObject(product.sizes));
  };

  const mapSizesToObject = (sizes: TShirtSize[]): SizesCheckbox => {
    const productSizes: SizesCheckbox = { ...defaultSizesObj };
    sizes.forEach((size) => {
      // eslint-disable-next-line no-prototype-builtins
      if (productSizes.hasOwnProperty(size)) {
        productSizes[size] = true;
      }
    });

    return productSizes;
  };

  const updateProduct = async () => {
    if (!selectedProduct) {
      return;
    }

    const sizesArray: TShirtSize[] = [];
    for (const [size, selected] of Object.entries(sizes)) {
      if (selected) {
        sizesArray.push(size as TShirtSize);
      }
    }

    const product = {
      title,
      description,
      price,
      image: title,
      sizes: sizesArray,
      colors: []
    };

    await updateDoc(doc(db, 'products', selectedProduct.id), product);
  };

  const uploadImages = async () => {
    for await (const [color, image] of Object.entries(images)) {
      if (color && image) {
        const storageRef = ref(storage, `images/${title}-${color}`);
        await uploadBytes(storageRef, image);
      }
    }
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
      await uploadImages();

      return toast.success('🎉 Product updated successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return toast.error(`💥 ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    color: TShirtColor
  ) => {
    e.target.files && setImages({ ...images, [color]: e.target.files[0] });
  };

  const handleSizeSelection = (size: TShirtSize) =>
    setSizes((sizes) => ({ ...sizes, [size]: !sizes[size] }));

  // TODO: Blur fields if product is not selected
  // TODO: Blur fields and show spinner while loading product
  return (
    <Wrapper>
      <Title>Update an existing product</Title>

      <DropdownWrapper>
        <DropdownLabel htmlFor={'dropdown'}>Select a product</DropdownLabel>
        <select onChange={onSelectProduct}>
          {products.map((product) => (
            <option value={product.id} key={product.id}>
              {product.title}
            </option>
          ))}
        </select>
      </DropdownWrapper>

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
      <InputContainer>
        <Text>Images</Text>
        <ImageInputContainer>
          <ImageInputWrapper>
            <SmallText>⬜️ White</SmallText>
            <ImageInput
              fileName={images?.white?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) => handleImageChange(e, TShirtColor.WHITE)}
            />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <SmallText>⬛️ Black</SmallText>
            <ImageInput
              fileName={images?.black?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) => handleImageChange(e, TShirtColor.BLACK)}
            />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <SmallText>🟥 Red</SmallText>
            <ImageInput
              fileName={images?.red?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) => handleImageChange(e, TShirtColor.RED)}
            />
          </ImageInputWrapper>
          <ImageInputWrapper>
            <SmallText>🟦 Blue</SmallText>
            <ImageInput
              fileName={images?.blue?.name}
              supportedTypes={supportedImageTypes}
              onChange={(e) => handleImageChange(e, TShirtColor.BLUE)}
            />
          </ImageInputWrapper>
        </ImageInputContainer>
      </InputContainer>
      <InputContainer>
        <Text>T-Shirt Sizes</Text>
        <SizesContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.S}
              checked={sizes.S}
              onClick={() => handleSizeSelection(TShirtSize.S)}
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.M}
              checked={sizes.M}
              onClick={() => handleSizeSelection(TShirtSize.M)}
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.L}
              checked={sizes.L}
              onClick={() => handleSizeSelection(TShirtSize.L)}
            />
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox
              label={TShirtSize.XL}
              checked={sizes.XL}
              onClick={() => handleSizeSelection(TShirtSize.XL)}
            />
          </CheckboxContainer>
        </SizesContainer>
      </InputContainer>
      <ButtonContainer>
        <Button
          label={'Update product'}
          loading={isLoading}
          onClick={updateExistingProduct}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

const ImageInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DropdownLabel = styled.label`
  color: ${Color.WHITE};
  margin-right: 10px;
`;

const DropdownWrapper = styled.div`
  display: flex;
  margin-top: 10px;
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

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: ${Color.WHITE};
`;

const SmallText = styled.p`
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
