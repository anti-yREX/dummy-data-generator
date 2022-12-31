import { createSlice } from '@reduxjs/toolkit';

export const newKeyFieldSlice = createSlice({
    name: 'newKeyFieldState',
    initialState: {
        show: false,
    },
    reducers: {
        setNewKeyFieldShow: (state, action) => {
            state.show = action.payload;
        }
    },
})

export const { setNewKeyFieldShow } = newKeyFieldSlice.actions;

export default newKeyFieldSlice.reducer;
