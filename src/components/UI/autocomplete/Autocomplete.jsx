import React, { useState, useEffect, useRef } from 'react';
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
  handleKeydown,
  className,
  actionButton,
  patternAllowed,
  setFocusOnMount,
}) {
  const [focused, setFocus] = useState(false);
  const inputRef = useRef(null);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const avoidCharacters = (event, pattern) => {
    const regex = new RegExp(pattern);
    //const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    return regex.test(event.key) || event.code === 'Space';
  };
  const handleKeyPress = (e) => {
    if (patternAllowed) {
      const avoidC = avoidCharacters(e, patternAllowed);
      if (avoidC) {
        return;
      } else {
        e.preventDefault();
        return;
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    if (setFocusOnMount && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [setFocusOnMount]);
  return (
    <AutocompleteLayout className={className} actionButton={!!actionButton} leftIcon={!!icon}>
      <div className="input-autocomplete-container">
        {icon ? icon : null}
        <input
          className="location-search-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={handleKeydown}
          onKeyPress={handleKeyPress}
          type="text"
          ref={inputRef}
        />
        {value.length > 0 ? <IoIosClose onClick={onClearValue} className="clear-element" size={30} /> : null}
        {actionButton && actionButton}
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
