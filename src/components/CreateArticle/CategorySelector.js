import React from 'react';
import styled, { css } from 'styled-components';
import Caption from '../UI/Caption';

const StyledCategory = styled.div`
  background: ${(props) => (props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.darkMiddle)};
  border: 1px solid transparent;
  border-right: 1px solid ${(props) => props.theme.baseColors.dark};
  padding-right: 9px;
  padding-left: 9px;
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  cursor: ${(props) => (props.readOnly ? 'default' : 'pointer')};
  min-height: 3rem;
  overflow: hidden;

  &:hover {
    ${(props) =>
      !props.readOnly
        ? css`
            border: 1px solid ${props.theme.accentColors.primary.color};
            background-color: #5767f9;
          `
        : null}
  }

  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }

  h6,
  ${Caption} {
    margin: 0;
    display: block;
  }

  h6 {
    padding-top: 10px;
    color: ${(props) => (props.active ? props.theme.baseColors.white : props.theme.baseColors.light)};
  }

  ${Caption} {
    color: ${(props) => (props.active ? props.theme.baseColors.light : props.theme.baseColors.middleLight)};
    padding: 10px 0;
  }
`;
//TODO: Ask lily for hover state

const StyledCategorySelector = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  margin: 8px 0;
`;

const Category = ({ className, title, description, value, active, onClick, showDescription, readOnly }) => {
  const _onClick = () => {
    !readOnly && onClick && onClick(value);
  };
  return (
    <StyledCategory className={className} onClick={_onClick} active={active} readOnly={readOnly}>
      <h6>{title}</h6>
      {showDescription ? <Caption>{description}</Caption> : null}
    </StyledCategory>
  );
};
const CategorySelector = ({ categories, value, onChange, showDescriptions, readOnly }) => {
  const onCategoryClick = (category) => {
    !readOnly && onChange && onChange(category);
  };
  return (
    <StyledCategorySelector>
      {categories.map((category) => (
        <Category
          key={category.name}
          title={category.name}
          description={category.description}
          value={category.name}
          active={category.name === value}
          onClick={onCategoryClick}
          showDescription={showDescriptions}
          readOnly={readOnly}
        />
      ))}
    </StyledCategorySelector>
  );
};

CategorySelector.defaultProps = {
  showDescriptions: true,
};
export default CategorySelector;
