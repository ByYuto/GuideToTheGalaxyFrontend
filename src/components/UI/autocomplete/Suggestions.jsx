import React from 'react';
import { SuggestionLayout } from './styled-components';

export default function Suggestions({ suggestion, index, onOptionSelect }) {
  return (
    <SuggestionLayout isActive={suggestion.active} onMouseDown={() => onOptionSelect(suggestion.description)}>
      <span>{suggestion.description}</span>
    </SuggestionLayout>
  );
}
