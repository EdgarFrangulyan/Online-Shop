import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";


export const basketId = createAsyncThunk('action/basket/basketId', async(payload) => {
    const {data} = await Api.basketId(payload);
    return data;
})


export const basketCreate = createAsyncThunk('action/basket/basketCreate', async (payload) => {
    const { data } = await Api.basketCreate(payload);
    return data;
})


export const basketList = createAsyncThunk('action/basket/basketList', async () => {
    const { data } = await Api.basketList();
    return data;
})


export const basketAdd = createAsyncThunk('action/basket/basketAdd', async (payload) => {
    const { data } = await Api.basketAdd(payload);
    return data;
})

export const basketRemove = createAsyncThunk('action/basket/basketRemove', async(id) => {
    const {data} = await Api.basketRemove(id);
    return data;
})