import io from "socket.io-client";//客户端socket.io-client
import axios from "axios";

const socket = io("ws://localhost:9093")

const MSG_GET = "MSG_GET";
const MSG_RECV = "MSG_RECV";
const MSG_READ = "MSG_READ";

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
}

export function chat (state = initState, action ) {
    switch(action.type) {
        case MSG_RECV: {
            const n =  state.unread + (action.data.to === action.userid ? 1 : 0);
            return { ...state, chatmsg: [...state.chatmsg, action.data], unread: n }
        }
        case MSG_GET: {
            return { ...state, 
                users: action.users,
                chatmsg: [...state.chatmsg, ...action.data], 
                unread: action.data.filter( (v) => !v.read && v.to === action.userid).length
            }
        }
        case MSG_READ: {
            return {
                ...state,
                chatmsg: state.chatmsg.map ( (v) => {
                    if ( v.from === action.from && v.to === action.to) v.read = true;
                    return v;
                }),
                unread: state.unread - action.num
            }
        }
    }
    return state;
}

function msgList(data, users, userid) {
    return {
        type: MSG_GET,
        data,
        users,
        userid
    }
}

function msgRecv(data, userid) {
    return {
        type: MSG_RECV,
        data,
        userid
    }
}
function msgRead ({ from, to, num}) {
    return {
        type: MSG_READ,
        from,
        to,
        num
    }
}
export function getMsgList () {
    return (dispatch, getState) => {
        axios.get("/user/getmsglist").then( (res) => {
            if (res.data.code === 0) {
                const userid  = getState().user._id;
                dispatch(msgList(res.data.data, res.data.users, userid));
            }
        })
    }
}
export function sendMsg ({ from, to, msg }) {
    return dispatch => {//发送消息
        socket.emit("sendMsg", { from, to, msg })
    }
}

export function recvMsg () {
    return (dispatch, getState) => {//接受广播，并且存储到store
        socket.on("recvMsg", function (data) {
            const userid  = getState().user._id;
            dispatch(msgRecv(data, userid));
        })
    }
}

export function checkMsg (fromUserId, toUserId) {
    return [fromUserId, toUserId].sort().join("-");
}

export function readMsg ( from ) {
    return (dispatch, getState) => {
        axios.post("/user/readMsg", { from }).then ( res => {
            if (res.data.code === 0 ) {
                const userId = getState().user._id;
                dispatch(msgRead({from, to: userId, num: res.data.num}));
            }
        })
    }
}