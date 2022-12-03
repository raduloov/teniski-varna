import React from 'react';
import { useParams } from 'react-router';

export const DetailsContainer = () => {
  const { productId } = useParams();

  return (
    <>
      <p>{productId}</p>
    </>
  );
};
