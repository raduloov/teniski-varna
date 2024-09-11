import { TShirtType } from '../domain/models/ProductDTO';

export const translateTypeToBulgarian = (type: TShirtType): string => {
  switch (type) {
    case TShirtType.MEN:
      return 'Мъжко';
    case TShirtType.WOMEN:
      return 'Дамско';
    case TShirtType.KIDS:
      return 'Детско';
  }
};
