import { Product } from '../../domain/models/ProductDTO';
import { Discount } from '../../hooks/useDiscounts';

export enum TShirtColor {
  WHITE = 'white',
  BLACK = 'black',
  RED = 'red',
  BLUE = 'blue'
}

export interface SizesCheckbox {
  men: {
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
    XXL: boolean;
    XXXL: boolean;
  };
  women: {
    XS: boolean;
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
  };
  kids: {
    K98: boolean;
    K110: boolean;
    K122: boolean;
    K132: boolean;
    K144: boolean;
    K156: boolean;
    K168: boolean;
  };
}

export interface ColorImages {
  [TShirtColor.WHITE]: File | null;
  [TShirtColor.BLACK]: File | null;
  [TShirtColor.RED]: File | null;
  [TShirtColor.BLUE]: File | null;
}

export const defaultSizesObj = {
  all: {
    men: {
      S: true,
      M: true,
      L: true,
      XL: true,
      XXL: true,
      XXXL: true
    },
    women: {
      XS: true,
      S: true,
      M: true,
      L: true,
      XL: true
    },
    kids: {
      K98: true,
      K110: true,
      K122: true,
      K132: true,
      K144: true,
      K156: true,
      K168: true
    }
  } as SizesCheckbox,
  none: {
    men: {
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
      XXXL: false
    },
    women: {
      XS: false,
      S: false,
      M: false,
      L: false,
      XL: false
    },
    kids: {
      K98: false,
      K110: false,
      K122: false,
      K132: false,
      K144: false,
      K156: false,
      K168: false
    }
  } as SizesCheckbox
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
