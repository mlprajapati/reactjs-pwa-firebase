import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actionTypes from '../../spinnerStore/actions';
import * as carDetails from '../../Data/car-details';
class InsuranceConfirm extends Component {
  state = {
    policy: {
      policySensors: [],
      policyDetail: '',
      permissions: [
        { sensorName: 'Video and Location', id: 1, status: false },
        { sensorName: 'Speed', id: 2, status: false }
      ]
    },
    carDetails: null,
    isConfirmed: false
  };
  // state = {
  //   policy: {
  //     permissions: [
  //       { name: "Video", id: 1, status: false },
  //       { name: "Location", id: 2, status: false },
  //       { name: "Engine", id: 3, status: false },
  //       { name: "Turbo", id: 4, status: false },
  //       { name: "Gear", id: 5, status: false },
  //       { name: "Safty Gadgets", id: 6, status: false }
  //     ]
  //   }
  // };
  getCarDetails() {
    return new Promise((resolve, reject) => {
      resolve(carDetails.default);
    });
  }

  componentDidMount() {
    console.log('this.props in confirm', this.props);
    const policy = JSON.parse(localStorage.getItem('policyId'));
    console.log('this.props in confirm', policy);
    // axios
    //   .get(
    //     "https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/policy/" +
    //       policy.policyId
    //   )
    //   .then(policyDetailResponse => {
    //     console.log("policy detail in confirem");
    //     console.dir(policyDetailResponse);
    //     this.setState({
    //       policy: {
    //         policyDetail: policyDetailResponse.data.policyDetails,
    //         policySensors: policyDetailResponse.data.policySensors
    //       }
    //     });
    //   });
    this.props.setSpinnerStatus(true);
    // axios
    //   .post(
    //     'https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/ownercars',
    //     {
    //       owner: 'madan@hcl.com'
    //     }
    //   )
    this.getCarDetails().then(carDetailsResponse => {
      this.props.setSpinnerStatus(false);
      console.log('car details in confirm', carDetailsResponse.data[0]);
      this.setState({ carDetails: carDetailsResponse.data[0] });
    });
  }
  handleOnChangeTerm(name, value) {
    this.setState({ [name]: value });
  }
  handleClickApply = policy => {
    return <Redirect to={`/car-details`} />;
  };
  handleClickCancel = () => {
    return <Redirect to={`/car-details`} />;
  };
  shouldComponentUpdate(nextState, nextProp) {
    console.log(nextState, nextState);
    return true;
  }
  render() {
    console.log('this.state insurane', this.state);
    return (
      <div className="col-12 policy-content--container">
        <div className="insurance-policy-heading">Insurance Policy</div>
        <p className="insurance-policy-sub-title">Subscribed For Your Car</p>
        <section className="policy-section-container">
          <div className="insurance-policy-heading">Policy ABC</div>
          <p className="insurance-policy-details">
            Vin - {this.state.carDetails ? this.state.carDetails.vin : ''}
            <br />
            Model - {this.state.carDetails ? this.state.carDetails.model : ''}
            <br />
            Policy No - 1GHGHBRKSR0157
            <br />
            Date of Insurance - 25-Jan-2019 00:00
          </p>
          <p className="insurance-policy-instraction">
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            eacommodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div className="coverage---accident text-style-1">Coverage:</div>
          <ul className="policy-discount-ul-style coverage---accident">
            <li className="li-style-without--border li-style-padding-0">
              - Accident free discounts
            </li>
            <li className="li-style-without--border li-style-padding-0">
              - Anti-theft
            </li>
            <li className="li-style-without--border li-style-padding-0">
              - Defencing driving course
            </li>
            <li className="li-style-without--border li-style-padding-0">
              - Drive Safe and Save
            </li>
            <li className="li-style-without--border li-style-padding-0">
              - Having a homeowners policy{' '}
            </li>
          </ul>
          <div
            style={{
              backgroundImage: 'url(' + '../../Assets/hdpi/small_bg.png' + ')',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              margin: '0 -17px',
              paddingBottom: '1px'
            }}
          >
            <p className="details-to-be-shared">
              Details to be shared for processing any insurance claimrequest.
            </p>
            <ul className="policy-ul-style">
              {console.log(this.state.policy.policySensors)}
              {this.state.policy.permissions.length &&
                this.state.policy.permissions.map((permission, index) => {
                  console.log('permission', permission);
                  return (
                    <li
                      className="li-style-without--border li-style-padding-0"
                      key={'permission-option_' + index}
                    >
                      <span>- {permission.sensorName}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <p className="policy-control-container">
            <button
              className="btn-policy-cancel"
              onClick={() => this.handleClickCancel()}
            >
              CANCEL
            </button>
            <button
              className="btn-policy-apply"
              onClick={() => this.handleClickApply(this.state.policy)}
            >
              APPLY
            </button>
          </p>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    // loggedInStatus: state.login.loggedInStatus
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSpinnerStatus: value => {
      dispatch({ type: actionTypes.SPINNER_STATUS, payload: value });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsuranceConfirm);
