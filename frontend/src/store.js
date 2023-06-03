import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./Components/Cart/cartSlice"

export const store = configureStore({
    reducer: { cartSlice }
})