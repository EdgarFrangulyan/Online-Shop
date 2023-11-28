import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";



export const register = createAsyncThunk('action/registration/register', async (payload) => {
    const { data } = await Api.registration(payload);
    return data;
})