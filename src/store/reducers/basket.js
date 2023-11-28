import { createReducer } from "@reduxjs/toolkit"
import { basketList, basketId, basketCreate, basketAdd } from "../actions/basket"


const initialState = {
    basket: [],  //basket Data
    baskId: '',  //karzina stexcel hamar 
    basketAdd: [],  //basketAdd,
    baskCreate: []
}


export default createReducer(initialState, {
    [basketList.pending]: (state, action) => {

    },
    [basketList.fulfilled]: (state, action) => {
        state.basket = action.payload.basket
           console.log(action)
     },
    [basketList.rejected]: (state, action) => {
    },

    [basketAdd.pending]: (state, action) => {

    },
    [basketAdd.fulfilled]: (state, action) => {
        //state.basketAdd = [...state.basket,action.meta.arg]
        console.log(action)
    },
    [basketAdd.rejected]: (state, action) => {

    },


    [basketCreate.pending]: (state, action) => {

    },
    [basketCreate.fulfilled]: (state, action) => {
        state.baskCreate = [...state.baskCreate, action.payload.basket]
    },
    [basketCreate.rejected]: (state, action) => {

    },

    [basketId.pending]: (state, action) => {

    },
    [basketId.fulfilled]: (state, action) => {
   console.log(action)
    },
    [basketId.rejected]: (state, action) => {

    }
})





