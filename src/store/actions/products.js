import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "../../Api"




export const getProducts = createAsyncThunk('action/products/getProducts', async (payload) => {
    const { data } = await Api.getData(payload)
    return data
})


export const searchProducts = createAsyncThunk('action/products/searchProducts', async (payload) => {
    const { data } = await Api.searchProducts(payload)
    return data
})


export const singleProduct = createAsyncThunk('action/products/singleProduct', async(id) => {
    const {data} = await Api.singleProduct(id)
    return data
})


export const addProduct = createAsyncThunk('action/products/addProduct', async(payload) => {
    const {data} = await Api.addProduct(payload)
    return data
})


export const updateProduct = createAsyncThunk('action/products/updateProduct', async(payload) => {
    const {data} = await Api.updateProduct(payload)
    return data
})


export const delProduct = createAsyncThunk('action/products/delProduct', async(id) => {
    const {data} = await Api.deleteProduct(id)
    return data
})


