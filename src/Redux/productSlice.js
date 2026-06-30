import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    products: JSON.parse(localStorage.getItem("event")) || [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || []
}

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            localStorage.setItem("event", JSON.stringify(state.products));
        },

        editProduct: (state, action) => {
            const productIndex = state.products.findIndex((pr) => pr.id === action.payload.id)
            if (productIndex !== -1) { //-1 : if not have that certain index(not matches)
                state.products[productIndex] = action.payload;
                localStorage.setItem("event", JSON.stringify(state.products));
            }
            const cartItemIndex = state.cartItems.findIndex((pr) => pr.id === action.payload.id)
            if (cartItemIndex !== -1) {
                const cartIremQuantity = state.cartItems[cartItemIndex].quantity
                state.cartItems[cartItemIndex] = { ...action.payload, quantity: cartIremQuantity }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }

        },
        deleteProduct: (state, action) => {
            const productIndex = state.products.findIndex((pr) => pr.id === action.payload)
            if (productIndex !== -1) { //-1 : if not have that certain index(not matches)
                state.products.splice(productIndex, 1)
                localStorage.setItem("event", JSON.stringify(state.products));
            }

        },
        addCartItem: (state, action) => { //{id:1,productName:"asbh",}
            const cartItemIndex = state.cartItems.findIndex((pr) => pr.id === action.payload.id)
            if (cartItemIndex === -1) {
                state.cartItems.push({ ...action.payload, quantity: 1 })

            } else {
                state.cartItems[cartItemIndex].quantity++;

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        cartItemQuantityIncrement: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex((pr) => pr.id === action.payload)
            if (cartItemIndex !== -1) { //-1 : if not have that certain index(not matches)
                state.cartItems[cartItemIndex].quantity++;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }

        },
        cartItemQuantityDecrement: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex((pr) => pr.id === action.payload)
            if (cartItemIndex !== -1) { //-1 : if not have that certain index(not matches)
                state.cartItems[cartItemIndex].quantity--;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }

        },
        deleteCartItem: (state, action) => {
            const cartItem = state.cartItems.findIndex((h) => h.id === action.payload)
            if (cartItem !== -1) {
                state.cartItems.splice(cartItem, 1);
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
        },
        setProducts:(state,action)=>{
            state.products=action.payload
        }



    }
})
export const { addProduct, editProduct, deleteProduct, addCartItem, cartItemQuantityIncrement, cartItemQuantityDecrement, deleteCartItem,setProducts } = productSlice.actions;
export default productSlice.reducer