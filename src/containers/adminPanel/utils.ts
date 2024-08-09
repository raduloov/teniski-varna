import { Product } from '../../domain/models/ProductDTO';
import { Discount } from '../../hooks/useDiscounts';

export enum TShirtColor {
  WHITE = 'white',
  BLACK = 'black',
  RED = 'red',
  BLUE = 'blue'
}

export interface SizesCheckbox {
  S: boolean;
  M: boolean;
  L: boolean;
  XL: boolean;
}

export interface ColorImages {
  [TShirtColor.WHITE]: File | null;
  [TShirtColor.BLACK]: File | null;
  [TShirtColor.RED]: File | null;
  [TShirtColor.BLUE]: File | null;
}

export const defaultSizesObj: SizesCheckbox = {
  S: false,
  M: false,
  L: false,
  XL: false
};

export const defaultImagesObj: ColorImages = {
  [TShirtColor.WHITE]: null,
  [TShirtColor.BLACK]: null,
  [TShirtColor.RED]: null,
  [TShirtColor.BLUE]: null
};

export const supportedImageTypes = ['image/jpeg'];

export const availableTShirtColors = [
  TShirtColor.WHITE,
  TShirtColor.BLACK,
  TShirtColor.RED,
  TShirtColor.BLUE
];

export const selectLabelIds = (
  labelId: string,
  selectedLabelIds: string[],
  /**
   * Set the selected labels. This should be a React setState function.
   * @param value - The new value to set
   */
  selectLabel: (value: React.SetStateAction<string[]>) => void
) => {
  if (selectedLabelIds.includes(labelId)) {
    selectLabel((prev) => prev.filter((id) => id !== labelId));
  } else {
    selectLabel((prev) => [...prev, labelId]);
  }
};

export const getDiscountedPrice = (price: number, discount?: number) =>
  discount ? (price - (price * discount) / 100).toFixed(2) : undefined;

export const getDiscountForProduct = (
  product: Product,
  activeDiscounts: Array<Discount>
): number | undefined => {
  const discounts: Array<number> = [];

  for (const discount of activeDiscounts) {
    for (const label of discount.labelIds) {
      if (
        product.labels.includes(label) &&
        !discounts.includes(discount.percentage)
      ) {
        discounts.push(discount.percentage);
      }
    }
  }

  const discount = discounts.length ? Math.max(...discounts) : undefined;

  return discount;
};
