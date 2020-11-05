import React, { useState } from 'react';
import { DropdownLayout } from './styled-components';
import Options from './Options';
import { DropdownIcon } from '../../../assets/icons/svg-icons';
export default function Dropdown({
  options,
  defaultOption = 'Select an option',
  icon,
  className = '',
  actionButton = <DropdownIcon />,
}) {
  const [focused, setFocus] = useState(false);
  const [currentValue, setCurrentValue] = useState(defaultOption);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const onOptionSelect = (option) => {
    setCurrentValue(option);
  };
  return (
    <DropdownLayout
      focused={focused ? 1 : 0}
      className={className}
      actionButton={!!actionButton}
      leftIcon={!!icon}
      onMouseDown={handleFocus}
    >
      <div className="input-autocomplete-container">
        {icon ? icon : null}
        <input
          className="location-search-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={currentValue}
          readOnly={true}
        />
        {actionButton && actionButton}
      </div>
      {focused && (
        <div className="autocomplete-dropdown-container">
          {options.length > 0 &&
            options.map((opt, index) => {
              return <Options key={index} option={opt} onOptionSelect={onOptionSelect} />;
            })}
        </div>
      )}
    </DropdownLayout>
  );
}
