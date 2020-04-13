import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import { FlexContainer, Item } from './elements/Flex';

const Wrapper = styled.div`
    padding: 1rem;
    background-color: #313131;
    color: white;
    text-align: center;
    height: 100vh;
`;

const Image = styled.img`
    height: 10rem;
    border-radius: 50%;
    border: 7px solid #ca3e47;
`;

const Text = styled.span`
    font-size: ${ (props) => props.size };
`;

const Link = styled.a`
    color: #ca3e47;
    text-decoration: none;
    font-size: 1.5rem;
    &:hover {
        text-decoration: underline;
    }
`;

const StyledItem = styled(Item)`
    background-color: #414141;
    border-radius: 5px;
`;

const UserDetails = props => {
    let { user } = props;
    return (
        <Wrapper>
            <Image src={user.avatar_url} alt="No img found" />
            <h1>{user.name}</h1>
            <Link href={user.url}>@{user.login}</Link>
            <FlexContainer justifyContent="center">
                { user.company &&<Item padding="1rem"><i className="fas fa-briefcase"></i> {user.company}</Item> }
                { user.location && 
                    <Item padding="1rem">
                    <i className="fas fa-map-marker-alt"></i> {user.location}
                    </Item>
                }
                <Item padding="1rem"><i className="far fa-calendar-alt"></i> <Moment format={"LL"}>{user.created_at}</Moment></Item>
            </FlexContainer>
            <FlexContainer justifyContent="center">
                <StyledItem padding="2rem" margin="0.5rem">
                    <Text size='1.5rem'>{user.public_repos}</Text><br/>REPOSITORIES
                </StyledItem>
                <StyledItem padding="2rem" margin="0.5rem">
                    <Text size='1.5rem'>{user.followers}</Text><br/>FOLLOWERS
                </StyledItem>
                <StyledItem padding="2rem" margin="0.5rem">
                    <Text size='1.5rem'>{user.following}</Text><br/>FOLLOWING
                </StyledItem>
            </FlexContainer>
        </Wrapper>
    );
}

export default UserDetails;