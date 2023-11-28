import { createReducer } from "@reduxjs/toolkit";
import { createRating, ratingList } from "../actions/rating";

const initialState = {
 rate: [],
 singleRating: [],    
}


export default createReducer(initialState, {
  [createRating.rejected]: (state, action) => {

  },
  [createRating.fulfilled]: (state, action) => {
state.rate = [...state.rate, action.payload.rating]
  },
  [createRating.rejected]: (state, action) => {

  },
  [ratingList.rejected]: (state, action) => {

  },
  [ratingList.fulfilled]: (state, action) => {
  state.singleRating = [action.payload.count]
  },
  [ratingList.rejected]: (state, action) => {

  }
})



