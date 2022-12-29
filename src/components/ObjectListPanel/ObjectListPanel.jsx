import React from 'react';
import {
    Container,
    ButtonWrapper,
    StyledIconButton,
} from './ObjectListPanel.styles';
import { Add, Delete, Redo, Undo } from '@mui/icons-material';

const ObjectListPanel = () => {
    return (
        <div>
            <ButtonWrapper>
                <StyledIconButton>
                    <Add />
                </StyledIconButton>
                <StyledIconButton disabled >
                    <Delete />
                </StyledIconButton>
                <StyledIconButton disabled >
                    <Undo />
                </StyledIconButton>
                <StyledIconButton disabled >
                    <Redo />
                </StyledIconButton>
            </ButtonWrapper>
            <Container />
        </div>
    );
}

export default ObjectListPanel;
