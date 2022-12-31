import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItemButton } from "@mui/material";
import { TextField, ListItemText } from './KeysList.styles';
import { setParentObjectData } from "../../../../services/reduxStore/ParentObjectStateReducer";
import { setNewKeyFieldShow } from "../../../../services/reduxStore/NewKeyFieldReducer";

const KeysList = () => {
    const {
        showNewField,
        parentObject,
        selectedKey,
    } = useSelector(
        ({ parentObject, newKeyFieldState, selectedKey }) => ({
            showNewField: newKeyFieldState.show,
            parentObject,
            selectedKey,
        })
    );
    const dispatch = useDispatch();

    const [showNewKeyError, setShowNewKeyError] = useState(false);

    const onBlurHandler = (event) => {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

        if (regex.test(event.target.value) && !parentObject[event.target.value]) {
            if (selectedKey && (selectedKey.type === 'object' || selectedKey.type === 'array')) {
                const currentPath = selectedKey.path;
                let lastObj = parentObject;
                currentPath.forEach((current, index) => {
                    lastObj = lastObj[current].childern;
                });
                console.log(lastObj);
            } else {
                dispatch(
                    setParentObjectData({
                        ...parentObject,
                        [event.target.value]: {
                            path: [event.target.value],
                            type: 'empty',
                            isEmpty: true,
                            children: {},
                        },
                    })
                );
            }
            dispatch(setNewKeyFieldShow(false));
            setShowNewKeyError(false);
        } else {
            setShowNewKeyError(true);
        }
    };

    const onClickHandler = () => {

    }

    return (
        <div>
            <List>
                {Object.keys(parentObject).map((current) => (
                    <ListItemButton
                        key={current}
                        onClick={() => onClickHandler(current)}
                    >
                        <ListItemText
                            primary={current}
                        />
                    </ListItemButton>
                ))}
            </List>
            {showNewField && (
                <TextField
                    placeholder="Add New Key Name"
                    autoFocus
                    onBlur={onBlurHandler}
                    inputProps={{ maxLength: 50 }}
                    error={showNewKeyError}
                />
            )}
        </div>
    )
}

export default KeysList;
