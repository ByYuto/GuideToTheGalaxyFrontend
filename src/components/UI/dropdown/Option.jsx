import React from 'react';
import { OptionsLayout } from './styled-components';

export default function Option({ option, onOptionSelect }) {
  return (
    <OptionsLayout onMouseDown={() => onOptionSelect(option)}>
      <span>{option.description}</span>
    </OptionsLayout>
  );
}
