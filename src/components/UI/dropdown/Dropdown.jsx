import React, { useState } from 'react';
import { DropdownLayout } from './styled-components';
import Option from './Option';
import { DropdownIcon } from '../../../assets/icons/svg-icons';
import { isPlainObject } from 'lodash';
export default function Dropdown({
  options,
  value,
  icon,
  className = '',
  actionButton = <DropdownIcon />,
  onOptionSelect,
}) {
  const [focused, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };

  const optionsFiltered = options.filter((elm) => {
    if (isPlainObject(value)) {
      return elm.value !== value.value;
    } else {
      return elm.value !== value;
    }
  });

  let selectedValue = isPlainObject(value) ? value : options.find((option) => option.value === value);
  if (!selectedValue && options) {
    selectedValue = options[0];
  }
  console.log({
    value,
    isPlainObject: isPlainObject(value),
    selectedValue,
  });

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
          value={selectedValue ? selectedValue.description : ''}
          readOnly={true}
        />
        {actionButton && actionButton}
      </div>
      {focused && (
        <div className="autocomplete-dropdown-container">
          {optionsFiltered.length > 0 &&
            optionsFiltered.map((opt, index) => {
              return <Option key={index} option={opt} onOptionSelect={onOptionSelect} />;
            })}
        </div>
      )}
    </DropdownLayout>
  );
}
