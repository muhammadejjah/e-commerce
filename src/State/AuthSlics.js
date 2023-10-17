import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseURL, LOGIN, LOGOUT } from "../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
const cookie = Cookie()
const initialState = { loading: false, error: null, user: null, token: null };


export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        // console.log(data)
        const res = await axios.post(`${BaseURL}/${LOGIN}`, data);
        // console.log(res.data)
        return res.data

    } catch (error) {
        return rejectWithValue(error.response.status);
    }
})
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        // console.log(data)
        const res = await axios.get(`${BaseURL}/${LOGOUT}`, {
            headers: { authorization: 'Bearer ' + cookie.get("e-commerce") }
        }).then(data => data.data);

        return res

    } catch (error) {
        return rejectWithValue(error.response.status);
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = null
                state.loading = false;
                cookie.set("e-commerce", action.payload.token)
                state.token = action.payload.token
                state.user = action.payload.user

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
                state.token = null
                state.user = null
            })
            .addCase(logOut.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.error = null
                state.loading = false;
                state.token = null
                state.user = null
            })
            .addCase(logOut.rejected, (state, action) => {
                state.error = null
                state.loading = false;
                state.token = null
                state.user = null
            })
    }
})
export default authSlice.reducer
