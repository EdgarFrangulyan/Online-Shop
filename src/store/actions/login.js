import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";



export const login = createAsyncThunk('action/login/login', async (payload) => {
  const { data } = await Api.login(payload);
  return data;
})