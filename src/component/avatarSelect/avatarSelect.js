import React, { Component } from "react";
import { Grid } from "antd-mobile";


class AvatarSelect extends Component {
    constructor (props) {
        super(props);
        this.state = {
            seletedImg: ''
        }
    }
    render () {
        let avator = [];
        for (let i = 1; i < 15; i++) avator.push('user'+i);
        avator = avator.map( (v) => {
            return {
                icon: require(`../../statics/avatar/${ v }.jpg`),
                text: v
            }
        })
    const showSelectedImg =  this.state.seletedImg?
    (<div >
        <span>已选择头像：</span>
        <img style = {{width: "25px", height: "25px" }} src = { this.state.seletedImg.icon } />
    </div>): <span>请选择图像：</span>
        return (
            <div > 
                {  showSelectedImg }
                <Grid data = { avator } columnNum = { 5 }
                    onClick = { (el) => {
                        this.setState({
                            seletedImg: el
                        })
                        this.props.selectAvatar(el.text);
                    }}
                 />

            </div>
        );
    }
}
export default AvatarSelect;