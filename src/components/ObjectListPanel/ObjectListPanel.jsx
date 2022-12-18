import React from 'react';
import {
    Container,
    ButtonWrapper,
    StyledIconButton,
} from './ObjectListPanel.styles';
import { Add, Delete } from '@mui/icons-material';

const ObjectListPanel = () => {
    return (
        <div>
            <ButtonWrapper>
                <StyledIconButton>
                    <Add />
                </StyledIconButton>
                <StyledIconButton  >
                    <Delete />
                </StyledIconButton>
            </ButtonWrapper>
            <Container />
        </div>
    );
}

export default ObjectListPanel;
