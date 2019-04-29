import { createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { reducerFunc } from "../reducers/index";
import firebase from "firebase/app";
import 'firebase/database';

// fire config
const config = {
  // Firebase configurations, can get these from firebase console
};

// init firebase
export const fire_ = firebase.initializeApp(config); 

// Inital State
const initialState = {
    firebase: fire_,
    allPosts:null,
    user:null,
    accountCreation:{
      state:false,
      data:{
        user:null,
        pass:null
      }
    },
    loginState: true
};

// Middleware
const middleware = [thunk.withExtraArgument({fire_})];

export const store = createStore(reducerFunc, initialState, applyMiddleware(...middleware));