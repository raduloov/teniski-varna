import React from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background: ${(props) => (props.checked ? Color.ACCENT : Color.WHITE)};
  border-radius: 50%;
  cursor: pointer;
`;
