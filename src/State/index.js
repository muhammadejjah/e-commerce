import { configureStore } from "@reduxjs/toolkit";
import AuthSlics from "./AuthSlics";
import userSlice from "./UserSlice";
import MenuSlice from "./MenuSlice";
import WindowSlice from"./WindowSlice";
import CategoriesSlice from "./CategoriesSlice";
import ModalSlice from "./ModalSlice";
import ProductsSlice from "./ProductsSlice";
const store = configureStore({
    reducer:{
        AuthSlics,userSlice,MenuSlice,WindowSlice,CategoriesSlice,ModalSlice,ProductsSlice
    }
    
})
export default store