/**
 * App Reducers
 */
import { combineReducers } from "redux";
import  DummyDataReducer  from "./DummyDataReducer";

const reducers = combineReducers({
    dummyData:DummyDataReducer,
});

export default reducers;
