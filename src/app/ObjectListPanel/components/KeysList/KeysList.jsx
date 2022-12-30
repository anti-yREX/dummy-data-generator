import React from "react";
import { useSelector } from "react-redux";

const KeysList = () => {
    const showNewField = useSelector(({ newKeyFieldState}) => (newKeyFieldState.show))
    return (
        <div>
            List
            {showNewField && (<div>NewKeyField</div>)}
        </div>
    )
}

export default KeysList;
