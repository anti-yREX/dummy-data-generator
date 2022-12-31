import React from 'react';
import { Add, Delete, Redo, Undo } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setNewKeyFieldShow } from '../../services/reduxStore/NewKeyFieldReducer';
import {
    Wrapper,
    Container,
    ButtonWrapper,
    StyledIconButton,
} from './ObjectListPanel.styles';
import KeysList from './components/KeysList/KeysList';

const ObjectListPanel = () => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledIconButton
                    onClick={() => dispatch(setNewKeyFieldShow(true))}
                >
                    <Add />
                </StyledIconButton>
                <StyledIconButton disabled >
                    <Delete />
                </StyledIconButton>
                <StyledIconButton className="right-side" disabled >
                    <Undo />
                </StyledIconButton>
                <StyledIconButton disabled >
                    <Redo />
                </StyledIconButton>
            </ButtonWrapper>
            <Container>
                <KeysList />
            </Container>
        </Wrapper>
    );
}

export default ObjectListPanel;
