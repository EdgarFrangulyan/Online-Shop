import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";


export const likeList = createAsyncThunk('action/likeProducts/likeList', async() => {
    const {data} = await Api.likeList();
    return data;
})

export const likeProduct = createAsyncThunk('action/likeProducts/likeProduct', async(payload) => {
    const {data} = await Api.likes(payload);
    return data;
})

export const removeLike = createAsyncThunk('action/likeProducts/removeLike', async(payload) => {
    const {data} = await Api.removeLike(payload);
    return data;
})