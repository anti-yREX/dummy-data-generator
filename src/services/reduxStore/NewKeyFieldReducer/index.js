import { createSlice } from '@reduxjs/toolkit';

export const newKeyFieldSlice = createSlice({
    name: 'newKeyFieldState',
    initialState: {
        show: false,
        path: [],
        error: false,
    },
    reducers: {
        setNewKeyFieldData: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
})

export const { setNewKeyFieldData } = newKeyFieldSlice.actions;

export default newKeyFieldSlice.reducer;
