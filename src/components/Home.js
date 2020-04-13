import React from 'react';
import styled from 'styled-components';

import UserDetails from './UserDetails';
import RepoList from './RepoList';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { FlexContainer,Item } from './elements/Flex';

const CustomFlexContainer = styled(FlexContainer)`
    background-color: #EEEEEE;
`;

class Home extends React.Component {
    state = {
        user: {},
        repos: []
    }

    BASE_URL = 'https://api.github.com';

    componentDidMount(){
        const { username } = this.props.match.params;
        fetch(`${this.BASE_URL}/users/${username}`)
            .then(result => result.json())
            .then(user => {
                fetch(user.repos_url)
                    .then(result => result.json())
                    .then(repos => {
                        this.setState({ user: user, repos: repos});
                    })
            })
            .catch(err => console.log(err));
    }

    render() {
        if(Object.keys(this.state.user).length > 0){
            if(this.state.repos.length > 0){
                return (
                    <div>
                        <UserDetails user={ this.state.user } />
                        <CustomFlexContainer justifyContent="center">
                            <Item margin="1rem"><PieChart repos={ this.state.repos } /></Item>
                            <Item margin="1rem"><BarChart repos={ this.state.repos } /></Item>
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

export default Home;