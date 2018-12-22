import React, { Component } from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import { getMsgList, sendMsg, recvMsg, checkMsg, readMsg } from "../../redux/chat-redux";
import "./chat-room.css";

const Emoji = '😀 😁 😂 🤣 😄 😋 😎 🙂 😪 😥 😕 🥶 😰 😡 🤢 😈 ❤️ 😍 🎅 🏳️ 👁‍🗨 💕 💘 🏬 🏫 🏦 🌁 🎠 🚄 🚍 ⛽ ✈️ 🚀 🚣 🏎️ 🏍️ 🙈 🙉 💨 💥 🐈 🐕'.split(" ");
const EmojiData = Emoji.map( (v) => ({
    text: v
}))

class Chat extends Component {
    constructor (props) {
        super(props);
        this.state ={
            text: '',
            msg: [],
            isShowEmoji: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount () {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
      
    }

    componentWillUnmount () {
        const from = this.props.match.params.user;
        this.props.readMsg(from);
        //消除已读消息
    }
    //修改bug,没有的时候，一开始crid只显示一行
    fixCridBug () {
        setTimeout( () => {
            window.dispatchEvent( new Event("resize"))
        }, 0)
    }
    addEmojiToText (v) {
        this.setState((preState) => ({
            text: preState.text + v.text
        }))
    }
    handleSubmit () {
        const from  = this.props.user._id;
        const to = this.props.match.params.user;
        const msg  = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({
            text: ''
        })
        
    }
    render () {
         const userId = this.props.match.params.user;
         const users = this.props.chat.users;
         const fromUserId = this.props.user._id;
        
         //通过chatid来区别和谁聊天，用来区别聊天记录
         const targetChatId = checkMsg(fromUserId, userId);
         const targetChatMsg = this.props.chat.chatmsg.filter( (v) => {
             return v.chatid == targetChatId;
         })
        
        if (!users[userId]) return null
        return (
            <div>
               <NavBar mode = "dark"
                   icon={<Icon type="left" />}
                   onLeftClick = { () => {
                       this.props.history.goBack();
                   }}
                > { users[userId].name}</NavBar>
               {
                   //渲染和正确人的聊天记录，其他的人就不要管了
                   targetChatMsg.map( (v) => {
                       const imgURL = require(`../../statics/avatar/${users[v.from].img}.jpg`);
                       return v.to === userId ? (
                           <List key = { v._id} >
                               <List.Item  
                                 extra = { <img src = { imgURL}  /> }
                               >
                                  <p className = "content-right">{ v.content }</p> 
                                </List.Item>
                           </List>
                       ) : (
                           <List  key = { v._id}>
                               <List.Item  
                                  thumb = { imgURL}
                               >  
                                <p className = "content-left">{ v.content }</p>
                               </List.Item>
                           </List>
                       )
                   })
               }
               <List className = "fixed-bottom">
                   <InputItem
                      value = { this.state.text}
                      onChange = { (v) => this.setState({ text: v })}
                      placeholder = "请输入"
                      extra = { 
                        <div>
                           <span 
                               style = {{ marginRight: "8px"}}
                               onClick = { () => {
                                   this.setState( (preState) => ({
                                   isShowEmoji: !preState.isShowEmoji
                                 }))
                                  this.fixCridBug();//修改bug
                                } 
                            }  
                            >😀</span>
                          <span onClick = { this.handleSubmit }>发送</span> 
                        </div>
                      }
                      
                   >
                   </InputItem>
                   {
                       this.state.isShowEmoji ? <Grid 
                       data = { EmojiData }
                       isCarousel = { true }
                       style = { {touchAction: "none"}}
                       carouselMaxRow = { 4 }
                       columnNum = { 9 }
                       onClick = { 
                           (v) => this.addEmojiToText(v)
                       }
                        /> : null

                   }
                    

                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}
const mapDispatchToprops = (dispatch) => {
    return bindActionCreators({ getMsgList, sendMsg, recvMsg, readMsg }, dispatch);
}
export  default connect(mapStateToProps, mapDispatchToprops)(Chat);