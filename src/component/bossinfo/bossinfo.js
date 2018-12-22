import React, { Component } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelect from "../avatarSelect/avatarSelect";
import Input from "antd-mobile/lib/input-item/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateInfo } from"../../redux/user.redux";
import { Redirect } from "react-router-dom"

class BossInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            img: '',
            title: '',
            company: '',
            money: '',
            require: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
    }
    handleChange (key, value) {
        this.setState({
            [key]: value
        })
    }
    selectAvatar (imgName) {
        this.setState({
            img: imgName
        })
    }
    render () {
        return (
            <div>
                {
                    this.props.redirectTo  && this.props.redirectTo != "/bossinfo" ? <Redirect to = { this.props.redirectTo} />: null
                }
                <NavBar mode="dark">boss完善页面</NavBar>
                <AvatarSelect 
                   selectAvatar = { this.selectAvatar }
                ></AvatarSelect>
                <InputItem 
                   onChange = { (v) => this.handleChange('title', v)}
                >招聘职位: </InputItem>
                <InputItem
                   onChange = { (v) => this.handleChange('company', v)}
                >公司名称: </InputItem>
                <InputItem 
                    onChange = { (v) => this.handleChange('money', v)}
                >薪资待遇: </InputItem>
                <TextareaItem
                   onChange = { (v) => this.handleChange("require", v)}
                   title = "职位要求: "
                   autoHeight
                   rows = { 3 }
                ></TextareaItem>
                <Button 
                   onClick = { () => this.props.updateInfo(this.state)}
                   type = "primary"
                 >保存</Button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateInfo }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);