import React from 'react';
import styled from 'styled-components';
import Caption from '../UI/Caption';


const StyledCategory = styled.div`
  background: ${props => props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.darkMiddle};
  border-right: 0.5px solid ${props => props.theme.baseColors.dark};
  padding-right: 9px;
  padding-left: 9px;
  text-align: center;
  cursor: pointer;

  h6, ${Caption} {
    margin: 0;
    display: block;
  }

  h6{
    padding-top: 10px;
    color: ${props => props.active ? props.theme.baseColors.white : props.theme.baseColors.light};  
  } 

  ${Caption} {
    color: ${props => props.active ? props.theme.baseColors.light : props.theme.baseColors.middleLight};
    padding: 10px 0;
  }

  &:hover {
    background-color: ${props => props.active ? props.theme.accentColors.primary.color : "#949bef"};
  }
`;
//TODO: Ask lily for hover state

const StyledCategorySelector = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 10px;
`;

const Category = ({ className, title, description, value, active, onClick }) => {
  const _onClick = () => {
    onClick && onClick(value);
  }
  return <StyledCategory className={className} onClick={_onClick} active={active}>
    <h6>{title}</h6>
    <Caption>{description}</Caption>
  </StyledCategory>
}
const CategorySelector = ({ categories, value, onChange }) => {
  const onCategoryClick = (category) => {
    onChange && onChange(category);
  }
  return <StyledCategorySelector>
    {categories.map(category => <Category key={category.id} title={category.title} description={category.description} value={category.id} active={category.id === value} onClick={onCategoryClick} />)}
  </StyledCategorySelector>
}

export default CategorySelector;