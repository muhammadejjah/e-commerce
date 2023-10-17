import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
    name: "modal",
    initialState:{ImgController:false},
    reducers:{
        openImg:(state,action)=>{
            state.ImgController=!state.ImgController;
        }
    }
})
export default modalSlice.reducer
export const {openImg}=modalSlice.actions