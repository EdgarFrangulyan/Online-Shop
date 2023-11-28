import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../Api";



export const categoryList = createAsyncThunk('actions/productCategory/categoryList', async() => {
   const {data} = await Api.categoryList()
   return data 
})


export const categoryChild = createAsyncThunk('actions/productCategory/categoryChild', async(payload) => {
  const {data} = await Api.categoryChild(payload)
  return data  
})


export const addCategory = createAsyncThunk('action/productCategory/addCategory', async(payload) => {
  const {data} = await Api.addCategory(payload)
  return data
})


export const prodCategory = createAsyncThunk('action/productCategory/prodCategory', async(payload) => {
  const {data} = await Api.productCat(payload)
  return data
})

export const delCategory = createAsyncThunk('action/productCategory/delCategory', async(payload) => {
  const {data} = await Api.deleteCategory(payload)
  return data
})

