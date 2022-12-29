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
  }
};
