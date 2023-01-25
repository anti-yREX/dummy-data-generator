import { createSlice } from '@reduxjs/toolkit';

export const selectedKeySlice = createSlice({
    name: 'selectedKey',
    initialState: {
        path: [],
    },
    reducers: {
        setSelectedKey: (state, action) => {
            return action.payload;
        }
    },
});

export const { setSelectedKey } = selectedKeySlice.actions;

export default selectedKeySlice.reducer;
