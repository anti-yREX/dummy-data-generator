import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from './KeysList.styles';
import { setParentObjectData } from "../../../../services/reduxStore/ParentObjectStateReducer";
import { setNewKeyFieldShow } from "../../../../services/reduxStore/NewKeyFieldReducer";
import { List, ListItem, ListItemText } from "@mui/material";

const KeysList = () => {
    const { showNewField, parentObject } = useSelector(
        ({ parentObject, newKeyFieldState }) => ({
            showNewField: newKeyFieldState.show,
            parentObject,
        })
    );
    const dispatch = useDispatch();

    const onBlurHandler = (event) => {
        const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

        if (regex.test(event.target.value)) {
            dispatch(
                setParentObjectData({
                    ...parentObject,
                    [event.target.value]: {
                        isEmpty: true,
                    },
                })
            );
        }
        dispatch(setNewKeyFieldShow(false));
    };
    return (
        <div>
            <List>
                {Object.keys(parentObject).map((current) => (
                    <ListItem>
                        <ListItemText
                            primary={current}
                        />
                    </ListItem>
                ))}
            </List>
            {showNewField && (
                <TextField
                    placeholder="Add New Key Name"
                    autoFocus
                    onBlur={onBlurHandler}
                />
            )}
        </div>
    )
}

export default KeysList;
