import { createSlice } from '@reduxjs/toolkit';

interface JwtState {
    token: string | undefined;
}

const jwtSlice = createSlice({
    name: 'jwt',
    initialState: { jwtState: { token: '' } } as JwtState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = undefined
        }
    }
});

export const { addToken, clearToken } = jwtSlice.actions;
export default jwtSlice.reducer;