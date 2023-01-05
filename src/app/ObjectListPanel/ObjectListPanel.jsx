import React from 'react';
import { Add, Delete, Redo, Undo } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { setNewKeyFieldShow, setNewKeyFieldPath } from '../../services/reduxStore/NewKeyFieldReducer';
import { setSelectedKey } from '../../services/reduxStore/SelectedKeyReducer';
import {
    Wrapper,
    Container,
    ButtonWrapper,
    StyledIconButton,
} from './ObjectListPanel.styles';
import KeysList from './components/KeysList/KeysList';

const objectListContainerId = 'object-list-container';

const ObjectListPanel = () => {
    const selectedKey = useSelector(
        ({ selectedKey }) => (selectedKey)
    );
    const dispatch = useDispatch();
    const selected = selectedKey === null || selectedKey?.path?.length === 0;

    const onClickHandler = (event) => {
        if (event.target.id === objectListContainerId) {
            dispatch(
                setSelectedKey({
                    path: [],
                })
            );
            dispatch(
                setNewKeyFieldPath([]),
            )
        }
    }
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
            <Container
                className={selected && 'selected'}
                onClick={onClickHandler}
                id={objectListContainerId}
            >
                <KeysList />
            </Container>
        </Wrapper>
    );
}

export default ObjectListPanel;
