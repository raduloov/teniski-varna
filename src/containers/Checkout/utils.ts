import { CartProduct } from '../../domain/mappers/cartProductMapper';
import { PromoCode } from '../../hooks/usePromoCodes';

export enum CheckoutField {
  CUSTOMER_FIRST_NAME = 'firstName',
  CUSTOMER_LAST_NAME = 'lastName',
  CUSTOMER_PHONE = 'phone',
  CUSTOMER_EMAIL = 'email',
  CUSTOMER_ADDRESS = 'address',
  CUSTOMER_SPEEDY_OFFICE = 'speedyOffice',
  DELIVERY_OPTION = 'deliveryOption'
}

export const saveCustomerDataToLocalStorage = (
  field: CheckoutField,
  value: string
) => {
  localStorage.setItem(
    'customerData',
    JSON.stringify({
      ...JSON.parse(localStorage.getItem('customerData') || '{}'),
      [field]: value
    })
  );
};

export const getCustomerDataFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('customerData') || '{}');

export const getMyPosNote = (
  cartItems: CartProduct[],
  promoCode: PromoCode | null
) =>
  cartItems
    .map(
      (item: CartProduct, index) =>
        `Product ${index + 1}: ${item.title} - x${item.quantity}, ${
          item.type
        }, ${item.size}, ${item.color};`
    )
    .join('\n')
    .concat(
      promoCode
        ? `\nPromo code: ${promoCode.name} - ${promoCode.percentage}`
        : ''
    );

export const getTotalPrice = (items: CartProduct[]) => {
  const totalPrice = Number(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  return totalPrice;
};

export const getDiscountedPrice = (price: number, discount?: number) =>
  discount ? price - price * (discount / 100) : price;
