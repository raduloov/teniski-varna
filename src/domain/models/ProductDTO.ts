import { TShirtColor } from '../../containers/adminPanel/utils';

export enum TShirtSizeType {
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

export interface ProductImages {
  [TShirtColor.WHITE]: string;
  [TShirtColor.BLACK]: string;
  [TShirtColor.RED]: string;
  [TShirtColor.BLUE]: string;
}
export interface Product {
  id: string;
  title: string;
  description: string;
  images: ProductImages;
  price: number;
  colors: Array<TShirtColor>;
  sizes: TShirtSizes;
  labels: Array<string>;
}
