import React from 'react';
import { Add, Delete, Redo, Undo } from '@mui/icons-material';
import { useSelector, useDispatch, batch } from 'react-redux';
import { setNewKeyFieldData } from '../../services/reduxStore/NewKeyFieldReducer';
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
    const {selectedKey, currentPath} = useSelector(
        ({ selectedKey, newKeyFieldState }) => ({selectedKey, currentPath: newKeyFieldState.path})
    );
    const dispatch = useDispatch();
    const selected = selectedKey === null || selectedKey?.path?.length === 0;

    const onClickHandler = (event) => {
        if (event.target.id === objectListContainerId) {
            batch(() => {
                dispatch(
                    setSelectedKey({
                        path: [],
                    })
                );
                if (currentPath.length !== 0) {
                    dispatch(
                        setNewKeyFieldData({
                            show: false,
                            path: [],
                            error: false,
                        }),
                    );
                }
            });
        }
    }
    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledIconButton
                    onClick={() => dispatch(setNewKeyFieldData({ show: true }))}
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
