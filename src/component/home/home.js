import React, { Component } from "react";
import { connect } from "react-redux";
import { Result, List, WhiteSpace, Modal } from "antd-mobile"
import browserCookie from "browser-cookies";
import { logoutSubmit } from "../../redux/user.redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
//用于对cookie进行操作

class Home extends Component {

    constructor (props) {
        super(props);
        this.handleCookie = this.handleCookie.bind(this);
    }

    handleCookie () {
        const alert = Modal.alert;
        alert('注销', '确定要退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => {
                browserCookie.erase("userId");//删除cookie,
                // window.location.href =  window.location.href //刷新页面
                this.props.logoutSubmit();//清楚redux, 设置redirectTo,回到/login页面
            } },
        ])
    }
    render () {
        const { data } = this.props;
        const myImg = (src) => <img style ={{width: "50px" }} src = { src}  alt= ""/>
        return data.img?(
            <div> 
                <Result 
                   title = { data.user }
                   img = { myImg(require(`../../statics/avatar/${data.img}.jpg`))}
                   message = { data.company?data.company:null}
                />
                <List renderHeader = { "简介"}>
                   <List.Item
                       multipleLine
                   >
                       { data.title }
                       {
                            data.desc.split('/n').map( (v) => <List.Item.Brief key ={v}>{v}</List.Item.Brief>)  
                       }
                       {
                           data.require.split('/n').map( (v) => <List.Item.Brief key ={v}>{v}</List.Item.Brief>)
                       }
                       {
                           data.money?<List.Item.Brief >薪资：{data.money}</List.Item.Brief>:null
                       }
                   </List.Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <List.Item onClick = { this.handleCookie }>
                        退出
                    </List.Item>
                </List>
                
            </div>
        ):<Redirect to = { this.props.data.redirectTo } />;//回到登录页面
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logoutSubmit }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);