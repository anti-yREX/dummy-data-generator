import React, { useState } from "react";
import { batch, useDispatch, useSelector } from 'react-redux';
import { IconButton, List } from "@mui/material";
import { TextField } from './KeysList.styles';
import { setParentObjectData } from "../../../../services/reduxStore/ParentObjectStateReducer";
import { setNewKeyFieldData } from "../../../../services/reduxStore/NewKeyFieldReducer";
import Types from "../../../../constants/PropertyTypes.enum";
import ObjectTree from "../ObjectTree/ObjectTree";
import { Close } from "@mui/icons-material";

const KeysList = () => {
    const {
        showNewField,
        newFieldPath,
        showNewKeyError,
        parentObject,
    } = useSelector(
        ({ parentObject, newKeyFieldState }) => ({
            showNewField: newKeyFieldState.show,
            newFieldPath: newKeyFieldState.path,
            showNewKeyError: newKeyFieldState.error,
            parentObject,
        })
    );

    const dispatch = useDispatch();

    const onInputHandler = (event) => {
        if (event.key === 'Enter') {
            const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    
            if (regex.test(event.target.value) && !parentObject[event.target.value]) {
                batch(() => {
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
                    dispatch(
                        setNewKeyFieldData({
                            show: false,
                            error: false,
                        }),
                    );
                });
            } else {
                dispatch(
                    setNewKeyFieldData({
                        error: true,
                    }),
                );
            }
        }
    };

    const onCloseNewKeyField = () => {
        dispatch(setNewKeyFieldData({ show: false, error: false }));
    }

    return (
        <div>
            <List>
                {Object.keys(parentObject).map((current) => (
                    <ObjectTree
                        key={current}
                        {...parentObject[current]}
                        newKeyFieldProps={{
                            onBlurHandler: onInputHandler,
                            onCloseNewKeyField,
                        }}
                    />
                ))}
            </List>
            {showNewField && newFieldPath.length === 0 && (
                <TextField
                    placeholder="Add New Key Name"
                    autoFocus
                    onKeyPress={onInputHandler}
                    inputProps={{ maxLength: 50 }}
                    error={showNewKeyError}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={onCloseNewKeyField}>
                                <Close />
                            </IconButton>
                        ),
                    }}
                />
            )}
        </div>
    )
}

export default KeysList;
