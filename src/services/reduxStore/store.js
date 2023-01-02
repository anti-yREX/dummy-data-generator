import { configureStore } from '@reduxjs/toolkit';
import parentObjectReducer from './ParentObjectStateReducer';
import newKeyFieldReducer from './NewKeyFieldReducer';
import selectedKeyReducer from './SelectedKeyReducer';

export default configureStore({
    reducer: {
        parentObject: parentObjectReducer,
        newKeyFieldState: newKeyFieldReducer,
        selectedKey: selectedKeyReducer,
    },
});
