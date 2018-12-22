import React, { Component } from "react";
import { TabBar } from 'antd-mobile'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


@withRouter
class TabBarList extends Component {

    render () {
        const navList  = this.props.navList.filter( (v) => !v.hidden);
        return (
           <TabBar style = {{ position: 'fixed', height: '100%', width: '100%', top: 0 } } >
               {
                   navList.map( v => {
                       return (
                           <TabBar.Item
                               badge = { v.path === "/msg" ? this.props.chat.unread : 0}
                               title = { v.text }
                               key = { v.path }
                               icon = { { uri: require(`../../statics/tabbar/${v.icon}.jpg`) }}
                               onPress = { () => this.props.history.push(v.path)}
                           >
                           </TabBar.Item>
                       )
                   })
               }
            </TabBar>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chat: state.chat
    }
}
export default connect(mapStateToProps, null)(TabBarList);