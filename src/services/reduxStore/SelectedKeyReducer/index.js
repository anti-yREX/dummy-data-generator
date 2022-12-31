import { createSlice } from '@reduxjs/toolkit';

export const selectedKeySlice = createSlice({
    name: 'selectedKey',
    initialState: {
        type: 'object',
        path: ['a', 'b'],
    },
    reducers: {
        setSelectedKeySlice: (state, action) => {
            return action.payload;
        }
    },
});

export const { setSelectedKeySlice } = selectedKeySlice.actions;

export default selectedKeySlice.reducer;
