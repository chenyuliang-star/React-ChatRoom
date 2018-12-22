import axios from "axios"
import { getRedirectTo}  from "../util";


const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = "login_success";
const PAYLOAD_DATA = "PAYLOAD_DATA";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    pwd: '',
    type: '',
    img: '',
    _id: '',

    desc: '',

    //bosss使用的
    title: '',
    company: '',
    money: '',
    require: ''
}

export function user (state  = initState, action) {
    switch(action.type) {
        case REGISTER_SUCCESS: {
            return {
                ...state, isAuth: true, redirectTo: getRedirectTo(action.payload.type, action.payload.img) ,
                msg: '', ...action.payload
            }
        }
        case ERROR_MSG: {
            return {
                ...state, isAuth: false, msg: action.msg
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state, isAuth: true, msg: '',...action.data, redirectTo: getRedirectTo(action.data.type, action.data.img) 
            }
        }
        case PAYLOAD_DATA: {
            return {
                ...state, isAuth: true, ...action.data
            }
        }
        case UPDATE_SUCCESS: {
            return {
                ...state, isAuth: true, ...action.data, redirectTo: getRedirectTo(action.data.type, action.data.img)
            }
        }
        case LOGOUT: {
            return {
                ...initState, redirectTo: '/login'
            }
        }
    }
    return state;
}

function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}
function errorMsg (msg) {
    return {
        type: ERROR_MSG,
        msg
    }
}
function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}
function updateSuccess(data) {
    return {
        type: UPDATE_SUCCESS,
        data
    }
}
//注册函数
export function register ({user, pwd, repeatpwd, type }) {
    if (!user || !pwd) {
        return errorMsg("用户名和密码都不能为空");
      }
      if (pwd !== repeatpwd) {
         return  errorMsg("密码和确认密码不相同");
      }
    return dispatch => {
        axios.post("/user/register", {user, pwd, type}).then ( (res) => {
            if ( res.data.code === 0) {
               dispatch( registerSuccess(res.data.data))
            } else {
               dispatch( errorMsg(res.data.msg));
            }
        })
    }
     
}

//登录函数
export function login ({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg("用户名和密码都不能为空");
    }
    return dispatch => {
        axios.post("/user/login", { user, pwd }).then( (res) => {
          if ( res.data.code === 0) {
            dispatch(loginSuccess(res.data.data));
        } else {
            dispatch( errorMsg(res.data.msg));
         }
        })
    }
}

//payloadData函数，用户将信息存入store
export function payloadData(data) {
     return {
         type: PAYLOAD_DATA,
         data
     }
}

//用户进行数据完善
export function updateInfo(data) {
    console.log(data);
    return dispatch => {
        axios.post("/user/update", data).then( (res) => {
            if (res.data.code === 0) {
                dispatch(updateSuccess(res.data.data));
            } else {
                dispatch( errorMsg(res.data.msg));
            }
        })
    }
     
}

//退出登录
export function logoutSubmit () {
    return {
        type: LOGOUT
    }
}