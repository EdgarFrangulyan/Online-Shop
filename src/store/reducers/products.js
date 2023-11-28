import { createReducer } from "@reduxjs/toolkit";
import { getProducts, searchProducts, singleProduct, addProduct } from "../actions/products";

const initialState = {
    productsData: [],   // obshi producti datan home eji mej
    productDataStatus: '', //loadingi hamar status home eji mej
    productSearch: [],   //search kod
    searchStatus: '',
    singleProduct: [],
    pages: [],
    searchPage: []
}



export default createReducer(initialState, {
    [getProducts.pending]: (state, action) => {
        state.productDataStatus = 'Ok'
    },
    [getProducts.fulfilled]: (state, action) => {
        state.productsData = action.payload.products
        state.pages = [action.payload._meta]
    },
    [getProducts.rejected]: (state, action) => {
    },


    [searchProducts.pending]: (state, action) => {
        state.searchStatus = 'ok'
    },
    [searchProducts.fulfilled]: (state, action) => {
        state.productSearch = action.payload.products
       state.searchPage = [action.payload._meta]
    },
    [searchProducts.rejected]: (state, action) => {

    },

    [singleProduct.pending]: (state, action) => {

    },
    [singleProduct.fulfilled]: (state, action) => {
        state.singleProduct = [action.payload.product]
    },
    [singleProduct.rejected]: (state, action) => {

    },

    [addProduct.pending]: (state, action) => {

    },
    [addProduct.pending]: (state, action) => {

    },
    [addProduct.pending]: (state, action) => {

    },

})