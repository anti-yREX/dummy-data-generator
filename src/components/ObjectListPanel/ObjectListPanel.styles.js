import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { styled as muiStyled } from '@mui/system';

const Container = styled.div`
    margin-right: 8vw;
    border-radius: 16px;
    border: 4px solid black;
    width: 30vw;
    background: white;
    box-shadow: 0px 0px 22px grey;
    height: calc(100% - 44px);
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding-bottom: 4px;
`;

const StyledIconButton = muiStyled(IconButton)({
    color: 'black',
});

export {
    Container,
    ButtonWrapper,
    StyledIconButton,
};
