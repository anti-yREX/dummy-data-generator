import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container, TextField,
} from './PropertiesForm.styles';

const ObjectListPanel = () => {
    const {selectedKey, newKeyFieldState} = useSelector(
        ({ selectedKey, newKeyFieldState }) => ({selectedKey, newKeyFieldState})
    );
    return (
        <Container>
            {
                (selectedKey?.path.length !== 0) && (
                    <TextField
                        label="Key"
                        placeholder="Add Key Name"
                        defaultValue={selectedKey.keyName}
                        autoFocus
                        // onKeyPress={onInputHandler}
                        inputProps={{ maxLength: 50 }}
                        // error={showNewKeyError}
                    />
                )
            }
            {JSON.stringify({ selectedKey, newKeyFieldState })}
        </Container>
    );
}

export default ObjectListPanel;
