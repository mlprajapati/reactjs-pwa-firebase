import axios from "axios";

export const POLICIES = {
    ALL_POLICIES: "ALL_POLICIES",
};

export const policiesAction = (policies) => {
    return {
        type: "ALL_POLICIES",
        payload: policies
    };
};


export const allPoliciesDispatch = () => {
    return (dispatch) => {
        axios
            .get(
                "http://www.mocky.io/v2/5c6d1d2f3700007e14fa31f6"
            ).then((policiesDetail) => {
                console.dir(policiesDetail.data);
                dispatch(policiesAction(policiesDetail.data));
            })
    }
};