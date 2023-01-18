import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { styled as muiStyled } from '@mui/system';
import { TextField as MuiTextField } from '../../components/TextField';

const Container = styled.div`
    border-radius: 16px;
    border: 4px solid black;
    width: 100%;
    background: white;
    box-shadow: 0px 0px 22px grey;
    padding: 24px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding-bottom: 4px;
`;

const TextField = muiStyled(MuiTextField)({
    width: '100%',
});

export {
    Container,
    ButtonWrapper,
    TextField,
};
