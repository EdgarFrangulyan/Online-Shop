import { createReducer } from "@reduxjs/toolkit";
import { login } from "../actions/login";



const initialState = {
 users: [],
 token: ''   
}


export default createReducer(initialState, {
    [login.pending]: (state, action) => {

    },
    [login.fulfilled]: (state, action) => {
   state.token = action.payload.token
   state.users = action.payload.user
   localStorage.setItem("userToken", (state.token))
   localStorage.setItem("userData", JSON.stringify(state.users))
    },
    [login.rejected]: (state, action) => {
    
    }
    
})
  