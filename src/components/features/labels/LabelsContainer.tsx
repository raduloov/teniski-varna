import React from 'react';
import { Label } from '../../../hooks/useLabels';
import { Color } from '../../../assets/constants';
import styled from 'styled-components';
import { icons } from '../../../assets/icons';
import { IconButton } from '../../common/IconButton';
import { ActivityIndicator } from '../../common/ActivityIndicator';

interface Props {
  labels: Label[];
  isFetchingLabels: boolean;
  handleStartEditingLabel?: (label: Label) => void;
  handleSelectLabel?: (labelId: string) => void;
  selectedLabelIds?: string[];
  /**
   * If true, the user can select multiple labels, to be used for creating discounts
   * If false, the user can see and edit lables, to be used for creating labels
   * @default false
   */
  selective?: boolean;
}

export const LabelsContainer = ({
  labels,
  isFetchingLabels,
  handleStartEditingLabel,
  handleSelectLabel,
  selectedLabelIds,
  selective = false
}: Props) => (
  <LabelsWrapper>
    {isFetchingLabels ? (
      <LabelsLoadingContainer>
        <ActivityIndicator color={Color.BLACK} size={25} />
        <p>Fetching labels...</p>
      </LabelsLoadingContainer>
    ) : labels.length > 0 ? (
      labels.map((label) => (
        <LabelWrapper
          key={label.id}
          selected={selectedLabelIds?.includes(label.id)}
          onClick={() =>
            selective && handleSelectLabel && handleSelectLabel(label.id)
          }
        >
          <LabelText>{label.name}</LabelText>
          {handleStartEditingLabel && !selective && (
            <IconButton
              icon={icons.FaEdit}
              onClick={() => handleStartEditingLabel(label)}
            />
          )}
        </LabelWrapper>
      ))
    ) : (
      <p>No labels available</p>
    )}
    {selective && selectedLabelIds && (
      <SelectedCountText>
        Selected labels: {selectedLabelIds.length}
      </SelectedCountText>
    )}
  </LabelsWrapper>
);

const SelectedCountText = styled.p`
  position: absolute;
  bottom: 2px;
  right: 2px;
  font-size: 12px;
`;

const LabelsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: rgb(247, 247, 247, 0.5);
  border-radius: 5px;
  margin: 10px 0 10px 0;
  flex-wrap: wrap;
`;

const LabelText = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  color: ${Color.WHITE};
`;

const LabelsLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const LabelWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? Color.ACCENT : Color.MEDIUM_GRAY};
  padding: 5px 15px 5px 5px;
  border: 2px dotted ${Color.WHITE};
  border-radius: 10px;
  margin: 5px 10px;
`;
