import { createReducer } from "@reduxjs/toolkit";
import { likeProduct, likeList, removeLike } from "../actions/likeProducts";


const initialState = {
    likes: [],
    likeProducts: []
}


export default createReducer(initialState, {
    [likeList.pending]: (state, action) => {

    },
    [likeList.fulfilled]: (state, action) => {
        state.likes = action.payload.likes
    },
    [likeList.rejected]: (state, action) => {

    },

    [likeProduct.pending]: (state, action) => {

    },
    [likeProduct.fulfilled]: (state, action) => {
        state.likeProducts = [...state.likeProducts, action.payload.likes]
    },
    [likeProduct.rejected]: (state, action) => {

    },

    [removeLike.pending]: (state, action) => {

    },
    [removeLike.pending]: (state, action) => {
        console.log(action)
    },
    [removeLike.pending]: (state, action) => {

    },
})