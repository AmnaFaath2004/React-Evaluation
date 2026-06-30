import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./useSlice";
import productReducer from './productSlice'

const store = configureStore({
    reducer: {
        userState: userSlice,
        productState: productReducer

    }
});
export default store //to import it in main.jsx



