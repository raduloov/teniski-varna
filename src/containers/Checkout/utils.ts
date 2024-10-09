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
