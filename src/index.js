import React, { Compoent } from "react";
import ReactDOM from "react-dom";
import combineReducer from "./reducer";
import "./config";
import "./index.css";
import { createStore, compose, applyMiddleware } from "redux" ;
import { Provider } from "react-redux";
import thunk from "redux-thunk"
import { BrowserRouter,Route, Switch } from "react-router-dom";
import reducers from "./reducer";
import Login from "./component/login/login";
import Register from "./component/register/register";
import AuthRouter from "./component/authRouter/authRouter";
import BossInfo from "./component/bossinfo/bossinfo";
import GeniusInfo from "./component/geniusinfo/geniusinfo"
import DashBoard from "./component/dashboard/dashboard"
import Text from "./component/text/text";
import Chat from "./component/chat-room/chat-room";


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f =>f
) )


ReactDOM.render(
(
    <Provider store = { store }>
        <BrowserRouter>
        <div>
         <AuthRouter></AuthRouter>
        <Switch>
            <Route path = "/geniusinfo" component = { GeniusInfo }></Route>
            <Route path = "/bossinfo" component = { BossInfo }></Route>
            <Route path = "/login" component = { Login } ></Route>
            <Route path = "/register" component = { Register } ></Route>
            <Route path = "/chat/:user" component = { Chat } ></Route>
            <Route  component = {  DashBoard } ></Route>
        </Switch>
        </div>
        </BrowserRouter>
    </Provider>
) , document.getElementById('root'))

 