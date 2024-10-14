import React from 'react';
import { Label } from '../../hooks/useLabels';
import { Color } from '../../assets/constants';
import styled from 'styled-components';
import { icons } from '../../assets/icons';
import { IconButton } from './IconButton';
import { ActivityIndicator } from './ActivityIndicator';
import { Banner } from '../../hooks/useBanners';
import { PromoCode } from '../../hooks/usePromoCodes';

interface Props {
  items: Label[] | Banner[] | PromoCode[];
  isFetchingItems: boolean;
  handleStartEditingItem?: (item: Label | Banner | PromoCode) => void;
  handleSelectItem?: (itemId: string) => void;
  selectedItemIds?: string[];
  /**
   * If true, the user can select multiple items, to be used for creating discounts
   * If false, the user can see and edit items, to be used for creating items
   * @default false
   */
  selective?: boolean;
}

export const EdittableAndSelectableItems = ({
  items,
  isFetchingItems,
  handleStartEditingItem,
  handleSelectItem,
  selectedItemIds,
  selective = false
}: Props) => (
  <ItemsWrapper>
    {isFetchingItems ? (
      <ItemsLoadingContainer>
        <ActivityIndicator color={Color.BLACK} size={25} />
        <p>Fetching items...</p>
      </ItemsLoadingContainer>
    ) : items.length > 0 ? (
      items.map((item) => (
        <ItemWrapper
          key={item.id}
          selected={selectedItemIds?.includes(item.id)}
          onClick={() =>
            selective && handleSelectItem && handleSelectItem(item.id)
          }
        >
          <ItemText>{item.name}</ItemText>
          {handleStartEditingItem && !selective && (
            <IconButton
              icon={icons.FaEdit}
              onClick={() => handleStartEditingItem(item)}
            />
          )}
        </ItemWrapper>
      ))
    ) : (
      <p>No items available</p>
    )}
    {selective && selectedItemIds && (
      <SelectedCountText>
        Selected items: {selectedItemIds.length}
      </SelectedCountText>
    )}
  </ItemsWrapper>
);

const SelectedCountText = styled.p`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
`;

const ItemsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgb(247, 247, 247, 0.5);
  border-radius: 5px;
  margin: 10px 0 10px 0;
  flex-wrap: wrap;
`;

const ItemText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  color: ${Color.WHITE};
`;

const ItemsLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const ItemWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? Color.ACCENT : Color.MEDIUM_GRAY};
  padding: 5px 15px 5px 5px;
  border: 2px dotted ${Color.WHITE};
  border-radius: 10px;
  margin: 5px 10px;
`;
