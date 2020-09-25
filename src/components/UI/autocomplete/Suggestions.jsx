import React from 'react';
import { SuggestionLayout } from './styled-components';

export default function Suggestions({ suggestion, index, onOptionSelect }) {
  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';

  return (
    <SuggestionLayout isActive={suggestion.active} onMouseDown={() => onOptionSelect(suggestion.description)}>
      <span>{suggestion.description}</span>
    </SuggestionLayout>
  );
}
