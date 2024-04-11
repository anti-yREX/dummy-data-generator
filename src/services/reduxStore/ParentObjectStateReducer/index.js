import { createSlice } from '@reduxjs/toolkit';
import initialStateObj from './initialStateObj.json';

export const parentObjectSlice = createSlice({
    name: 'parentObject',
    initialState: initialStateObj,
    reducers: {
        setParentObjectData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        deleteKeyFromParentObj: (state, action) => {
            const path = action.payload;
            if (path?.length > 0) {
                if (path.length === 1) {
                    delete state[path[0]];
                    return;
                }
                let lastObj = state[path[0]];
                for(let i = 1; i < path.length - 1; i++) {
                    lastObj = lastObj.children[path[i]];
                }
                delete lastObj.children[path[path.length - 1]];
            }
        }
    },
});

export const { setParentObjectData, deleteKeyFromParentObj } = parentObjectSlice.actions;

export default parentObjectSlice.reducer;
