import { combineReducers } from "redux";
import { user  } from "./redux/user.redux";
import { userList } from "./redux/userList.redux";
import { chat } from "./redux/chat-redux";
 
export default combineReducers({
    user,
    userList,
    chat
})