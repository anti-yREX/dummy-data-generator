import { createSlice } from '@reduxjs/toolkit';

export const parentObjectSlice = createSlice({
    name: 'parentObject',
    initialState: {},
    reducers: {
        setParentObjectData: (state, action) => {
            state = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setParentObjectData } = parentObjectSlice.actions;

export default parentObjectSlice.reducer;
