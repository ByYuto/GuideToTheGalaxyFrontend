import React from 'react';
import styled from 'styled-components';
import Caption from '../UI/Caption';


const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: stretch;
  align-items: stretch;
  background: ${props => props.active ? props.theme.accentColors.primary.color : props.theme.baseColors.darkMiddle};
  border-right: 0.5px solid ${props => props.theme.baseColors.dark};
  padding-right: 9px;
  padding-left: 9px;
  height: 84px;
  flex-basis: 0;
  text-align: center;
  cursor: pointer;

  h6, ${Caption} {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;    
  }

  h6{
    padding-top: 16px;
    margin: 0;
    color: ${props => props.active ? props.theme.baseColors.white : props.theme.baseColors.light}
  } 

  ${Caption} {
    color: ${props => props.active ? props.theme.baseColors.light : props.theme.baseColors.middleLight}
  }
`;

const StyledCategorySelector = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 10px;

  ${StyledCategory} {
    //background: yellow;
  }
`;

const Category = ({ className, title, description, value, active, onClick }) => {
  const _onClick = () => {
    console.log("Click en la categoria", value);
    onClick && onClick(value);
  }
  return <StyledCategory className={className} onClick={_onClick} active={active}>
    <h6>{title}</h6>
    <Caption > {description}</Caption>
  </StyledCategory>
}
const CategorySelector = ({ categories, value, onChange }) => {
  const onCategoryClick = (category) => {
    console.log("click en el selector de categoría", category);
    onChange && onChange(category);
  }
  return <StyledCategorySelector>
    {categories.map(category => <Category key={category.id} title={category.title} description={category.description} value={category.id} active={category.id === value} onClick={onCategoryClick} />)}
    {/*
    <Category title="Equipment" description="The stuff you use in the street" value="equipment" active={value === "equipment"} onClick={onCategoryClick} />
    <Category title="Legal" description="Legislation, laws, rules, arrests etc" />
    <Category title="Museum" description="Memorable references to Buskers in the media" />
    <Category title="Supporting Orgs" description="Other people who like to help buskers out" />
    <Category title="General" description="Doesn’t fit in the other categories?" />
    <Category title="aaa" description="aaa" />
    <Category title="Other people who like to help buskers out" description="bbb" />
    */}
  </StyledCategorySelector>
}

export default CategorySelector;