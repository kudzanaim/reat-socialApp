/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Signin from './../signin/signin';
import $ from 'jquery';
import _ from 'lodash';

export default class Home extends Component {
  // Initial State
  state = {
    username: null
  }

  // Get Posts
  componentWillMount(){
    // Get feed Posts
    this.props.props.getPosts()
  }

  // After Mounting
  componentDidMount(e){

  }

  // Update Props
  componentWillReceiveProps(props){
      return this.setState( props.props, ()=>{
        if(this.state.user != null){
          // Enable Inbox and logout button
          document.getElementsByClassName("navigation")[0].style.display="";
          document.getElementsByClassName("inbox")[0].style.display="";
          document.getElementsByClassName("logout")[0].style.display="";
        }
      })
  }

  // Input onChange
  textarea = (e)=>{
    var text = e.target.value;
    this.setState({postData:text});
  };

  // post Data to Db
  post = ()=>{
    // Create post Object
    const post = {
      user: this.state.user.username,
      post: this.state.postData,
      time: new Date().getTime()
    };
    // PUSH TO DB Action
    return this.props.props.pushPost(post)
  }

  // Delete post
  delete = (e, post_id)=>{
    // Attach delete Animation class
    let element = $(e.target).parent();
    $(element).addClass("deleted");

    // Wait for Animation then delete
    setTimeout(() => {
      $(element).toggle();
      return this.props.props.deletePost(post_id)
    }, 790);
  }
  
  // Render
  render() {
    let uniquekeys = -1;
    return ( this.state.user != null)? (
      <div >
        <div className="homeContainer pageenter_">
          <div className="head">Your Feed</div>
          <div className="descHead">Aggregating the latest posts from all users.</div>
          <div className="createpost">
            <div className="user_share_pic"></div>
            <textarea onKeyDown={this.textarea} className="postfield_" placeholder="Whats on your mind?" ></textarea>
            <div className="post_btn_cont"><button className="post-btn" onClick={this.post}>Share</button></div>
          </div>
          <div className="allposts">
            {
              (this.state.posts != null)? _.reverse( Object.values(  this.state.posts  )).map((post, index)=>{

                return (post === "appended here")? null:(
                    <div key={post.id} className="post_item">
                      <div className="userMeta">
                        <div className="profilepic"></div>
                        <div>
                            <div className="postauthor" key={uniquekeys++}>{  ( post.user === this.state.user.username)? "Me" : post.user }</div>
                            <div className="postDate" key={uniquekeys++}>{ new Date(post.time).toDateString() }</div>
                            <div className="postmessage" key={uniquekeys++}>{post.post}</div>
                        </div>
                      </div>
                      {( post.user === this.state.user.username )? <button className="deletePost" onClick={ (e) => this.delete(e,post.id)} >Delete</button> : null}
                    </div>
                )
              }):<div>Posts Loading...</div>
            }
          </div>
        </div>
      </div>
    ) : <Signin props={this.props.props} />
  }
}