type TShirtColor = string; // make enum later

export enum TShirtSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  colors: Array<TShirtColor>;
  sizes: Array<TShirtSize>;
}
