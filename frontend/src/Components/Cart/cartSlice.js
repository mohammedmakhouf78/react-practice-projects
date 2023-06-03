import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartCount: 0,
        cartTotal: 0,
        products: [
            {
                name: "samsung galaxy S8",
                price: 399.99,
                count: 1,
                img: "/cart/samsung.avif"
            },
            {
                name: "Google Pixel",
                price: 499.99,
                count: 1,
                img: "/cart/google_pixel.jpg"
            },
            {
                name: "Xiaomi Redmi Note 2",
                price: 699.99,
                count: 1,
                img: "/cart/xiamoi.jpeg"
            },
            {
                name: "Samsung Galaxy S7",
                price: 599.99,
                count: 1,
                img: "/cart/Samsung-Galaxy-S7.webp"
            },
        ],
    },
    reducers: {
        IncreaseItemCount: (state, { payload }) => {
            state.products[payload].count++
        }
    }
})

export const { IncreaseItemCount } = cartSlice.actions

export default cartSlice.reducer