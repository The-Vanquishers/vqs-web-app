import {SIGNED_UP, SIGNING_UP, SIGNUP_FAILED} from "../actions/signup";

const initialState = {
    signingUp: false,
    isSignedUp: false,
    signupFailed: false,
    errMsg: null,
  };

  const signup = (state = initialState, action) => {
    switch (action.type) {
      case SIGNING_UP:
        return {
          ...initialState,
          signingUp: true
        };
      case SIGNED_UP:
        return {
          ...state,
          signingUp: false,
          isSignedUp: true,
          userId:action.userId,
          message:action.message

        };
      case SIGNUP_FAILED:
        return {
          ...state,
          signingUp: false,
          signupFailed: true,
          errMsg: action.errMsg
        };
      default:
        return state;
    }

    
  };

  export const signupReducer = state => state.signup;
  export default signup;
  