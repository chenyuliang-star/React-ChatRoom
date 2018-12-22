import React, { Component } from "react";
import Logo from "../logo/logo";
import { List, Button, InputItem, WhiteSpace, WingBlank } from "antd-mobile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import "./login.css"

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    register () {
        this.props.history.push("/register");
    }
    handleChange (key, value) {
        this.setState({
            [key]: value
        })
    }
    handleLogin () {
        this.props.login(this.state);
    }
    render () {
        return (
            <div>
                {
                    this.props.redirectTo && this.props.redirectTo != '/login' ? <Redirect to = { this.props.redirectTo} />: null
                }
                <Logo />
                {
                    this.props.msg ? <p className =  "worriedWord" > {this.props.msg }</p>: null
                }
                <WingBlank>
                    <InputItem
                        onChange = { (v) => this.handleChange('user', v)}
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type = "password"
                        onChange = { (v) => this.handleChange('pwd', v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <Button type = "primary" 
                        onClick = { this.handleLogin }
                    
                    >登录</Button>
                    <WhiteSpace />
                    <Button onClick = { this.register } type = "primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}
const mapDisaptchToProps = (dispatch) => {
    return bindActionCreators({ login},  dispatch);
}
export default connect(mapStateToProps, mapDisaptchToProps)(Login);