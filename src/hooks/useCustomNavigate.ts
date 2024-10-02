import { NavigateOptions, To, useNavigate } from 'react-router';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (to: To, options?: NavigateOptions) => {
    scrollToTop();
    navigate(to, options);
  };
};
