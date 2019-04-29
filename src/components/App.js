import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './home/home';
import Inbox from './inbox/inbox';
import LogOut from './logout/account';
import Nav from './nav/nav';
import {connect} from 'react-redux';
import pushPost, {getPosts, deletePost, singIn, registerUser, sendMessage, signOut} from './actions/actions'




class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Nav props={this.props} isAuthed={true} />
          <Route exact path="/" render={  (props)=><Home props={this.props} isAuthed={true} />  }/>             
          <Route exact path="/Inbox" render={   (props)=><Inbox props={this.props} isAuthed={true} />  }/>
          <Route exact path="/Account" component={  (props)=><LogOut props={this.props} isAuthed={true} />  }/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.allPosts,
  firebase: state.firebase,
  user: state.user,
  accountCreation: state.accountCreation,
  loginState: state.loginState
})

const mapActionsToState = dispatch =>({
  getPosts: ()=>dispatch(   getPosts()    ),
  pushPost: (post)=>dispatch(   pushPost(post)    ),
  deletePost: (post)=>dispatch(   deletePost(post)    ),
  singIn: (user)=>dispatch(   singIn(user)    ),
  signOut: ()=>dispatch(   signOut()    ),
  registerUser: (data)=>dispatch(   registerUser(data)    ),
  sendMessage: (post)=>dispatch(   sendMessage(post)    )
})
export default connect(mapStateToProps, mapActionsToState)(App);
