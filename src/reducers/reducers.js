import { combineReducers } from "redux";
import { login } from "./authReducer";
import admin from "./adminReducer";
const rootReducer = combineReducers({
    login,
    admin
});

export default rootReducer;