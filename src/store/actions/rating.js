import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";


export const createRating = createAsyncThunk('/action/rating/createRating', async(payload) => {
    const {data} = await Api.rating(payload)
    return data
})


export const ratingList = createAsyncThunk('/action/rating/ratingList', async(id) => {
    const {data} = await Api.ratingList(id)
    return data
})