import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USERS,BaseURL } from "../Api/Api";
import axios from "axios";

import { Axios } from "../Api/axisos";
const initialState = {users:[],user:null,loading:false,error:false,}

export const getAllUsers =createAsyncThunk("users/getAllUsers",async(token,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
       
        const res =await axios.get(`${BaseURL}/${USERS}`,{
            headers:{Authorization:`Bearer ${token}`}
        }).then(data=>data.data)
        return res
    } catch (error) {
        return rejectWithValue(error.response.status)
    }
})
export const getUser= createAsyncThunk("user/getUser", async (token,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    
    try {
        const res =await axios.get(`${BaseURL}/user`,{headers:{
            Authorization : `Bearer ${token}`
        }})
        // console.log(res.data);
       return res.data
     } catch (error) {
       return rejectWithValue(error)
     }
})
export const addUser= createAsyncThunk("user/addUser", async (data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    // console.log(data)
    try {
        const res =await Axios.post('/user/add',{
            name:data.name,
            email:data.email,
            role:data.role ,
            password:data.password
        })
        // console.log(res.data);
       
     } catch (error) {
       return rejectWithValue(error)
     }
})
export const editUser= createAsyncThunk("user/editUser", async (data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        const res =await Axios.post(`/user/edit/${data.id}`,{name:data.name,email:data.email,role:data.role})
       
       return res.data
     } catch (error) {
       return rejectWithValue(error)
     }
})
export const deleteUser= createAsyncThunk("user/deleteUser", async (id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        const res =await Axios.delete(`/user/${id}`)
        return id
     } catch (error) {
       return rejectWithValue(error)
     }
})
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUsers.pending,(state,action)=>{
            state.loading = true
            state.error=null
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.error=null
            state.users=action.payload
            
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.loading = false
            state.error=action.payload
        })

        .addCase(getUser.pending,(state,action)=>{
            state.loading = true
            state.error=null
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.loading = false
            state.error=null
            state.user=action.payload
            
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.loading = false
            state.error=action.payload
        })

        .addCase(editUser.pending,(state,action)=>{
            state.loading = true
            state.error=null
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.loading = false
            state.error=null
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.loading = false
            state.error=action.payload
        })

        .addCase(addUser.pending,(state,action)=>{
            state.loading = true
            state.error=null
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading = false
            state.error=null
            
            
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading = false
            state.error=action.payload
        })

        .addCase(deleteUser.pending,(state,action)=>{
            state.loading=true
            state.error=null
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.users=state.users.filter(user=>user.id!==action.payload)
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.error=action.payload 
            state.loading=false
        })
}})
export default userSlice.reducer
