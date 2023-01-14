import React from 'react';
import { Add, Delete, Redo, Undo } from '@mui/icons-material';
import { useSelector, useDispatch, batch } from 'react-redux';
import { setNewKeyFieldData } from '../../services/reduxStore/NewKeyFieldReducer';
import { setSelectedKey } from '../../services/reduxStore/SelectedKeyReducer';
import { deleteKeyFromParentObj } from '../../services/reduxStore/ParentObjectStateReducer';
import {
    Wrapper,
    Container,
    ButtonWrapper,
    StyledIconButton,
} from './ObjectListPanel.styles';
import KeysList from './components/KeysList/KeysList';

const objectListContainerId = 'object-list-container';

const ObjectListPanel = () => {
    const {
        selectedKey,
        currentPath,
        parentObject,
    } = useSelector(
        ({ selectedKey, newKeyFieldState, parentObject }) => ({
            selectedKey,
            currentPath: newKeyFieldState.path,
            parentObject,
        })
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

    const getSiblingIndex = (parentObject, targetKey) => {
        let siblingIndex = -1;
        const keyList = Object.keys(parentObject);
        for (let i = 0; i < keyList.length; i++) {
            if (keyList[i] === targetKey) {
                if (i === keyList.length - 1) {
                    siblingIndex = i - 1;
                } else {
                    siblingIndex = i + 1;
                }
            }
        }
        return {
            siblingIndex,
            keyName: keyList[siblingIndex],
        };
    }

    const onDeleteHandler = () => {
        const targetPath = selectedKey?.path;
        let newSelectedKey = { path: [] };
        if (targetPath.length > 0) {
            if (targetPath.length === 1) {
                const targetKey = targetPath[0];
                const { siblingIndex, keyName } = getSiblingIndex(parentObject, targetKey);
                if (siblingIndex !== -1) {
                    newSelectedKey = parentObject[keyName];
                }
            } else {
                let targetParent = parentObject[targetPath[0]];
                for(let i = 1; i < targetPath.length - 1; i++) {
                    targetParent = targetParent.children[targetPath[i]];
                }
                const targetKey = targetPath[targetPath.length - 1];
                const { siblingIndex, keyName } = getSiblingIndex(targetParent.children, targetKey);
                if (siblingIndex === -1) {
                    newSelectedKey = {
                        path: targetParent.path,
                        keyName: targetParent.keyName,
                        type: targetParent.type,
                    };
                } else {
                    const sibling = targetParent.children[keyName];
                    newSelectedKey = {
                        path: sibling.path,
                        keyName: sibling.keyName,
                        type: sibling.type,
                    };
                }
            }
        }
        batch(() => {
            dispatch(
                setSelectedKey(newSelectedKey)
            );
            dispatch(
                deleteKeyFromParentObj(targetPath)
            );
        });
    }

    return (
        <Wrapper>
            <ButtonWrapper>
                <StyledIconButton
                    onClick={() => dispatch(setNewKeyFieldData({ show: true }))}
                >
                    <Add />
                </StyledIconButton>
                <StyledIconButton
                    disabled={selected}
                    onClick={onDeleteHandler}
                >
                    <Delete />
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
