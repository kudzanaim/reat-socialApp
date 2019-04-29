import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class  extends Component {
  
  logOut = ()=>{
    console.log(this.props.props)
    return this.props.props.signOut()
  }

  render() {
    return (
      <div>
          <div className="navigation">
              <div className="logo_link navitem">
                    <Link to="/" >Social App.</Link>
                </div>
                <div className="navitem inbox">
                    <Link to="/Inbox">Inbox</Link>
                </div>
                <div className="logout" onClick={ ()=>{ this.logOut() }}>Log Out</div>
          </div>
          <div className="progress">
            <div className="barContainer">
              <div id="loadbar" className="loadbar"></div>
            </div>
          </div>
      </div>
    )
  }
}