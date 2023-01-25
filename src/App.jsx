import React from "react";
import { Provider } from 'react-redux'
import MainContent from "./app/MainContent";
import store from './services/reduxStore/store';

// This component will contain all Provider Wrappers like:
// for ThemeProvoder, Redux-Provider, etc.

const App = () => {
    return (
        <Provider store={store}>
            <MainContent />
        </Provider>
    );
}

export default App;
