import { TShirtColor } from '../../../containers/adminPanel/utils';
import { TShirtType } from '../../../domain/models/ProductDTO';

export const translateColorToBulgarian = (color: TShirtColor): string => {
  switch (color) {
    case TShirtColor.WHITE:
      return 'Бял';
    case TShirtColor.BLACK:
      return 'Черен';
    case TShirtColor.RED:
      return 'Червен';
    case TShirtColor.BLUE:
      return 'Син';
    case TShirtColor.DARK_BLUE:
      return 'Тъмносин';
    case TShirtColor.LIGHT_BLUE:
      return 'Светлосин';
    case TShirtColor.DARK_GREEN:
      return 'Тъмнозелен';
    case TShirtColor.YELLOW:
      return 'Жълт';
    case TShirtColor.LIGHT_PINK:
      return 'Светлорозов';
  }
};

export const translateTypeToBulgarian = (type: TShirtType): string => {
  switch (type) {
    case TShirtType.MEN:
      return 'Мъжко';
    case TShirtType.WOMEN:
      return 'Дамско';
    case TShirtType.KIDS:
      return 'Детско';
    case TShirtType.OVERSIZED:
      return 'Oversized';
  }
};
