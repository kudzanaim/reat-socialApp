import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import Home from './../home/home'

export default class Signin extends Component {
    // State Object
    state = {
        loginForm: true, 
        registerForm: false,
        registerError: false,
        loginError: false
    }

    
    // User Login
    login = () =>{
        // Validations
        let username_val = /[0-9a-zA-Z]{6,}/;    let pass_val = /[0-9a-zA-Z]{6,}/;
        let username = $("#username").val();    let pass = $("#password").val();
        
        // Test validation
        if( username_val.test( username ) === true &&  pass_val.test( pass ) === true ){
            this.setState({...this.state, loginError: false});
            return this.props.props.singIn({user: username,pass: pass})
        }
        else if(  username_val.test( username ) === false &&  pass_val.test( pass ) === false ){
            this.setState({
                loginForm: true, 
                registerForm: false,
                registerError: false,
                loginError: true
            })
        }
    }

    // Register
    register = () =>{
        this.setState({
            loginForm: false, 
            registerForm: true,
        })
    }

    // Register New User
    registerUser = ()=>{
        // Validations       
        let username_val = /[0-9a-zA-Z]{5,}/;       let pass_val = /[0-9a-zA-Z]{5,}/;       let email_val = /^.+@[^\.].*\.[a-z]{2,}$/;
        let username = $("#username").val();        let pass = $("#password").val();        let email = $("#email").val();
        
        // Test validation
        if( username_val.test( username ) === true &&  pass_val.test( pass ) === true && email_val.test( email )  ){
            return this.props.props.registerUser({username: username, password: pass, email: email})
        }
        else if(  username_val.test( username ) === false &&  pass_val.test( pass ) === false ){
            this.setState({
                loginForm: false, 
                registerForm: true,
                registerError: true,
                loginError: false
            })
        }
    }

    goBack = ()=>{
        this.setState({
            loginForm: true, 
            registerForm: false,
        })
    }

    // Disable Inbox and Logout Button
    componentDidMount(){
        if(this.props.props.accountCreation.state === false){
            $('.inbox, .logout, .navigation').css("display", "none");
            console.log(this.props.props)
        }
        else{
            return this.props.props.singIn(this.props.props.accountCreation.data)
        }
    }

    componentWillUpdate(props){
        if(props.props.accountCreation.state === false ){
            $('.inbox, .logout, .navigation').css("display", "none");
        }
        else{
            return props.props.singIn(props.props.accountCreation.data)
        };
    }


    render(){
        return (
            <div>
                { (this.props.props !== null)?(
                    <div className="landingPage">
                        <div className="LoginContainer">
                            <div className="logoArea">
                                <div className="logo_link_ navitem landinglogo">Social App.</div>
                            </div>
                            <div className="FormArea">
                                <div className="formHolder">
                                    {
                                        ( this.state.loginForm === true)? 
                                        (<div className="loginform">
                                            <div className="loginHeader">Login</div>
                                            <div className="loginDescript">Sign in below to access your feed and inbox.</div>
                                            <div className="form">
                                                <div className="fields">
                                                    <input id="username" type="text" placeholder="Username"/>
                                                    <input id="password" type="password" placeholder="Password"/>
                                                </div>
                                                <div className="lgn_btn_container">
                                                    <button className="submit-btn" onClick={ ()=>{ this.login() }}>Sign In</button>
                                                    <button className="register-btn" onClick={ ()=>{ this.register() }}>Register Account</button>
                                                </div>
                                            </div>
                                            <div className="forgotContainer">
                                                <div className="leftLine line"></div>
                                                <div className="orsigninwith">Or sign in with</div>
                                                <div className="rightLine line"></div>
                                            </div>
                                            <div className="social_login">
                                                <div className="socialItem facebook">
                                                    <img className="sc-icons" src={require("./../../assets/facebook.png")} alt="fb"/>
                                                    <div className="scitem_text fb_text">Facebook</div>
                                                </div>
                                                <div className="socialItem google">
                                                    <img className="sc-icons" src={require("./../../assets/search.png")} alt="google"/>
                                                    <div className="scitem_text gl_text">Google</div>
                                                </div>
                                            </div>
                                            <div className="forgotPassword">Forgot Password?</div>
                                            {
                                                ( this.state.loginError === true)?<div className="errorMessage">Ensure Username & Password are atleast 5 characters!</div>:null
                                            }
                                            {
                                                ( this.props.props.loginState === false )?<div className="errorMessage">Account not found!</div>:null
                                            }
                                        </div>)
                                        :
                                        (<div className="registerform">
                                            <div className="loginHeader">Create Account</div>
                                            <div className="loginDescript">Sign up below to create your account and begin your experience.</div>
                                            <div className="form">
                                                <div className="fields">
                                                    <input id="username" type="text" placeholder="Username"/>
                                                    <input id="password" type="password" placeholder="Password"/>
                                                </div>
                                                <div className="lgn_btn_container">
                                                    <button className="submit-btn" onClick={ ()=>{ this.registerUser() }}>Finish</button>
                                                    <button className="goback" onClick={ ()=>{ this.goBack() }}>Go Back</button>
                                                </div>
                                                {
                                                    ( this.state.registerError === true)?<div className="errorMessage">Username and Password must be atleast 5 characters!</div>:null
                                                }
                                            </div>
                                        </div>)
                                    }
                                        
                                </div>
                                <div className="graphics">
                                    <svg className="svgBacking" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 872 849"><rect x="325" width="547" height="848" style={this.style1}/><path d="M849.18,116,524,964l664,1-43-465-34.8-48-35.77,17-23.2-34h-44.47S850.15,425,849.18,116Z" transform="translate(-524 -116)" style={this.style2}/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="Pagefooter">Property of Kudzanai Murefu ©</div>
                    </div>
                )
                : <Home props={this.props}/>
                } 
            </div>
        )
    }
    style1={
        fill: "#ffe045"
    }
    style2={
        fill: "#cc2231"
    }
}