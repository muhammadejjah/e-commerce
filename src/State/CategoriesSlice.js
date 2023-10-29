import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../Api/axisos";
import { BaseURL } from "../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
const cookie = Cookie()
export const token = cookie.get("e-commerce")
const initialState={categories:[],loading:false,error:null}

export const getCategories= createAsyncThunk("categories/getCategories",async(token,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        const res =await axios.get(`${BaseURL}/categories`,{
            headers:{Authorization:`Bearer ${token}`}
        }).then(data=>data.data)
        return res
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const addCategory= createAsyncThunk("categories/addCategory",async(data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        const res = await Axios.post(`category/add`,data)
        console.log(res)
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getCategory= createAsyncThunk("categories/getCategory",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        // const res = await Axios.get(`category/${id}`)
        const res =await axios.get(`${BaseURL}/category/${id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const editCategory= createAsyncThunk("categories/editCategory",async(data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    console.log(data)
    try {
        const res = await Axios.post(`category/edit/`,data.FormData)
        console.log(res)
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteCategory= createAsyncThunk("categories/deleteCategory",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    console.log(id)
    try {
        const res = await Axios.delete(`category/${id}`)
        return id
    } catch (error) {
        return rejectWithValue(error)
    }
})

const categoriesSlice= createSlice({
    name: 'categories',
    initialState,
    extraReducers:(builder)=>{
        builder
        //get all categories
        .addCase(getCategories.pending,(state,action)=>{
            state.loading= true
            
        })
        .addCase(getCategories.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.categories=action.payload
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //add category
        .addCase(addCategory.pending,(state,action)=>{
            state.loading= true
            
        })
        .addCase(addCategory.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
        })
        .addCase(addCategory.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //delete category
        .addCase(deleteCategory.pending,(state,action)=>{
            state.loading= true
            
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.loading=false
            state.error=null
            state.categories=state.categories.filter(el=>el.id!==action.payload)
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            
            state.error=action.payload
        })
    }

})
export default categoriesSlice.reducer