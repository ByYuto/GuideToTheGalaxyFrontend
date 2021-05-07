import styled from 'styled-components';
import { screen } from '../../utils/constants';

const View = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
`;

export const MaxWidthContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: auto;
  background-color: ${(props) => (props.theme.isDark ? props.theme.baseColors.dark : props.theme.baseColors.white)};
  color: ${(props) => (props.theme.isDark ? props.theme.baseColors.white : props.theme.baseColors.dark)};
`;

export const StyledView = styled(View)`
  justify-content: flex-start;
  overflow: auto;
  height: auto;
  position: relative;

  & .create-article-divider {
    margin-bottom: 0;
    margin-top: 0;
  }

  & > * {
    flex: 0;
  }

  ${MaxWidthContainer} {
    flex-grow: 1;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
`;

export const ProfilePanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #1f1f3d;
  color: white;
  flex: 0 0 0.3;
  max-width: 392px;
`;

export const ProfileUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 13px 23px 13px;
  border-bottom: 1px solid #6670f0;
`;

export const ReportUserButton = styled.button`
  text-align: right;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #6670f0;
  background: none;
  outline: 0;
  border: none;
  cursor: pointer;
  @media (max-width: ${screen.SM}) {
    padding: 0;
  }
`;

export const ProfileImageContainer = styled.div`
  text-align: center;
  margin-bottom: 16px;
  border-radius: 50%;
  overflow: hidden;
`;

export const UserActionsPanel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: stretch;
`;

export const UserActionButton = styled.button`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #9695b7;
  background: none;
  outline: 0;
  border: none;
  cursor: pointer;
`;

export const UserName = styled.h4`
  color: #6670f0;
  margin: 4px 0;
`;

export const Location = styled.div`
  margin: 4px 0;
`;

export const Genres = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  /* or 160% */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  /* mid gray */

  color: #bdbfdf;
  margin: 4px 0;
`;

export const OtherUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  background: #151531;
  /* DS Dark Layering Y4 12-16% */

  box-shadow: 0px 4px 16px rgba(1, 1, 69, 0.24);
  padding: 0 16px;
  align-items: center;
`;
export const StatusContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;
export const Level = styled.div`
  color: #ffffff;
  padding: 9px 0;
`;
export const KarmaContainer = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  /* or 157% */

  text-align: center;

  /* clear BG */

  color: #f6f8ff;
  padding: 9px 0;
`;
export const KarmaValue = styled.span`
  font-family: Pragati Narrow;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.01em;
  text-transform: uppercase;

  /* Pink */

  color: #e3bbea;
`;
export const Description = styled.div`
  text-align: center;
`;
export const BuskProfileButton = styled.button`
  font-family: Lato;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  color: #ffffff;
  outline: 0;
  border: none;
  cursor: pointer;
  background: #6670f0;
  /* DS Focus 0-12 (10%) */

  box-shadow: 0px 0px 12px rgba(97, 124, 255, 0.1);
  border-radius: 18px;
  width: 100%;
  height: 36px;
  max-width: 193px;
  margin: 24px 0;
`;
export const JoinedCommunityContainer = styled.div`
  display: flex;
`;
export const JoinedCommunityValue = styled.div`
  /* Caption - Lato 12 Bold */

  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  /* Pink */

  color: #e3bbea;
  margin-left: 13px;
`;

//Contributions Panel
export const ContributionsPanel = styled.div`
  flex: 1;
`;

export const ContributionsTitle = styled.h6``;
