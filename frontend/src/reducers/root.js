import { combineReducers } from "redux";
import postsReducer from "./posts";
import usersReducer from "./users";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export default rootReducer;
