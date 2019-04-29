import {fire_} from './../store/store';
import $ from 'jquery';

// Action Types
export const GET_POSTS = "GET_POSTS";
export const PUSH_POST = "PUSH_POST";
export const DELETE_POST = "DELETE_POST";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const USER_NOTFOUND = "USER_NOTFOUND";
export const REGISTER_USER = "REGISTER_USER";
export const SEND_MESSAGE = "SEND_MESSAGE";

const firebase = fire_;
window.firekudz = fire_;

// Get Posts Functions
export function getPosts() {
    return function(dispatch){
        return firebase.database().ref("posts").once("value", function(snap){
            // Set New State
            dispatch({
                type: GET_POSTS,
                payload: snap.val(),
            })
        })
    }
}

// Make Posts Functions
export default function pushPost(post) {
    return async function(dispatch){
        let key; let snap_; let post_with_id;
        return firebase.database().ref("posts").push(post).then((snap)=>{
            // Clear input Field
            document.querySelector(".postfield_").value = ``;

            // Get key
            key = snap.key;
            // Get post ref
            firebase.database().ref("posts/" + key ).once("value", (snapshot)=>{
                snap_ = snapshot;
            })
            // Push Unique Key to object
            .then(()=>{
                post_with_id = {...post, id: key};
                firebase.database().ref('posts/'+key).update(post_with_id)
            })
            // Dispatch New Post
            .then(()=>{
                dispatch({
                    type: PUSH_POST,
                    payload: { [key]: post_with_id },
                })
            })
        })
    }
}

// Delete My Posts
export function deletePost(post_id){
    return async function(dispatch){
        return firebase.database().ref('posts/' + post_id).remove().then(()=>{
            // Dispatch
            return firebase.database().ref("posts").once("value").then((snap)=>{
                return dispatch({
                    type: DELETE_POST,
                    payload: snap.val()
                })
            })
        })
    }
}

// Sing In
export function singIn(user){

    return function(dispatch){
        return firebase.database().ref("users").orderByChild('username').equalTo(user.user).once('value').then((snap)=>{
            
            // If user Found
            if( snap.val() !== null &&  snap.val() !== undefined &&  Object.values(snap.val())[0].password  ===  user.pass){
                let key = Object.keys(snap.val())[0];

                // Load Pregress Bar
                document.getElementById("loadbar").style.display = "block";
                setTimeout(()=>{
                    document.getElementById("loadbar").style.width = "100%";
                })
                
                setTimeout(() => {
                    document.getElementById("loadbar").style.display = "none";
                    document.getElementById("loadbar").style.width = "0";

                    return dispatch({
                        type: SIGN_IN,
                        payload: { 
                            key: key,
                            username: snap.val()[key].username,
                            inbox: snap.val()[key].inbox.chats
                        }
                    })
                }, 1500);
            }
            // If User not Found
            else{
                return dispatch({
                    type: USER_NOTFOUND,
                    payload: { 
                        loginState:false
                    }
                })
            }

        })
        
    }
}

// Send Message
export function sendMessage(post) {
    return async function(dispatch){
        
        let senderID = post.senderID;
        let chatID = post.chatID;
        let message = post.message;
        let postObj = { message: message, sender: "Me", timeStamp: new Date().getTime() }
        let snap_;
        
        return firebase.database().ref("users/" + senderID + "/inbox/chats/" + chatID + "/messages").push( postObj ).then((snap)=>{
            // Clear input Field
            document.querySelector(".inboxTextArea").value = ``;

            // Get post ref
            firebase.database().ref( "users/" + senderID + "/inbox/chats" ).once("value", (snapshot)=>{
                snap_ = snapshot.val();
            })

            // Dispatch New Post
            .then(()=>{
                dispatch({
                    type: SEND_MESSAGE,
                    payload: { 
                        key: senderID,
                        username: post.recipient,
                        inbox: snap_
                    }
                })
            })
        })
    }
}

// Register New User
export function registerUser(data){

    return function(dispatch){
        return firebase.database().ref("users").push({
            id: "not_set",
            inbox: {
                chats: {
                    all: "appended here"
                },
            },
            password: data.password,
            username: data.username
        }).then((snap)=>{
            // Get ID of User record
            let userKey = snap.key;

            // Send User Support Message
            firebase.database().ref("users/" + userKey + "/inbox/chats/").push({
                messages:{
                    all:"appended here"
                },
                recipient:{
                    id:"Support",
                    name:"Support"
                }
            })

            // Get ID of new Conversation
            .then((snap)=>{
                let chatKey = snap.key;

                firebase.database().ref("users/" + userKey + "/inbox/chats/" + chatKey + "/messages").push({
                    message: "Welcome to Social App, we hope you enjoy your experience. Send us a message anytime you need technical support.",
                    sender: "Technical Support",
                    timeStamp: new Date().getTime()
                })

                // Log the User In
                .then(()=>{
                    return dispatch({
                        type: REGISTER_USER,
                        payload:{
                            state:true,
                            data:{
                              user: data.username,
                              pass: data.password
                            }
                        }
                    })
                })
            })
        

        })
    }
}

// Sign Out
export function signOut(data){
    return function(dispatch){
        // Load Pregress Bar
        document.getElementById("loadbar").style.display = "block";
        setTimeout(()=>{
            document.getElementById("loadbar").style.width = "100%";
        })
                
        setTimeout(() => {
            document.getElementById("loadbar").style.display = "none";
            document.getElementById("loadbar").style.width = "0";
            return dispatch({
                type: SIGN_OUT,
                payload:{
                    user:null
                }
            })
        }, 1500)
    }
}