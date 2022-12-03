import React from 'react';
import { Modal } from './Modal';

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const Cart = ({ setShowModal, showModal }: Props) => {
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>This is a cart</div>
        </Modal>
      )}
    </>
  );
};
