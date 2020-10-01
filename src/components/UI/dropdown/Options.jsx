import React from 'react';
import { OptionsLayout } from './styled-components';

export default function Options({ option, onOptionSelect }) {
  return (
    <OptionsLayout isActive={option.active} onMouseDown={() => onOptionSelect(option.description)}>
      <span>{option.description}</span>
    </OptionsLayout>
  );
}
