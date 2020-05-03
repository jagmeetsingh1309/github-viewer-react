import React from 'react';
import styled, { keyframes } from 'styled-components';

import UserDetails from './UserDetails';
import RepoList from './RepoList';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { FlexContainer,Item } from './elements/Flex';

const CustomFlexContainer = styled(FlexContainer)`
    background-color: #EEEEEE;
    @media(max-width:500px){
        flex-wrap: wrap;
    }
`;

const CustomItem = styled(Item)`
    margin: 1rem auto;
    @media(max-width:500px){
        width:90%;
        margin: 1rem auto;
    }
`;

const spin = keyframes`
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
`;

const SpinnerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: solid 5px #cfd0d1;
    border-bottom-color: #1c87c9;
    border-radius: 50%;
    animation: 1.5s linear infinite ${spin};
`;

class Home extends React.Component {
    state = {
        user: {},
        repos: [],
        isLoading: false
    }

    BASE_URL = 'https://api.github.com';

    componentDidMount(){
        this.setState({ isLoading: true })
        const { username } = this.props.match.params;
        fetch(`${this.BASE_URL}/users/${username}`)
            .then(result => result.json())
            .then(user => {
                fetch(user.repos_url)
                    .then(result => result.json())
                    .then(repos => {
                        this.setState({ user: user, repos: repos, isLoading: false});
                    })
            })
            .catch(err => console.log(err));
    }

    render() {
        if(this.state.isLoading){
            return <SpinnerWrapper>
                <Spinner />
            </SpinnerWrapper>;
        } else {
            if(Object.keys(this.state.user).length > 0){
                if(this.state.repos.length > 0){
                    return (
                        <div>
                            <UserDetails user={ this.state.user } />
                            <CustomFlexContainer justifyContent="center">
                                <CustomItem><PieChart repos={ this.state.repos } /></CustomItem>
                                <CustomItem><BarChart repos={ this.state.repos } /></CustomItem>
                            </CustomFlexContainer>
                            <RepoList repos={ this.state.repos } />
                        </div>
                    );
                } else {
                    return <h1>No Repos Found.</h1>
                }
            } else {
                return <h1>No User Found.</h1>;
            }
        }
        
    }
}

export default Home;