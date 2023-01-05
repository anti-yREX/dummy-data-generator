import React, { useState } from 'react';
import { Icon, List } from "@mui/material";
import {
    TextField, ListItemText, ListItemButton,
} from './ObjectTree.styles';
import Types from '../../../../constants/PropertyTypes.enum';
import { ArrowDropDown } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedKey } from '../../../../services/reduxStore/SelectedKeyReducer';
import { setNewKeyFieldShow, setNewKeyFieldPath } from '../../../../services/reduxStore/NewKeyFieldReducer';
import { setParentObjectData } from '../../../../services/reduxStore/ParentObjectStateReducer';

const LeafTypeItem = (props) => {
    const { keyName } = props;

    const dispatch = useDispatch();

    const selectedKey = useSelector(({ selectedKey }) => (selectedKey));
    const selected = selectedKey.path.includes(keyName);

    const onClickHandler = () => {
        dispatch(
            setSelectedKey({
                path: props.path,
                keyName,
            })
        );
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
    } = props;

    const [showNewKeyError, setShowNewKeyError] = useState(false);

    const onBlurHandler = (event) => {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

        if (regex.test(event.target.value) && !parentObject[event.target.value]) {
            // if (selectedKey && (selectedKey.type === 'object' || selectedKey.type === 'array')) {
            //     const currentPath = selectedKey.path;
            //     let lastObj = parentObject;
            //     currentPath.forEach((current, index) => {
            //         lastObj = lastObj[current].childern;
            //     });
            //     console.log(lastObj);
            // } else {
                dispatch(
                    setParentObjectData({
                        ...parentObject,
                        [event.target.value]: {
                            keyName: event.target.value,
                            path: [event.target.value],
                            type: Types.empty,
                            isEmpty: true,
                            children: {},
                        },
                    })
                );
            // }
            dispatch(setNewKeyFieldShow(false));
            setShowNewKeyError(false);
        } else {
            setShowNewKeyError(true);
        }
    };

    const dispatch = useDispatch();

    const {selectedKey, newFieldPath, showNewField } = useSelector(({ selectedKey, newKeyFieldState }) => ({
        selectedKey,
        newFieldPath: newKeyFieldState.path,
        showNewField: newKeyFieldState.show,
    }));
    const expanded = selectedKey.path.includes(keyName);

    const onClickHandler = () => {
        dispatch(
            setSelectedKey({
                path: props.path,
                keyName,
            })
        );
        dispatch(
            setNewKeyFieldPath(props.path)
        );
    }

    console.log({selectedKey, newFieldPath, showNewField });

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
                    />
                ))}
                {showNewField && (newFieldPath === path) && (
                    <TextField
                        placeholder="Add New Key Name"
                        autoFocus
                        onBlur={onBlurHandler}
                        inputProps={{ maxLength: 50 }}
                        error={showNewKeyError}
                    />
                )}
            </List>
        </>
    )
}

const ObjectTree = (props) => {
    const {
        type,
    } = props;

    if (!(type === Types.object || type === Types.array)) {
        return (
            <LeafTypeItem
                {...props}
            />
        )
    }

    return (
        <NodeTypeItem
            {...props}
        />
    );
}

export default ObjectTree;
