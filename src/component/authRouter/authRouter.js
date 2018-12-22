import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { payloadData } from "../../redux/user.redux"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//非路由组件必须加上才能使用history.push
@withRouter
class AuthRouter extends Component {

    componentDidMount () {
        axios.get("/user/info").then ( res => {
            const curURL = this.props.location.pathname;
            const listURL = ["/login", "/register"];
            //当前是否在login 和register页面
            if (listURL.indexOf(curURL) > -1) return null;
            const code = res.data.code;
            if (code === 0) {
               //已经登录过，那么就应该把信息存入store
            //    console.log(res.data.data[0])
               this.props.payloadData(res.data.data[0])
               
            } else {
                //不在跳转到login页面
                this.props.history.push("/login");
            }
        })
    }
    render () {
        return null;
    }
}

const mapStateToProps = (state) =>{
    return {
        ...state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ payloadData }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthRouter);