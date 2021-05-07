import React from 'react';
import {
  ContributionsPanel,
  MaxWidthContainer,
  ProfileContainer,
  ProfileImageContainer,
  ProfilePanel,
  ProfileUserInfo,
  UserActionsPanel,
  UserActionButton,
  UserName,
  Location,
  Genres,
  OtherUserInfo,
  StatusContainer,
  Level,
  KarmaContainer,
  KarmaValue,
  Description,
  BuskProfileButton,
  JoinedCommunityContainer,
  JoinedCommunityValue,
} from './styled-components';
import { RiFlag2Line } from 'react-icons/ri';
import { IoMdHand } from 'react-icons/io';

export default function Profile() {
  return (
    <MaxWidthContainer>
      <ProfileContainer>
        <ProfilePanel>
          <ProfileUserInfo>
            <UserActionsPanel>
              <UserActionButton>
                <RiFlag2Line style={{ fontSize: 16, marginRight: '7px' }} /> Report User
              </UserActionButton>
            </UserActionsPanel>
            <ProfileImageContainer>
              <img src="https://via.placeholder.com/96" alt="profile" />
            </ProfileImageContainer>
            <UserName>User name</UserName>
            <Location>Manizales, Colombia</Location>
            <Genres>Juggler, Musician</Genres>
          </ProfileUserInfo>
          <OtherUserInfo>
            <StatusContainer>
              <Level>
                <IoMdHand style={{ fontSize: 16, marginRight: '12px', verticalAlign: 'middle' }} /> Newbee
              </Level>
              <KarmaContainer>
                <KarmaValue>1300</KarmaValue> Karma
              </KarmaContainer>
            </StatusContainer>
            <Description>
              From the moment Rhys Crimmin starts playing, audiences are drawn to the warm sound he creates. As he sits
              amongst an array of instruments you will feel the rhythmic pulse of the stomp box, the haunting drone of
              the didgeridoo or bluesy sounds of the harmonica, his guitar work playing underneath while his raw,
              powerful and emotive vocals soar above. Rhys lets his music do the talking, and the crowd is ready to
              listen.
            </Description>
            <BuskProfileButton>Busk profile</BuskProfileButton>
            <JoinedCommunityContainer>
              Joined the community <JoinedCommunityValue>A year ago</JoinedCommunityValue>
            </JoinedCommunityContainer>
          </OtherUserInfo>
        </ProfilePanel>
        <ContributionsPanel>
          <div>50 Contributions</div>
          <div>
            <div>June 14, 2019</div>
            <div>Category - Subcategory - Location</div>
            <h3>An honest review of the 10+ Amps for busking</h3>
            <p>
              Choosing the right amp for your act can be intimidating for a new street performer and still pretty
              confusing...
            </p>
          </div>
        </ContributionsPanel>
      </ProfileContainer>
    </MaxWidthContainer>
  );
}
