import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import TabBarList  from "../../component/tarBar/tarbar"
import "./dashboard.css";
import { Route, Switch } from "react-router-dom";
import  Boss  from "../../component/boss/boss";
import  Genius  from "../../component/genius/genius";
import Home from "../../component/home/home";
import Chat from "../../component/chat-room/chat-room";
import Msg from "../../component/msg/msg";
import { getMsgList, sendMsg, recvMsg } from "../../redux/chat-redux";
import { bindActionCreators } from "redux";

class DashBoard extends Component {
    
    componentDidMount () {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
         
    }
    render () {
        const user = this.props.user;
        const pathname = this.props.location.pathname; 

        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'people',
                title: '牛人列表',
                component: Genius,
                hidden: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'people',
                title: 'BOSS列表',
                component: Boss,
                hidden: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/home',
                text: '个人中心',
                icon: 'home',
                title: '个人中心',
                component: Home
            }
        ]
        return (
            <div> 
                <div  className = "narbar">
                    <NavBar  mode="dark">
                       { navList.find( v => v.path === pathname).title}
                    </NavBar>
                </div>
                                      
                <div className = "content-wrap"> 
                   <Switch>
                   {
                        navList.map( v => {
                             return (
                                 <Route key = { v.path } path = { v.path} component = { v.component } ></Route>
                             );
                         })
                    }
                    </Switch>
                      
                </div>
                <div  className = "tabbar">
                    <TabBarList 
                      navList = { navList }
                    ></TabBarList>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        chat: state.chat
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( {getMsgList, recvMsg }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);