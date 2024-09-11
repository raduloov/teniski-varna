import { ImageDetails, ImageInfo } from '../../containers/adminPanel/utils';

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
  XLPlus = 'XL+',
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
  white: ImageInfo;
  black: ImageInfo;
  red: ImageInfo;
  darkBlue: ImageInfo;
  lightBlue: ImageInfo;
  darkGreen: ImageInfo;
  yellow: ImageInfo;
}

export interface ImagesWomen {
  white: ImageInfo;
  black: ImageInfo;
  lightPink: ImageInfo;
}

export interface ImagesKids {
  white: ImageInfo;
  black: ImageInfo;
  red: ImageInfo;
  blue: ImageInfo;
  yellow: ImageInfo;
  lightPink: ImageInfo;
}

export type ProductImages = ImageDetails;
export type Thumbnail = {
  name: string;
  url: string;
};

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  images: ProductImages;
  price: number;
  sizes: TShirtSizes;
  labels: Array<string>;
}
