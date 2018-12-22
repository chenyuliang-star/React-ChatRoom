import React, { Component } from "react";
import { connect } from "react-redux"
import { List, Badge } from "antd-mobile"

class Msg extends Component {


    getLastItem (item) {
        return item[item.length-1];
    }
    render() {
        const msgGroup = {}
        this.props.chatMsg ? this.props.chatMsg.forEach( (v) => {
             if (!msgGroup[v.chatid]) msgGroup[v.chatid] = []
             msgGroup[v.chatid].push(v)
        }):null

        const msgGroupValues = Object.values(msgGroup);
        msgGroupValues.sort((pre, order) => {
            const pre_time = this.getLastItem(pre).create_time;
            const order_time = this.getLastItem(order).create_time;
            return order_time - pre_time;
        })
        
        return (
            <div>
                 {
                     msgGroupValues.map( (v) => {
                        const lastItem = this.getLastItem(v);
                        const userID = this.props.user._id === lastItem.from ? lastItem.to : lastItem.from;
                        const user = this.props.users[userID];
                        const unRead = v.filter( (v) => {
                            return  !v.read && v.to === this.props.user._id;
                        }).length
                        if (!lastItem) return null;
                        return (
                            <List key = { v[0]._id }>
                                <List.Item 
                                 thumb ={ require(`../../statics/avatar/${ user.img }.jpg`)}
                                 extra = { <Badge text = { unRead } />}
                                 arrow = { "horizontal" }
                                 onClick = { () => this.props.history.push(`/chat/${ userID }`) }
                                >
                                 <List.Item.Brief>
                                        { user.name }
                                  </List.Item.Brief>
                                  { lastItem.content }
                                    
                                </List.Item>
                            </List>
                        )
                     })
                 }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chatMsg: state.chat.chatmsg,
        users: state.chat.users,
        user: state.user
    }
}
export default connect(mapStateToProps, null)(Msg);