import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
} from './PropertiesForm.styles';

const ObjectListPanel = () => {
    const selectedKey = useSelector(
        ({ selectedKey }) => (selectedKey)
    );
    return (
        <Container>
            {JSON.stringify(selectedKey)}
        </Container>
    );
}

export default ObjectListPanel;
