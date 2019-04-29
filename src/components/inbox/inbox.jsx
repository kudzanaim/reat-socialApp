import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';

window._ = _;

export default class Inbox extends Component {
  // Local State
  state = {    user: null, openChat: null, chatID: null   };

  // CSS Style
  CSS = {
    colors: {    color:"grey",fontFamily:"arial",fontSize:"40px" , marginBottom:"15px"   },
    logincont: {    display:"grid",  placeItems:"center",   position: "relative",  top:"20vh"  },
    loginbutton: { height:"50px", width: "200px", fontSize:"18px", border: "none", backgroundColor:"#2295f6", color: "white",  borderRadius: "5px"}
  }

  // Get Props on Mount
  componentWillMount(){
    return this.props.props.getPosts()
  }

  componentWillReceiveProps(props){
    let _openChat_ = ( this.state.user!= null )? props.props.user.inbox[ this.state.chatID ] : null;
    
    // Clean Objetc
    if( this.state.user != null ){
      delete this.state.user.inbox["all"];
      delete this.state.user.inbox[ this.state.chatID ].messages["all"];
      console.log( this.state.user.inbox[ this.state.chatID ] )
    }
    
    return this.setState({  user: props.props.user, openChat: _openChat_ })
  }

  //  Open Chat 
  openMessage = ( convo )=>{
      // Get all Chats
      let chats = this.state.user.inbox;
      let chatID;

      // Map thru Chats
      Object.values(chats).map(( chat, index)=>{
        // Get matching chat
        if( chat.recipient && chat.recipient.name === convo.recipient.name){
          // Attatch chatid to state
          chatID = Object.keys(chats)[index];
          // Set State
          this.setState( {...this.state, openChat: convo, chatID: chatID,   }, ()=>{

          })

        }
      })
  }

  componentDidUpdate(){
    this.scrollDown()
  }

  // Scroll on New Message
  scrollDown = ()=>{
    if( this.state.user != null){
      let timer = setInterval( () => {
        if( document.getElementsByClassName("messageItemCont").length > 0 ){
            clearInterval( timer ); 
            let current = document.getElementsByClassName("chatArea")[0].scrollTop;
            let length = document.getElementsByClassName("messageItemCont").length;
            let last_item = document.getElementsByClassName("messageItemCont")[ length - 1].offsetHeight;

            document.getElementsByClassName("chatArea")[0].scrollTop = current + last_item;
        }
      }, 10 )
    }
  }


  // Send Message
  sendMessage = (e)=>{
        // Get message from input
        let message = $(".inboxTextArea").val();
        // Create Post Object
        let post = {
          senderID: this.state.user.key,
          recipient: this.state.openChat.recipient.name,
          recipient_ID: this.state.openChat.recipient.id,
          chatID: this.state.chatID,
          message: message
        }
        // Send Action
        let sendMessage =  this.props.props.sendMessage;

        // Post Action
      return sendMessage( post )
  }

  // Render View
  render() {
    let uniquekey = 0;
    return (
      <div>
          
          {  ( this.state.user == null)? ( 
              <div style={this.CSS.logincont}>
                <h4 style={this.CSS.colors}>Please sign-in to access your library.</h4>
                <button style={this.CSS.loginbutton}>Login Here</button>
              </div>
          ):
            (<div className="inboxContainer pageenter_" >
                <div className="pageheader">Your Messages</div>
                <div className="mainConvContainer">
                    <div className="conversations">
                    <div className="convoshdr">All Convo's</div>
                    {
                      ( this.state.user == null )? ( <div className="emptyInbox">Message box empty!</div> ) :
                       Object.values( this.state.user.inbox ).map( ( convo, index )=>(
                         ( convo.recipient )? (
                            <div className="chatItem"  key={uniquekey++} onClick={ ()=>{ this.openMessage( convo )} }>
                              <div className="metamain">
                                  <div className="chatRecipient" key={uniquekey++}>{ convo.recipient.name }</div>
                                  <div className="chatLastTimeStamp" key={uniquekey++}>{ new Date(Object.values( convo.messages )[ Object.values( convo.messages ).length - 2 ].timeStamp).toDateString()}</div>
                              </div>
                              <div className="chatLastMessage" key={uniquekey++}>{ Object.values( convo.messages )[ Object.values( convo.messages ).length - 2].message}</div>
                            </div>

                         ) : null
                       ))
                    }
                    </div>
                    <div className="openConversation">
                          <div className="ls">
                              <div className="chatArea">
                                {   ( this.state.openChat === null )? ( <div className="noConvosOpen">No conversations Open</div> ): 
                                  Object.values(this.state.openChat.messages).map( (message, index)=>(
                                    ( message.message)?(
                                          ( message.sender === "Me")? (
                                            <div className="messageItemCont meContainer" key={uniquekey++}>
                                              <div className="messageItem meAlign" key={uniquekey++} ><div className="message_sender" key={uniquekey++} >{message.sender}</div><div className="message_text" key={uniquekey++} >{message.message}</div></div> 
                                            </div>
                                          ): (
                                            <div className="messageItemCont" key={uniquekey++}>
                                              <div className="messageItem" key={uniquekey++} ><div className="message_sender" key={uniquekey++} >{message.sender}</div><div className="message_text" key={uniquekey++} >{message.message}</div></div> 
                                            </div>
                                          )
                                    ) : null
                                  ))
                                }
                              </div>
                          </div>
                          <div className="typeArea">
                              <textarea className="inboxTextArea" placeholder="Type message here.."></textarea>
                              <button className="inboxSendMessage" onClick={(e)=>{ this.sendMessage(e) }}>Send</button>
                          </div>
                    </div>
                </div>
            </div>)
        }
      </div>
    )
  }
}
