import axios from "axios";

export const loginActions = {
  LOGIN_REQUEST: "USERS_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USERS_LOGIN_SUCCESS",
  LOGIN_FAILURE: "USERS_LOGIN_FAILURE"
};

export const loginRequestAction = payload => {
  return { type: "USERS_LOGIN_REQUEST", payload: payload };
};

export const loginSuccessAction = payload => {
  return { type: "USERS_LOGIN_SUCCESS", payload: payload };
};

export const loginFailureAction = payload => {
  return { type: "USERS_LOGIN_FAILURE", payload: payload };
};

export const loginRequestDispatch = userDetails => {
  console.log("dispatch");
  return dispatch => {
    axios
      .post(
        "http://ec2-35-153-131-42.compute-1.amazonaws.com:9001/user-management/usermgmt/users/login",
        userDetails
      )
      .then(postResponse => {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(postResponse.data));
        dispatch(loginRequestAction(postResponse.data));
        dispatch(loginSuccessAction(postResponse.data));
        console.log("postResponse", postResponse);
      })
      .catch(error => {
        console.log("failure error", error);
        dispatch(loginFailureAction(error.response.data));
      });
  };
};
