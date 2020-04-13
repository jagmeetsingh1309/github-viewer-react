import React from 'react';
import styled from 'styled-components';

import { FlexContainer } from './elements/Flex';

const CustomFlexContainer = styled(FlexContainer)`
    background-color: #313131;
    min-height: 100vh;
    position: relative;
`;

const Form = styled.form`
    position: absolute;
    top: 20%;
    color: white;
    text-align: center;
`;

const Input = styled.input`
    background-color: #414141;
    padding: 1.5rem 2rem;
    outline: none;
    border: none;
    width: 80%;
    border-radius: 7px;
    font-size: 1.5rem;
    color: white;
`;

class SearchComponent extends React.Component {

    state = { 
        username: ''
    }

    onSubmit = e =>{
        e.preventDefault();
        this.props.history.push(`/search/${this.state.username}`);
    }

    onChange = (event) => {
        this.setState({ username: event.target.value });
    }

    render(){
        return (
            <CustomFlexContainer justifyContent="center">
                <Form onSubmit={this.onSubmit}>
                    <i className="fab fa-github fa-8x"></i>
                    <h1>Find your Github Profile</h1>
                    <Input onChange={this.onChange} type="text" />
                </Form>
            </CustomFlexContainer>
        );
    }
}

export default SearchComponent;