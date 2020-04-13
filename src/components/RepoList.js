import React from 'react';
import styled from 'styled-components';

import RepoCard from './RepoCard';
import FilterComponent from './FilterComponent';
import { FlexContainer } from './elements/Flex';

const Wrapper = styled.div`
    padding: 1rem 4rem;
    background-color: #EEEEEE;
    margin-top: -75px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-gap: 1.5rem;
`;

class RepoList extends React.Component{

    state = {
        repos: this.props.repos
    }

    onChangeFilter = filter => {
        switch(filter){
            case 'stars':
                this.setState({ repos: this.state.repos.sort( (a,b) => b.stargazers_count - a.stargazers_count ) });                
                break;
            case 'forks':
                this.setState({ repos: this.state.repos.sort( (a,b) => b.forks_count - a.forks_count )});
                break;
            case 'size':
                this.setState({ repos: this.state.repos.sort( (a,b) => b.size - a.size ) });
                break;
            default: break;
        }
    }

    render(){
        let reposJsx = this.state.repos.map(repo => <RepoCard key={repo.id} repo={repo} /> );
        return (
            <Wrapper>
                <FlexContainer>
                    <h1>Top Repos</h1>
                    <FilterComponent onChangeFilter={this.onChangeFilter} />
                </FlexContainer>
                <GridContainer>
                    {reposJsx}
                </GridContainer>
            </Wrapper>
        );
    }
}

export default RepoList;