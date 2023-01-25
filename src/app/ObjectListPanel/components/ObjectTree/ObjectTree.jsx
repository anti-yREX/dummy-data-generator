import React from 'react';
import { Icon, IconButton, List } from "@mui/material";
import {
    TextField, ListItemText, ListItemButton,
} from './ObjectTree.styles';
import Types from '../../../../constants/PropertyTypes.enum';
import { ArrowDropDown, Close } from '@mui/icons-material';
import { batch, useDispatch, useSelector } from 'react-redux';
import { setSelectedKey } from '../../../../services/reduxStore/SelectedKeyReducer';
import { setNewKeyFieldData } from '../../../../services/reduxStore/NewKeyFieldReducer';
import { isEqual } from 'lodash';

const LeafTypeItem = (props) => {
    const {
        keyName,
    } = props;

    const dispatch = useDispatch();

    const selectedKey = useSelector(({ selectedKey }) => (selectedKey));
    const selected = selectedKey.path.includes(keyName);

    const onClickHandler = () => {
        batch(() => {
            dispatch(
                setSelectedKey({
                    path: props.path,
                    keyName,
                    type: props.type,
                })
            );
            dispatch(
                setNewKeyFieldData({
                    show: false,
                    error: false,
                    path: props.path.slice(0, props.path.length - 1),
                })
            );
        });
    }

    return (
        <ListItemButton
            key={keyName}
            sx={{
                backgroundColor: selected && 'rgb(0, 0, 0, 0.1)',
            }}
            onClick={() => onClickHandler()}
        >
            <ListItemText
                sx={{ marginLeft: '16px' }}
                primary={keyName}
            />
        </ListItemButton>
    )
}

const NodeTypeItem = (props) => {
    const {
        keyName,
        children,
        path,
        newKeyFieldProps,
    } = props;

    const dispatch = useDispatch();

    const {selectedKey, newFieldPath, showNewField, showNewKeyError } = useSelector(({ selectedKey, newKeyFieldState }) => ({
        selectedKey,
        newFieldPath: newKeyFieldState.path,
        showNewField: newKeyFieldState.show,
        showNewKeyError: newKeyFieldState.error,
    }));
    const expanded = selectedKey.path.includes(keyName);

    const onClickHandler = () => {
        batch(() => {
            dispatch(
                setSelectedKey({
                    path: props.path,
                    keyName,
                    type: props.type,
                })
            );
            dispatch(
                setNewKeyFieldData({
                    show: false,
                    error: false,
                    path: props.path,
                })
            );
        });
    }

    const onCloseNewKeyField = () => {
        dispatch(setNewKeyFieldData({ show: false, error: false }));
    }

    return (
        <>
            <ListItemButton
                key={keyName}
                sx={{
                    backgroundColor: expanded && 'rgb(0, 0, 0, 0.1)',
                }}
                onClick={() => onClickHandler()}
            >
                <Icon
                    sx={{
                        margin: '0 8px 0 -14px',
                        transform: expanded ? '' : 'rotate(-90deg)',
                    }}
                >
                    <ArrowDropDown />
                </Icon>
                <ListItemText
                    primary={keyName}
                />
            </ListItemButton>
            <List
                sx={{
                    marginLeft: '24px',
                    padding: 0,
                    borderLeft: '2px solid gray',
                    borderRadius: '0 0 0 4px',
                    display: expanded ? 'inherit' : 'none',
                }}
            >
                {Object.keys(children).map((current) => (
                    <ObjectTree
                        key={current}
                        keyName={current}
                        {...children[current]}
                        newKeyFieldProps={newKeyFieldProps}
                    />
                ))}
                {showNewField && isEqual(newFieldPath, path) && (
                    <TextField
                        placeholder="Add New Key Name"
                        autoFocus
                        onKeyPress={newKeyFieldProps.onInputHandler}
                        inputProps={{ maxLength: 50 }}
                        error={showNewKeyError}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={onCloseNewKeyField}>
                                    <Close />
                                </IconButton>
                            )
                        }}
                    />
                )}
            </List>
        </>
    )
}

const ObjectTree = (props) => {
    const {
        type,
        newKeyFieldProps,
    } = props;

    if (!(type === Types.object || type === Types.array)) {
        return (
            <LeafTypeItem
                {...props}
                newKeyFieldProps={newKeyFieldProps}
            />
        )
    }

    return (
        <NodeTypeItem
            {...props}
            newKeyFieldProps={newKeyFieldProps}
        />
    );
}

export default ObjectTree;
