import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
} from './PropertiesForm.styles';

const ObjectListPanel = () => {
    const {selectedKey, newKeyFieldState} = useSelector(
        ({ selectedKey, newKeyFieldState }) => ({selectedKey, newKeyFieldState})
    );
    return (
        <Container>
            {JSON.stringify({ selectedKey, newKeyFieldState })}
        </Container>
    );
}

export default ObjectListPanel;
