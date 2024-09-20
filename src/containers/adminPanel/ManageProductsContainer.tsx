import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Product } from '../../domain/models/ProductDTO';
import { useProducts } from '../../hooks/useProducts';
import { ProductList } from '../../components/features/home/ProductList';
import { ActivityIndicator } from '../../components/common/ActivityIndicator';
import { UpdateProductContainer } from './UpdateProductContainer';

export const ManageProductsContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const { getAllProducts, isLoading: isFetchingProducts } = useProducts();

  const fetchProducts = async () => {
    const { products } = await getAllProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductSelection = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleBackToAllProducts = () => setSelectedProductId(null);

  const refreshProducts = async () => {
    fetchProducts();
    handleBackToAllProducts();
  };

  return (
    <Wrapper>
      <Header>
        <Title>Manage products</Title>
        {selectedProductId && (
          <BackLink onClick={handleBackToAllProducts}>
            Back to all products
          </BackLink>
        )}
      </Header>
      {!selectedProductId && isFetchingProducts && (
        <ActivityIndicatorWrapper>
          <ActivityIndicator size={100} color={Color.ACCENT} />
        </ActivityIndicatorWrapper>
      )}
      {!selectedProductId && !isFetchingProducts && (
        <ProductList
          products={products}
          onSelectProductToEdit={handleProductSelection}
        />
      )}
      {selectedProductId && (
        <UpdateProductContainer
          productId={selectedProductId}
          handleBackToAllProducts={refreshProducts}
        />
      )}
    </Wrapper>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const BackLink = styled.p`
  color: ${Color.ACCENT};
  font-size: 12px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 24px;
  color: ${Color.WHITE};
`;

const ActivityIndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Wrapper = styled.div`
  padding-top: 20px;
  min-height: 500px;
`;
