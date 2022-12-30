import React from "react";
import NewKeyField from "../NewKeyField";
import { useSelector } from "react-redux";

const KeysList = () => {
    const showNewField = useSelector(({ newKeyFieldState}) => (newKeyFieldState.show))
    return (
        <div>
            List
            {showNewField && (<NewKeyField />)}
        </div>
    )
}

export default KeysList;
