import React, { useState } from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

export const ToggleContributorLayout = styled.div`
  background-color: #f6f8ff;
  display: flex;
  align-content: center;
  padding: 20px;
  justify-content: space-between;
  margin-top: 24px;

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
  const [contributions, setContributiosn] = useState(false);
  return (
    <ToggleContributorLayout>
      <span>Edits from the community LOCKED</span>
      <Toggle checked={contributions} onChange={setContributiosn} />
    </ToggleContributorLayout>
  );
}
