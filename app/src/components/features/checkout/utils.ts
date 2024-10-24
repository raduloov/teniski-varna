import { CartProduct } from '../../../domain/mappers/cartProductMapper';

export interface OrderShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalAddress?: string;
  speedyOffice?: string;
}

export enum CheckoutField {
  CUSTOMER_FIRST_NAME = 'firstName',
  CUSTOMER_LAST_NAME = 'lastName',
  CUSTOMER_PHONE = 'phone',
  CUSTOMER_EMAIL = 'email',
  CUSTOMER_CITY = 'city',
  CUSTOMER_STREET = 'street',
  CUSTOMER_ADDITIONAL_NOTES = 'additionalNotes',
  CUSTOMER_SPEEDY_OFFICE = 'speedyOffice',
  DELIVERY_OPTION = 'deliveryOption',
  SAVE_DATA = 'saveData'
}

export const saveCustomerDataToLocalStorage = (
  customerData: { field: CheckoutField; value: string }[]
) => {
  for (const { field, value } of customerData) {
    localStorage.setItem(
      'customerData',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('customerData') || '{}'),
        [field]: value
      })
    );
  }
};

export const getCustomerDataFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('customerData') || '{}');

export const getTotalPrice = (items: CartProduct[]) => {
  const totalPrice = Number(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  return totalPrice;
};

export const getDiscountedPrice = (
  price: number,
  discount?: number
): number => {
  const discountedPrice = discount ? price - price * (discount / 100) : price;
  return Number(discountedPrice.toFixed(2));
};
