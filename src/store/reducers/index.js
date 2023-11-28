import { combineReducers } from "redux";
import basket from './basket'
import login from './login'
import products from './products'
import registration from './registration'
import category from './category'
import likes from './likes'
import payment from "./payment";
import rating from "./rating";



export default combineReducers({
basket,
login,
products,
registration,
category,
likes,
payment,
rating
})

