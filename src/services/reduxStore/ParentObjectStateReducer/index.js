import { createSlice } from '@reduxjs/toolkit';

export const parentObjectSlice = createSlice({
    name: 'parentObject',
    initialState: {
        a: {
            children: {
                b: {
                    msg: 'yey',
                },
            }
        }
    },
    reducers: {
        setParentObjectData: (state, action) => {
            console.log(state, action);
            return {
                ...state,
                ...action.payload,
            };
        }
    },
});

export const { setParentObjectData } = parentObjectSlice.actions;

export default parentObjectSlice.reducer;
