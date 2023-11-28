import { createReducer } from "@reduxjs/toolkit";
import { register } from "../actions/registration";

const initialState = {
    registerData: []
}


export default createReducer(initialState, {
    [register.pending]: (state, action) => {

    },
    [register.fulfilled]: (state, action) => {
    state.registerData = [...state.registerData,action.payload.user]
    },
    [register.rejected]: (state, action) => {
    
    },   
})




