import { Product } from '../../domain/models/ProductDTO';
import { Discount } from '../../hooks/useDiscounts';

export enum TShirtColor {
  WHITE = 'white',
  BLACK = 'black',
  RED = 'red',
  BLUE = 'blue',
  DARK_BLUE = 'darkBlue',
  LIGHT_BLUE = 'lightBlue',
  DARK_GREEN = 'darkGreen',
  YELLOW = 'yellow',
  LIGHT_PINK = 'lightPink'
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
    XLPlus: boolean;
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
  oversized: {
    S: boolean;
    M: boolean;
    L: boolean;
    XL: boolean;
    XXL: boolean;
    XXXL: boolean;
  };
}

export interface ColorImages {
  men: {
    [TShirtColor.WHITE]: File | null;
    [TShirtColor.BLACK]: File | null;
    [TShirtColor.RED]: File | null;
    [TShirtColor.DARK_BLUE]: File | null;
    [TShirtColor.LIGHT_BLUE]: File | null;
    [TShirtColor.DARK_GREEN]: File | null;
    [TShirtColor.YELLOW]: File | null;
  };
  women: {
    [TShirtColor.WHITE]: File | null;
    [TShirtColor.BLACK]: File | null;
    [TShirtColor.LIGHT_PINK]: File | null;
  };
  kids: {
    [TShirtColor.WHITE]: File | null;
    [TShirtColor.BLACK]: File | null;
    [TShirtColor.RED]: File | null;
    [TShirtColor.BLUE]: File | null;
    [TShirtColor.YELLOW]: File | null;
    [TShirtColor.LIGHT_PINK]: File | null;
  };
  oversized: {
    [TShirtColor.WHITE]: File | null;
    [TShirtColor.BLACK]: File | null;
  };
}

export type ImageInfo = {
  name: string;
  url: string;
} | null;

export interface ImageDetails {
  men: {
    [color in
      | TShirtColor.WHITE
      | TShirtColor.BLACK
      | TShirtColor.RED
      | TShirtColor.DARK_BLUE
      | TShirtColor.LIGHT_BLUE
      | TShirtColor.DARK_GREEN
      | TShirtColor.YELLOW]: ImageInfo;
  };
  women: {
    [color in
      | TShirtColor.WHITE
      | TShirtColor.BLACK
      | TShirtColor.LIGHT_PINK]: ImageInfo;
  };
  kids: {
    [color in
      | TShirtColor.WHITE
      | TShirtColor.BLACK
      | TShirtColor.RED
      | TShirtColor.BLUE
      | TShirtColor.YELLOW
      | TShirtColor.LIGHT_PINK]: ImageInfo;
  };
  oversized: {
    [color in TShirtColor.WHITE | TShirtColor.BLACK]: ImageInfo;
  };
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
      XL: true,
      XLPlus: true
    },
    kids: {
      K98: true,
      K110: true,
      K122: true,
      K132: true,
      K144: true,
      K156: true,
      K168: true
    },
    oversized: {
      S: true,
      M: true,
      L: true,
      XL: true,
      XXL: true,
      XXXL: true
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
      XL: false,
      XLPlus: false
    },
    kids: {
      K98: false,
      K110: false,
      K122: false,
      K132: false,
      K144: false,
      K156: false,
      K168: false
    },
    oversized: {
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
      XXXL: false
    }
  } as SizesCheckbox
};

export const defaultImagesObj: ColorImages = {
  men: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null,
    [TShirtColor.RED]: null,
    [TShirtColor.DARK_BLUE]: null,
    [TShirtColor.LIGHT_BLUE]: null,
    [TShirtColor.DARK_GREEN]: null,
    [TShirtColor.YELLOW]: null
  },
  women: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null,
    [TShirtColor.LIGHT_PINK]: null
  },
  kids: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null,
    [TShirtColor.RED]: null,
    [TShirtColor.BLUE]: null,
    [TShirtColor.YELLOW]: null,
    [TShirtColor.LIGHT_PINK]: null
  },
  oversized: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null
  }
};

export const defaultImageDetails: ImageDetails = {
  men: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null,
    [TShirtColor.RED]: null,
    [TShirtColor.DARK_BLUE]: null,
    [TShirtColor.LIGHT_BLUE]: null,
    [TShirtColor.DARK_GREEN]: null,
    [TShirtColor.YELLOW]: null
  },
  women: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null,
    [TShirtColor.LIGHT_PINK]: null
  },
  kids: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null,
    [TShirtColor.RED]: null,
    [TShirtColor.BLUE]: null,
    [TShirtColor.YELLOW]: null,
    [TShirtColor.LIGHT_PINK]: null
  },
  oversized: {
    [TShirtColor.WHITE]: null,
    [TShirtColor.BLACK]: null
  }
};

export const supportedImageTypes = ['image/jpeg', 'image/png'];

export const availableTShirtColors = [
  TShirtColor.WHITE,
  TShirtColor.BLACK,
  TShirtColor.RED,
  TShirtColor.BLUE,
  TShirtColor.DARK_BLUE,
  TShirtColor.LIGHT_BLUE,
  TShirtColor.DARK_GREEN,
  TShirtColor.YELLOW,
  TShirtColor.LIGHT_PINK
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
  discount ? Number((price - (price * discount) / 100).toFixed(2)) : undefined;

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

export const mapTShirtColorToHex = (color: TShirtColor): string => {
  switch (color) {
    case TShirtColor.WHITE:
      return '#ffffff';
    case TShirtColor.BLACK:
      return '#000000';
    case TShirtColor.RED:
      return '#ff0000';
    case TShirtColor.BLUE:
      return '#0000ff';
    case TShirtColor.DARK_BLUE:
      return '#0000dd';
    case TShirtColor.LIGHT_BLUE:
      return '#add8e6';
    case TShirtColor.DARK_GREEN:
      return '#006400';
    case TShirtColor.YELLOW:
      return '#ffff00';
    case TShirtColor.LIGHT_PINK:
      return '#ffb6c1';
  }
};

export const mapSizeToString = (size: string): string =>
  size === 'XLPlus' ? 'XL+' : size;
