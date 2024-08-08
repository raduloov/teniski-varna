import { TShirtColor } from '../../containers/adminPanel/utils';

export enum TShirtSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
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
  sizes: Array<TShirtSize>;
  labels: Array<string>;
}
