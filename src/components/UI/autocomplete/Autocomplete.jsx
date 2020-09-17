import React, { useState } from 'react';
import { AutocompleteLayout } from './styled-components';
import { IoIosClose } from 'react-icons/io';
import Suggestions from './Suggestions';

export default function Autocomplete({
  suggestions,
  placeholder,
  onChange,
  onOptionSelect,
  value,
  icon,
  onClearValue,
  className,
}) {
  const [focused, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <AutocompleteLayout className={className}>
      <div className="input-autocomplete-container">
        {icon ? icon : null}
        <input
          className="location-search-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {value.length > 0 ? <IoIosClose onClick={onClearValue} className="clear-element" size={30} /> : null}
      </div>
      {focused && (
        <div className="autocomplete-dropdown-container">
          {suggestions.length > 0 &&
            suggestions.map((suggestion, index) => (
              <Suggestions key={index} suggestion={suggestion} onOptionSelect={onOptionSelect} />
            ))}
        </div>
      )}
    </AutocompleteLayout>
  );
}
