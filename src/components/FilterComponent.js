import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
    padding: 1rem 1.5rem 1rem 1rem;
    color: #2250ab;
    background-color: #b0d9f5;
    border: 1px solid #84a6bd;
    border-radius: 7px;
    font-size: 16px;
    cursor: pointer;
    
    &:focus{
        outline: none;
    }
`;


class FilterComponent extends React.Component{
    
    onChangeHandler = event => {
        this.props.onChangeFilter(event.target.value);
    }

    render(){
        return (
            <div style={{ padding: '1rem' }}>
                <form>
                    <Select onChange={this.onChangeHandler}>
                        <option value="stars">stars</option>
                        <option value="forks">forks</option>
                        <option value="size">size</option>
                    </Select>
                </form>
            </div>
        );
    }
}

export default FilterComponent;