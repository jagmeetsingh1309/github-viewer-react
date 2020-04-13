import React from 'react';
import styled, { keyframes} from 'styled-components';

import { FlexContainer } from './elements/Flex';

const fadeIn = keyframes`
    0%{
        transform: scale(0);
    } 
    100% {
        transform: scale(1);
    }
`;

const Card = styled.div`
    padding: 1.5rem 2rem;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.1);
    border-radius: 5px;
    grid-column: span 4;
    background-color: white;
    animation: ${fadeIn} 0.7s;
    .lead{
        color: #626262;
    }
`;

const RepoCard = props => {
    const { repo } = props;
    return (
        <Card>
            <h3><i className="fas fa-book"></i> {repo.name}</h3>
            <div className="lead">
                <p>{repo.description}</p>
                <FlexContainer justifyContent="space-around">
                    <span>{repo.language}</span>
                    <span><i className="fas fa-star"></i> {repo.stargazers_count}</span>
                    <span><i className="fas fa-code-branch"></i> {repo.forks_count}</span>
                    <span>Size: {repo.size}</span>
                </FlexContainer>
            </div>
        </Card>
    )
}

export default RepoCard;