import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { BaseURL } from "../Api/Api";
import { Axios } from "../Api/axisos";
import { token } from "../Api/Token";
const initialState = { products: [], error: null, loading: false };

export const getProducts = createAsyncThunk("products/getProducts", async (token, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI
    try {
        const res =await axios.get(`${BaseURL}/products`,{
            headers:{Authorization:`Bearer ${token}`}
        }).then(data=>data.data)
        
        return res
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const addproduct = createAsyncThunk("/products/addProduct",async (data,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    try {
        const res = await Axios.post("product/add",data)

    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteProduct= createAsyncThunk("products/deleteProduct",async(id,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
    console.log(id)
    try {
        const res = await Axios.delete(`product/${id}`)
        return id
    } catch (error) {
        return rejectWithValue(error)
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
        //get all products
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products=action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error=action.payload
            })
            //delete products
            .addCase(deleteProduct.pending,(state,action)=>{
                state.loading= true
                
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.loading=false
                state.error=null
                state.products=state.products.filter(el=>el.id!==action.payload)
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.error=action.payload
            })
            //add product
            // .addCase(addproduct.pending,(state,action)=>{
            //     state.loading= true
                
            // })
            // .addCase(addproduct.fulfilled,(state,action)=>{
            //     state.loading=false
            //     state.error=null
            // })
            // .addCase(addproduct.rejected,(state,action)=>{
            //     state.error=action.payload
            // })
    }
})
export default productsSlice.reducer