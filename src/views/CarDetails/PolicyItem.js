import React from "react";
const PolicyItem = props => {
  return (
    <li className="li-style-without--border">
      <div className="card Mask">
        <div className="card-body policy-body">
          <div className="card-title policy-title">
            {props.policy.policyName}
          </div>
          <div className="policy-detail">{props.policy.policyDesc}</div>
          <div className="read-more--link">Read more...</div>
          <div>
            <button
              className="btn-apply"
              onClick={() => props.handleClickApply(props.policy.policyId)}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PolicyItem;
