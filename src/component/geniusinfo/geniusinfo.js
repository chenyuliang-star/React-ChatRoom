import React, { Component } from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelect from "../avatarSelect/avatarSelect";
import Input from "antd-mobile/lib/input-item/Input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateInfo } from"../../redux/user.redux";
import { Redirect } from "react-router-dom"

class GeniusInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            desc: ''
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
                    this.props.redirectTo && this.props.redirectTo != '/geniusinfo' ? <Redirect to = { this.props.redirectTo} />: null
                }
                <NavBar mode="dark">牛人完善页面</NavBar>
                <AvatarSelect 
                   selectAvatar = { this.selectAvatar }
                ></AvatarSelect>
                <InputItem 
                   onChange = { (v) => this.handleChange('title', v)}
                >求职岗位: </InputItem>
                <TextareaItem
                   onChange = { (v) => this.handleChange("desc", v)}
                   title = "个人简介: "
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
export default connect(mapStateToProps, mapDispatchToProps)(GeniusInfo );