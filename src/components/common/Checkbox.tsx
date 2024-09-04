import React from 'react';
import styled from 'styled-components';
import { Color } from '../../assets/constants';

interface CheckboxProps {
  checked: boolean;
}

interface Props {
  label: string;
  checked: boolean;
  onClick: () => void;
}

export const Checkbox = ({ label, checked, onClick }: Props) => (
  <CheckboxWrapper checked={checked} onClick={onClick}>
    <Text checked={checked}>{label}</Text>
  </CheckboxWrapper>
);

const Text = styled.p<CheckboxProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.checked ? Color.BLACK : Color.MEDIUM_GRAY)};
`;

const CheckboxWrapper = styled.div<CheckboxProps>`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: ${(props) => (props.checked ? Color.ACCENT : Color.LIGHT_GRAY)};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${(props) => (props.checked ? Color.BLACK : Color.GRAY)};
`;
