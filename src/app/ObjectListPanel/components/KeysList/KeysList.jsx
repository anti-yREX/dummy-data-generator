import React from "react";
import { batch, useDispatch, useSelector } from 'react-redux';
import { IconButton, List } from "@mui/material";
import { TextField } from './KeysList.styles';
import { setParentObjectData } from "../../../../services/reduxStore/ParentObjectStateReducer";
import { setNewKeyFieldData } from "../../../../services/reduxStore/NewKeyFieldReducer";
import Types from "../../../../constants/PropertyTypes.enum";
import ObjectTree from "../ObjectTree/ObjectTree";
import { Close } from "@mui/icons-material";
import { cloneDeep } from "lodash";

const KeysList = () => {
    const {
        showNewField,
        newFieldPath,
        showNewKeyError,
        parentObject,
        selectedKey,
    } = useSelector(
        ({
            parentObject,
            newKeyFieldState,
            selectedKey,
        }) => ({
            showNewField: newKeyFieldState.show,
            newFieldPath: newKeyFieldState.path,
            showNewKeyError: newKeyFieldState.error,
            parentObject,
            selectedKey,
        })
    );

    const dispatch = useDispatch();

    const onInputHandler = (event) => {
        if (event.key === 'Enter') {
            const regex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    
            if (regex.test(event.target.value)) {
                batch(() => {
                    let success = false;
                    if (selectedKey?.path.length !== 0) {
                        const currentPath = selectedKey.path;
                        const newParentObj = cloneDeep(parentObject);
                        let lastObj = newParentObj;
                        const key = currentPath[0];
                        if (
                            currentPath.length === 1 &&
                            !(
                                lastObj[key].type === Types.object ||
                                lastObj[key].type === Types.array
                            )
                        ) {
                            if (!newParentObj[event.target.value]) {
                                dispatch(
                                    setParentObjectData({
                                        ...newParentObj,
                                        [event.target.value]: {
                                            keyName: event.target.value,
                                            path: [event.target.value],
                                            type: Types.empty,
                                            isEmpty: true,
                                            children: {},
                                        },
                                    })
                                );
                                success = true;
                            }
                        } else {
                            currentPath.forEach((current, index) => {
                                if (
                                    index === 0
                                ) {
                                    lastObj = lastObj[current];
                                } else if (
                                    lastObj.children[current].type === Types.object ||
                                    lastObj.children[current].type === Types.array
                                ) {
                                    lastObj = lastObj.children[current];
                                }
                            });
                            if (!lastObj.children[event.target.value]) {
                                const newPath = (selectedKey.type === Types.array || selectedKey.type === Types.object) ?
                                    currentPath : currentPath.slice(0, currentPath.length - 1);

                                lastObj.children = {
                                    ...lastObj.children,
                                    [event.target.value]: {
                                        keyName: event.target.value,
                                        path: [...newPath, event.target.value],
                                        type: Types.empty,
                                        isEmpty: true,
                                        children: {},
                                    },
                                }
                                dispatch(
                                    setParentObjectData(newParentObj)
                                );
                                success = true;
                            }
                        }
                    } else {
                        if (!parentObject[event.target.value]) {
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
                            success = true;
                        }
                    }
                    if (success) {
                        dispatch(
                            setNewKeyFieldData({
                                show: false,
                                error: false,
                            }),
                        );
                    } else {
                        dispatch(
                            setNewKeyFieldData({
                                error: true,
                            }),
                        );
                    }
                });
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
                            onInputHandler,
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
