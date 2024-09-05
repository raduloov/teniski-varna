import { TShirtColor } from '../../../containers/adminPanel/utils';

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
