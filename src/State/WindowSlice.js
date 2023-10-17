import { createSlice } from "@reduxjs/toolkit";
const initialState={windowSize:window.innerWidth}
const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers:{
        smallScreens :(state,action)=>{
            state.windowSize=action.payload
        }
    }

})
export default windowSlice.reducer
export const {smallScreens}=windowSlice.actions