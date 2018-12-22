import React, { Component } from "react";
import Logo from "../logo/logo";
import { Radio, Button, InputItem, WhiteSpace, WingBlank } from "antd-mobile";
import { connect } from "react-redux"
import { register } from "../../redux/user.redux"
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import "./register.css";


class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: "genius"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange (key, value) {
        this.setState({
            [key]: value
        })
    }
    handleRegister () {
        this.props.register(this.state);
    }
    render () {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {
                    this.props.redirectTo? <Redirect to = { this.props.redirectTo} />: null
                }
                <Logo />
                {
                    this.props.msg ? <p className ="worriedWord" > {this.props.msg }</p>: null
                }
                <WingBlank>
                    <InputItem
                       onChange = { (v) => this.handleChange('user', v) }
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem 
                       type = "password"
                       onChange = { (v) => this.handleChange('pwd', v) }
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem 
                       type = "password"
                       onChange = { (v) => this.handleChange('repeatpwd', v) }
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                       onClick = { () => this.handleChange('type', "genius") }
                       checked= { this.state.type == "genius" }
                    >
                        牛人
                    </RadioItem>
                    <RadioItem 
                        onClick = { () => this.handleChange('type', "boss") }
                        checked = { this.state.type == "boss" } >
                        Boss
                    </RadioItem>
                    <Button type = "primary" onClick = { this.handleRegister } >注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

const mapDisaptchToProps = (dispatch) => {
    return  bindActionCreators({register}, dispatch);
}
const mapStateToProps = (state) =>{
    return {
        ...state.user
    }
}
export default connect(mapStateToProps, mapDisaptchToProps) (Register);