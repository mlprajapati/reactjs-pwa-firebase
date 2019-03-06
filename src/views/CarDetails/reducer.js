import { POLICIES } from "./actions";

const initialState = {
  allPolicies: [],
};

const policyReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case POLICIES.ALL_POLICIES: {
      console.log("request reducer");
      return {
        ...newState,
        allPolicies: action.payload
      };
    }
  }
  return newState;
};

export default policyReducer;
