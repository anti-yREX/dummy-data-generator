import { createSlice } from '@reduxjs/toolkit';

export const parentObjectSlice = createSlice({
    name: 'parentObject',
    initialState: {
        a: {
            keyName: 'a',
            path: ['a'],
            type: 'object',
            children: {
                b: {
                    keyName: 'b',
                    path: ['a', 'b'],
                    type: 'uuid',
                },
                c: {
                    keyName: 'c',
                    path: ['a', 'c'],
                    type: 'object',
                    children: {
                        d: {
                            keyName: 'd',
                            path: ['a', 'c', 'd'],
                            type: 'uuid',
                        },
                    },
                },
                f: {
                    keyName: 'f',
                    path: ['a', 'f'],
                    type: 'object',
                    children: {
                        g: {
                            keyName: 'g',
                            path: ['a', 'f', 'g'],
                            type: 'uuid',
                        },
                        h: {
                            keyName: 'h',
                            path: ['a', 'f', 'h'],
                            type: 'uuid',
                        },
                        i: {
                            keyName: 'i',
                            path: ['a', 'f', 'i'],
                            type: 'uuid',
                        },
                    }
                }
            }
        },
        e: {
            keyName: 'e',
            path: ['e'],
            type: 'uuid',
        },
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
