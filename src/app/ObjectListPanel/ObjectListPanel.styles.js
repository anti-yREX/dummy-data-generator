import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { styled as muiStyled } from '@mui/system';

const Container = styled.div`
    border-radius: 16px;
    border: 4px solid black;
    width: 30vw;
    background: white;
    box-shadow: 0px 0px 22px grey;
    height: calc(100% - 44px);
    padding: 24px 0;
    overflow: hidden;

    &.selected {
        box-shadow: 0px 0px 22px black;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding-bottom: 4px;
`;

const Wrapper = styled.div`
    margin-right: 24px;
`;

const StyledIconButton = muiStyled(IconButton)({
    color: 'black',
    '&.right-side': {
        margin: '0 0 0 auto',
    },
});

export {
    Wrapper,
    Container,
    ButtonWrapper,
    StyledIconButton,
};
