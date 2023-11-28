import { createReducer } from "@reduxjs/toolkit";
import {  categoryList, categoryChild, addCategory, prodCategory, delCategory  } from "../actions/productCategory";


const initialState = {
catList: [],
childs: [],
products: [],
page: []   
}


export default createReducer(initialState, {

[categoryList.pending]: (state, action) => {

},
[categoryList.fulfilled]: (state, action) => {
state.catList = action.payload.categories
},
[categoryList.rejected]: (state, action) => {

},

[categoryChild.pending]: (state, action) => {

},
[categoryChild.fulfilled]: (state, action) => {
state.childs = action.payload.categories.map((items) => (
    items.child
))
},


[categoryChild.rejected]: (state, action) => {

},

[addCategory.pending]: (state, action) => {

},
[addCategory.fulfilled]: (state, action) => {
console.log(action)
},
[addCategory.rejected]: (state, action) => {

},


[prodCategory.pending]: (state, action) => {

},
[prodCategory.fulfilled]: (state, action) => {
state.products = action.payload.products
state.page = [action.payload._meta]
},
[prodCategory.rejected]: (state, action) => {

},

[delCategory.pending]: (state, action) => {

},
[delCategory.pending]: (state, action) => {
console.log(action)
},
[delCategory.pending]: (state, action) => {

},
})