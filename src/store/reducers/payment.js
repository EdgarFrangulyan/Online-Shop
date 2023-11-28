import { createReducer } from "@reduxjs/toolkit";
import { payConfirm } from "../actions/payment";


const initialState = {
payData: []    
}



export default createReducer(initialState, {
[payConfirm.pending]: (state, action) => {

},
[payConfirm.pending]: (state, action) => {
console.log(action)
},
[payConfirm.pending]: (state, action) => {

},
})







