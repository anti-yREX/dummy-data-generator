import { createSlice } from '@reduxjs/toolkit';

export const newKeyFieldSlice = createSlice({
    name: 'newKeyFieldState',
    initialState: {
        show: false,
        path: [],
    },
    reducers: {
        setNewKeyFieldShow: (state, action) => {
            state.show = action.payload;
        },
        setNewKeyFieldPath: (state, action) => {
            state.path = action.payload;
        }
    },
})

export const { setNewKeyFieldShow } = newKeyFieldSlice.actions;

export default newKeyFieldSlice.reducer;
