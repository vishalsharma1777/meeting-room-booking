import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    token: null,
    userId: null,
    loading: true,
    error: '',
    authRedirectPath: '/',
    username: null,
    loginSuccess: false,
    status: null,
    signUpSuccess: false,
    signUpError: null,
    signUpStatus: null,

}

const authorizationSlice = createSlice({
    name: "authorization",
    initialState: intialState,
    reducers: {
        authStart: (state, action) => {
            state.error = null;
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.loginSuccess = true;
            state.token = action.payload.token;
            state.userId = action.payload.id;
            state.loading = false;
            state.username = action.payload.username;
        },
        authFail: (state, action) => {
            state.error = action.payload.data.error;
            state.status = action.payload.status;
            state.loading = false;
        },
        setAuthRedirectPath: (state, action) => {
            state.authRedirectPath = action.payload;
        },
        clearError: (state, action) => {
            state.error = null;
        },
        authLogout: (state, action) => {
            state.token = null;
            state.userId = null;
            state.loading = true;
            state.error = '';
            state.authRedirectPath = '/';
            state.username = null;
            state.loginSuccess = false;
        },
        signUpSuccess: (state, action) => {
            state.signUpSuccess = true;
            state.signUpStatus = action.payload.status;
            state.signUpError = null;
        },
        signUpError: (state, action) => {
            state.signUpError = action.payload.data.error;
            state.signUpStatus = action.payload.status;
            state.signUpSuccess = false;
        }
        
    }
})

export const authorizationActions = authorizationSlice.actions;

export default authorizationSlice.reducer;