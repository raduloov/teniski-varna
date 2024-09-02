export enum TShirtType {
  MEN = 'men',
  WOMEN = 'women',
  KIDS = 'kids'
}

export interface TShirtSizes {
  men: Array<TShirtSize>;
  women: Array<TShirtSize>;
  kids: Array<TShirtSize>;
}

export enum TShirtSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
  K98 = '98',
  K110 = '110',
  K122 = '122',
  K132 = '132',
  K144 = '144',
  K156 = '156',
  K168 = '168'
}

export interface ImagesMen {
  white: string;
  black: string;
  red: string;
  darkBlue: string;
  lightBlue: string;
  darkGreen: string;
  yellow: string;
}

export interface ImagesWomen {
  white: string;
  black: string;
  lightPink: string;
}

export interface ImagesKids {
  white: string;
  black: string;
  red: string;
  blue: string;
  yellow: string;
  lightPink: string;
}

export interface ProductImages {
  men: ImagesMen;
  women: ImagesWomen;
  kids: ImagesKids;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: ProductImages;
  price: number;
  sizes: TShirtSizes;
  labels: Array<string>;
}
