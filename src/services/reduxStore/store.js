import { configureStore } from '@reduxjs/toolkit';
import parentObjectReducer from './ParentObjectStateReducer';
import newKeyFieldReducer from './NewKeyFieldReducer';

export default configureStore({
    reducer: {
        parentObject: parentObjectReducer,
        newKeyFieldState: newKeyFieldReducer,
    },
});
