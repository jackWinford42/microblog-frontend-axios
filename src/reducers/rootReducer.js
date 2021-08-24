import posts from './postReducer';
import titles from './cardReducer';
import { combineReducers } from "redux";

export default combineReducers({
  posts,
  titles,
});