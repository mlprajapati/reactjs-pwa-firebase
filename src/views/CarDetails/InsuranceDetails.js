import React, { Component } from "react";
import PolicyList from "./PolicyList";
const InsuranceDetails = props => {
  return (
    <section className="insurance-panel">
      <div className="insurance-policy-heading">Insurance Policy</div>
      <p className="insurance-policy-sub-title">Avaiable For Your Car</p>
      <PolicyList
        policies={props.policies}
        handleClickApply={props.handleClickApply}
      />
    </section>
  );
};

export default InsuranceDetails;
