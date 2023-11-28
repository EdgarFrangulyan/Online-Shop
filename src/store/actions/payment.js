import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";


export const payToken = createAsyncThunk('action/paymeny/payToken', async(payload) => {
    const {data} = await Api.paymentToken(payload)
    return data
})


export const payConfirm = createAsyncThunk('action/payment/payConfirm', async(payload) => {
    const {data} = await Api.confirmPayment(payload)
    return data
})