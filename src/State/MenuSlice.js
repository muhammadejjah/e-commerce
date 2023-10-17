import { createSlice } from "@reduxjs/toolkit";
const initialState = {isOpen:true,refresh:false};
const menuSlice = createSlice({
    name:"menu",
    initialState,
    reducers:{
        openMenu:(state,action)=>{state.isOpen=!state.isOpen},
        refresh:(state,action)=>{state.refresh=!state.refresh},
    }
})
export default menuSlice.reducer
export const {openMenu , refresh}=menuSlice.actions