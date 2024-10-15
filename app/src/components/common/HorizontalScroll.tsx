import React from 'react';
import styled from 'styled-components';
import { Button, ButtonSize, ButtonType } from './Button';
import { Label } from '../../hooks/useLabels';

interface Props {
  labels: Label[];
  selected?: Label;
  onSelectLabel: (label: Label) => void;
}

export const HorizontalScroll = ({
  labels,
  selected,
  onSelectLabel
}: Props) => {
  const getButtonType = (label: Label): ButtonType => {
    if (!selected) {
      return ButtonType.UNSELECTED;
    }

    return label.id === selected.id
      ? ButtonType.PRIMARY
      : ButtonType.UNSELECTED;
  };

  return (
    <Wrapper>
      {labels.map((label, index) => {
        return (
          <ButtonContainer key={`label-${index}`}>
            <Button
              label={label.name}
              type={getButtonType(label)}
              onClick={() => onSelectLabel(label)}
              size={ButtonSize.MEDIUM}
            />
          </ButtonContainer>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: none;
  overflow-x: scroll;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const ButtonContainer = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
