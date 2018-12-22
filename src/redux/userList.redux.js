import axios from "axios";
const HANDLE_USERLIST = "HANDLE_USERLIST";

const initState = {
    userList: []
}

export  function userList (state = initState, action) {
    switch(action.type) {
        case HANDLE_USERLIST: {
            return { ...state, userList: action.data }
        }
    }
    return state;
}
function handleUserList (data) {
    return {
        type: HANDLE_USERLIST,
        data
    }
}
export function getUserList (type) {
    return dispatch => {
        axios.get("/user/list?type=" + type).then ( (res) => {
            if (res.data.code === 0) {
                dispatch(handleUserList(res.data.data));
            }
        })
    }
}