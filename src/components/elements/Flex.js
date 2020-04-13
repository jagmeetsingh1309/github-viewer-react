import styled from 'styled-components';

export const FlexContainer = styled.div`
    display: flex;
    justify-content: ${ ({ justifyContent }) => justifyContent ?  justifyContent : ''};
`;

export const Item = styled.div`
    padding: ${ ({ padding }) => padding };
    margin: ${ ({ margin }) => margin };
`;