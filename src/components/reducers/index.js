import { GET_POSTS, PUSH_POST, DELETE_POST, SIGN_IN, SEND_MESSAGE, REGISTER_USER, SIGN_OUT, USER_NOTFOUND } from "../actions/actions";

export function reducerFunc(state, action) {
  // console.log(state)
  switch (action.type) {
    case GET_POSTS:
      return {...state, allPosts: action.payload}

    case PUSH_POST:
      const allposts = {...state.allPosts, [  Object.keys(action.payload)[0]  ] : Object.values(action.payload)[0] };
      return {...state, allPosts:allposts}
    
    case DELETE_POST:
      return {...state, allPosts: action.payload }
    
    case SIGN_IN:
      return {...state, user: action.payload}
    
    case SEND_MESSAGE:
      return {...state, user: action.payload}

    case REGISTER_USER:
      return {...state, accountCreation: action.payload}

    case SIGN_OUT:
      return {...state, user: action.payload.user, loginState: action.payload.loginState}

    case USER_NOTFOUND:
      return {...state, loginState: action.payload.loginState}

    default:
      return state;
  }
}