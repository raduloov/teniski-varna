import { NavigateOptions, To, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollToTop';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  return (to: To, options?: NavigateOptions) => {
    scrollToTop();
    navigate(to, options);
  };
};
