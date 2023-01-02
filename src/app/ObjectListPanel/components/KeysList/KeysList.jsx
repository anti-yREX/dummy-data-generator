import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItemButton } from "@mui/material";
import { TextField, ListItemText } from './KeysList.styles';
import { setParentObjectData } from "../../../../services/reduxStore/ParentObjectStateReducer";
import { setNewKeyFieldShow } from "../../../../services/reduxStore/NewKeyFieldReducer";
import Types from "../../../../constants/PropertyTypes.enum";
import ObjectTree from "../ObjectTree/ObjectTree";

const KeysList = () => {
    const {
        show: showNewField,
        path: showNewFieldPath,
        parentObject,
    } = useSelector(
        ({ parentObject, newKeyFieldState, selectedKey }) => ({
            ...newKeyFieldState,
            parentObject,
        })
    );

    const dispatch = useDispatch();

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

    return (
        <div>
            <List>
                {Object.keys(parentObject).map((current) => (
                    <ObjectTree
                        key={current}
                        {...parentObject[current]}
                    />
                ))}
            </List>
            {showNewField && showNewFieldPath.length === 0 && (
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
