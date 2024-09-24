import React from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { icons } from '../../assets/icons';
import { Button, ButtonSize } from '../../components/common/Button';
import { IconButton } from '../../components/common/IconButton';
import { QuantitySelector } from '../../components/features/details/QuantitySelector';
import { RatingStars } from '../../components/features/details/RatingStars';
import { SizeSelector } from '../../components/features/details/SizeSelector';
import { cartActions } from '../../store/cartSlice';
import {
  Product,
  TShirtSize,
  TShirtType
} from '../../domain/models/ProductDTO';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { toast } from 'react-toastify';
import { ColorSelector } from '../../components/features/details/ColorSelector';
import { TShirtColor } from '../adminPanel/utils';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { translateTypeToBulgarian } from '../../components/features/cart/utils';
import { Modal } from '../../components/common/Modal';
import { Cart } from '../../components/features/cart/Cart';
import { CartButton } from '../../components/features/cart/CartButton';
import { Footer } from '../../components/features/home/Footer';
import { ReactComponent as ShippingButton } from '../../assets/images/shipping.svg';
import { ReactComponent as MaterialsButton } from '../../assets/images/materials.svg';
import { useModalClose } from '../../hooks/useModalClose';

interface Props {
  product: Product;
  tShirtTypes: TShirtType[];
  discountedPrice: number | null;
  selectedType: TShirtType | null;
  onSelectType: (type: TShirtType) => void;
  selectedSize: TShirtSize | null;
  onSelectSize: (size: TShirtSize) => void;
  selectedColor: TShirtColor | null;
  onSelectColor: (color: TShirtColor) => void;
  imageHasLoaded: boolean;
  onImageLoad: () => void;
  selectedQuantity: number;
  onGoBack: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onShowSizeInfo: () => void;
  showSizeInfo: boolean;
  onShowShippingInfo: () => void;
  showShippingInfo: boolean;
  onShowMaterialsInfo: () => void;
  showMaterialsInfo: boolean;
  onShowCart: () => void;
  showCart: boolean;
}

export const DetailsContainerMobile = ({
  tShirtTypes,
  selectedType,
  onSelectType,
  selectedSize,
  onSelectSize,
  selectedColor,
  onSelectColor,
  imageHasLoaded,
  onImageLoad,
  selectedQuantity,
  onGoBack,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onShowSizeInfo,
  showSizeInfo,
  onShowCart,
  showCart,
  onShowShippingInfo,
  showShippingInfo,
  onShowMaterialsInfo,
  showMaterialsInfo,
  product,
  discountedPrice
}: Props) => {
  const cartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { closing: sizeInfoClosing, handleClose: handleCloseSizeInfo } =
    useModalClose(() => onShowSizeInfo());
  const { closing: shippingInfoClosing, handleClose: handleCloseShippingInfo } =
    useModalClose(() => onShowShippingInfo());
  const {
    closing: materialsInfoClosing,
    handleClose: handleCloseMaterialsInfo
  } = useModalClose(() => onShowMaterialsInfo());

  // @ts-ignore
  const image = product.images[selectedType][selectedColor].url;

  const addToCartHandler = () => {
    if (!selectedColor) {
      return toast.error('Моля изберете цвят за вашата тениска.');
    }
    if (!selectedSize) {
      return toast.error('Моля изберете размер за вашата тениска.');
    }

    dispatch(
      cartActions.addToCart({
        product,
        selectedColor,
        image,
        selectedQuantity,
        selectedSize,
        discountedPrice,
        selectedType
      })
    );

    toast.success(`🎉 ${product.title} беше успешно добавен в кошницата.`, {
      onClick: () => {
        onShowCart();
        toast.dismiss();
      }
    });
  };

  const cartItemsQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Cart
        cartItems={cartItems}
        showModal={showCart}
        setShowModal={onShowCart}
      />
      <CartButton onOpenCart={onShowCart} itemsQuantity={cartItemsQuantity} />
      <Container>
        <ActionButtonsWrapper>
          <IconButton icon={icons.FaChevronLeft} onClick={onGoBack} />
        </ActionButtonsWrapper>
        <ImageWrapper>
          {!imageHasLoaded && (
            <ActivityIndicator size={100} color={Color.ACCENT} />
          )}
          <Image
            src={image}
            onLoad={() => onImageLoad()}
            loaded={imageHasLoaded}
          />
        </ImageWrapper>
        <BottomSheetContainer>
          <BottomSheetContent>
            <HeaderWrapper>
              <TitleWrapper>
                <Title>{product.title}</Title>
                <Description>{product.description}</Description>
              </TitleWrapper>
              <RatingStars />
            </HeaderWrapper>

            <SelectTitle>Изберете модел</SelectTitle>
            <TypeSelector>
              {tShirtTypes.map((type, index) => (
                <TypeButton
                  onClick={() => onSelectType(type)}
                  selected={selectedType === type}
                  key={index}
                >
                  {translateTypeToBulgarian(type)}
                </TypeButton>
              ))}
            </TypeSelector>

            <SelectTitle>Изберете цвят</SelectTitle>
            <TilesWrapper>
              {selectedType && (
                <ColorSelector
                  colors={product.images[selectedType]}
                  selectedColor={selectedColor}
                  onSelectColor={(color) => onSelectColor(color)}
                />
              )}
            </TilesWrapper>
            <SizeWrapper onClick={onShowSizeInfo}>
              <SelectSizeTitle>Изберете размер</SelectSizeTitle>
              <SizeChartButton
                src={require('../../assets/images/size-chart.png')}
              />
            </SizeWrapper>
            <TilesWrapper>
              {selectedType === TShirtType.MEN && (
                <SizeSelector
                  availableSizes={product.sizes.men}
                  selectedSize={selectedSize}
                  onSelectSize={(size) => onSelectSize(size)}
                />
              )}
              {selectedType === TShirtType.WOMEN && (
                <SizeSelector
                  availableSizes={product.sizes.women}
                  selectedSize={selectedSize}
                  onSelectSize={(size) => onSelectSize(size)}
                />
              )}
              {selectedType === TShirtType.KIDS && (
                <SizeSelector
                  availableSizes={product.sizes.kids}
                  selectedSize={selectedSize}
                  onSelectSize={(size) => onSelectSize(size)}
                />
              )}
              {selectedType === TShirtType.OVERSIZED && (
                <SizeSelector
                  availableSizes={product.sizes.oversized}
                  selectedSize={selectedSize}
                  onSelectSize={(size) => onSelectSize(size)}
                />
              )}
            </TilesWrapper>
            <QuantityWrapper>
              <QuantitySelector
                quantity={selectedQuantity}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
              />
            </QuantityWrapper>
            <CtaWrapper>
              <PriceWrapper>
                <Price discounted={!!discountedPrice}>{product.price}лв</Price>
                {discountedPrice && (
                  <DiscountedPrice>{discountedPrice}лв</DiscountedPrice>
                )}
              </PriceWrapper>
              <Button
                label="Добави в кошницата"
                size={ButtonSize.MEDIUM}
                onClick={addToCartHandler}
              />
            </CtaWrapper>
          </BottomSheetContent>
          <ShippingAndMaterialsWrapper>
            <FullWidthButton onClick={() => onShowShippingInfo()}>
              <ShippingButton />
            </FullWidthButton>
            <FullWidthButton onClick={() => onShowMaterialsInfo()}>
              <MaterialsButton />
            </FullWidthButton>
          </ShippingAndMaterialsWrapper>
          <Footer />
        </BottomSheetContainer>
      </Container>
      {showSizeInfo && (
        <Modal
          closing={sizeInfoClosing}
          onClose={handleCloseSizeInfo}
          additionalStyles={`
            width: 90%;    
          `}
        >
          <InfoModalWrapper>
            <img src={require('../../assets/images/size-info.png')} />
          </InfoModalWrapper>
        </Modal>
      )}
      {showShippingInfo && (
        <Modal closing={shippingInfoClosing} onClose={handleCloseShippingInfo}>
          <InfoModalWrapper>
            <h1>Shipping info</h1>
            <p>Waiting for Tomi to provide copy</p>
          </InfoModalWrapper>
        </Modal>
      )}
      {showMaterialsInfo && (
        <Modal
          closing={materialsInfoClosing}
          onClose={handleCloseMaterialsInfo}
        >
          <InfoModalWrapper>
            <h1>Materials info</h1>
            <p>Waiting for Tomi to provide copy</p>
          </InfoModalWrapper>
        </Modal>
      )}
    </>
  );
};

