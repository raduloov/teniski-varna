import { useState } from 'react';

/**
 * This hook is used to get the closing state and pass it to the modal component
 * to animate the closing
 * @param onClose Callback function to close the modal
 * @returns
 * - closing: boolean - state to animate the closing
 * - handleClose: function - function to close the modal
 */
export const useModalClose = (onClose: () => void) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  };

  return { closing, handleClose };
};
