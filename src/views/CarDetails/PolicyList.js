import React from "react";
import PolicyItem from "./PolicyItem";
const PolicyList = props => {
  return (
    <ul className="ul-style">
      {props.policies.map(policy => {
        return (
          <PolicyItem
            policy={policy}
            key={"policy-item_" + policy.policyId}
            handleClickApply={props.handleClickApply}
          />
        );
      })}
    </ul>
  );
};

export default PolicyList;
