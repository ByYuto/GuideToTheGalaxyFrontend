import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';
import { useSelector, useDispatch } from 'react-redux';
import { activateContributions } from '../../redux/reducers/newArticleState';

export const ToggleContributorLayout = styled.div`
  background-color: #f6f8ff;
  display: flex;
  align-content: center;
  padding: 20px;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 24px;

  & span {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;

    display: flex;
    align-items: center;
  }
`;

export default function ToggleContributor() {
  const { newArticle } = useSelector((store) => store.newArticle);
  const dispatch = useDispatch();
  return (
    <ToggleContributorLayout>
      <span>Edits from the community {newArticle.contributions ? 'ALLOWED' : 'LOCKED'}</span>
      <Toggle
        checked={newArticle.contributions}
        onChange={() => dispatch(activateContributions(!newArticle.contributions))}
        tooltipText="Allow/Lock community contributions"
      />
    </ToggleContributorLayout>
  );
}
