import { createSlice } from '@reduxjs/toolkit';

export const newKeyFieldSlice = createSlice({
    name: 'newKeyFieldState',
    initialState: {
        show: false,
        path: [],
        error: false,
    },
    reducers: {
        setNewKeyFieldShow: (state, action) => {
            state.show = action.payload;
        },
        setNewKeyFieldPath: (state, action) => {
            state.path = action.payload;
        },
        setNewKeyFieldData: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
})

export const { setNewKeyFieldData } = newKeyFieldSlice.actions;

export default newKeyFieldSlice.reducer;
