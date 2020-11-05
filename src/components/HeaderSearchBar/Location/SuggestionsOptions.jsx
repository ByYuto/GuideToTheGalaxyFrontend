import React from 'react';
import { SuggestionLayout } from './styled-components';

export default function SuggestionsOptions({ suggestion, getSuggestionItemProps, index }) {
  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';

  return (
    <SuggestionLayout
      {...getSuggestionItemProps(suggestion, {
        className,
      })}
      isActive={suggestion.active}
    >
      <span>{suggestion.description}</span>
    </SuggestionLayout>
  );
}
