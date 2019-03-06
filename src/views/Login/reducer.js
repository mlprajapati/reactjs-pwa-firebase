import { loginActions } from "./actions";

const initialState = {
  loggedInStatus: false,
  loginResponse: "",
  loginMessage: ""
};

const loginReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case loginActions.LOGIN_REQUEST: {
      console.log("request reducer");
      return {
        ...newState,
        loginResponse: action.payload,
        loggedInStatus: true
      };
    }
    case loginActions.LOGIN_SUCCESS: {
      console.log("success reducer");
      return {
        ...newState,
        loginResponse: action.payload,
        loggedInStatus: true
      };
    }
    case loginActions.LOGIN_FAILURE: {
      console.log("failure reducer");
      return {
        ...newState,
        loginResponse: action.payload,
        loggedInStatus: false
      };
    }
  }

  return state;
};

export default loginReducer;