const FullWidthButton = styled.div`
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 2px solid ${Color.WHITE};
  &:first-child {
    border-right: 1px solid ${Color.WHITE};
  }
  &:last-child {
    border-left: 1px solid ${Color.WHITE};
  }
  &:hover {
    backdrop-filter: brightness(0.8);
  }
`;

const ShippingAndMaterialsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${Color.ACCENT};
`;

const SizeChartButton = styled.img`
  cursor: pointer;
  width: 40px;
`;

const InfoModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const SizeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
`;

const TypeButton = styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding: 5px 10px;
  min-height: 48px;
  background: ${(props) => (props.selected ? Color.ACCENT : Color.LIGHT_GRAY)};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  flex-grow: 1;
  color: ${(props) => (props.selected ? Color.BLACK : Color.GRAY)};
`;

const PriceWrapper = styled.div``;

const QuantityWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;

const TypeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50svh;
`;

const Image = styled.img<{ loaded: boolean }>`
  max-height: 100%;
  max-width: 100%;
  ${({ loaded }) => !loaded && 'display: none;'}
`;

const SelectTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
`;

const SelectSizeTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const DiscountedPrice = styled.p`
  font-size: 35px;
  font-weight: 800;
  color: ${Color.RED};
`;

const Price = styled.p<{ discounted?: boolean }>`
  font-size: 35px;
  font-weight: 800;
  ${({ discounted }) =>
    discounted &&
    `
    font-size: 24px;
    color: ${Color.GRAY};
    text-decoration: line-through;
  `}
`;

const CtaWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
`;

const TilesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 30px;
`;

const Description = styled.p`
  color: ${Color.GRAY};
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const BottomSheetContent = styled.div`
  padding: 1.5rem;
`;

const BottomSheetContainer = styled.div`
  position: absolute;
  top: 0;
  margin-top: 90%;
  z-index: 100;
  width: 100svw;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  background: ${Color.WHITE};
  box-shadow: 0px -10px 20px -10px rgba(0, 0, 0, 0.75);
`;

const ActionButtonsWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`;

const Container = styled.div`
  min-height: 100svh;
  width: 100svw;
`;
