import React, { Component } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import './styles.css';
import { toastr } from 'react-redux-toastr';
import PermissionOptions from '../../components/PermissionOptions';
import { connect } from 'react-redux';
import * as actionTypes from '../../spinnerStore/actions';
import * as policyDetails from '../../Data/policy-details';
import * as carDetails from '../../Data/car-details';
class Agreement extends Component {
  state = {
    policy: {
      policySensors: [],
      policyDetail: ''
    },
    carDetails: null,
    isConfirmed: false
  };

  getAppliedPolicyDetails(policyId) {
    const policy = policyDetails.default.data.filter(policy => {
      if (policy.policyDetails.policyId === policyId) {
        return policy;
      }
    });
    return new Promise((resolve, reject) => {
      resolve(policy);
    });
  }
  getCarDetails() {
    return new Promise((resolve, reject) => {
      resolve(carDetails.default);
    });
  }

  componentDidMount() {
    debugger;
    this.props.setSpinnerStatus(true);
    // axios
    //   .get(
    //     'https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/policy/' +
    //       this.props.match.params.agreementId
    //   )
    this.getAppliedPolicyDetails(this.props.match.params.agreementId).then(
      policyDetailResponse => {
        this.props.setSpinnerStatus(false);
        console.dir(policyDetailResponse);
        console.log('policyDetailResponse.policyDetails', policyDetailResponse);
        this.setState({
          policyDetail: policyDetailResponse[0].policyDetails,
          policySensors: policyDetailResponse[0].policySensors
        });
      },
      error => {
        this.props.setSpinnerStatus(false);
      }
    );

    // axios
    //   .post(
    //     'https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/ownercars',
    //     {
    //       owner: 'madan@hcl.com'
    //     }
    //   )
    this.getCarDetails().then(carDetailsResponse => {
      this.setState({ carDetails: carDetailsResponse.data[0] });
    });
  }
  onChange(name, values) {
    this.setState({ [name]: values });
  }
  handleOnChangeTerm(name, value) {
    this.setState({ ...this.state, isConfirmed: value });
    this.setState({ [name]: value });
  }
  handleClickApply = policy => {
    if (this.state.isConfirmed) {
      this.props.setSpinnerStatus(true);
      axios
        .post(
          'https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/policy',
          {
            vin: this.state.carDetails ? this.state.carDetails.vin : '121212',
            policyId: this.props.match.params.agreementId
          }
        )
        .then(postResponse => {
          this.props.setSpinnerStatus(false);
          toastr.success('Insurance Policy Applied.');
          localStorage.setItem(
            'policyId',
            JSON.stringify({ policyId: this.props.match.params.agreementId })
          );
          localStorage.setItem(
            'applied-policy',
            JSON.stringify(postResponse.data)
          );
          this.props.history.push('/car-details/confirm');
        })
        .catch(error => {
          this.props.setSpinnerStatus(false);
          toastr.error('Service is Temporarily not Avilable!');
        });
    } else {
      this.props.setSpinnerStatus(false);
      toastr.warning('Please Accept Terms and Conditions!');
    }
  };
  handleClickCancel = () => {
    this.props.history.push('/car-details');
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Agreement" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 content-container">
            <section className="insurance-panel">
              <div className="insurance-policy-heading">
                Insurance Policy Agreement
              </div>
              <p className="insurance-policy-sub-title">
                VIN {this.state.carDetails ? this.state.carDetails.vin : ''} |
                Date 02 Jan 2019
              </p>
              <p className="insurance-policy-instraction">
                <span className="text-bold">
                  {this.state.policyDetail
                    ? this.state.policyDetail.policyDesc
                    : ''}
                </span>
              </p>
              <div className="insurance-policy-heading">Details:</div>
              <p className="insurance-policy-details">
                Vin - {this.state.carDetails ? this.state.carDetails.vin : ''}
                <br />
                Model -{' '}
                {this.state.carDetails ? this.state.carDetails.model : ''}
                <br />
                Policy No - 1GHGHBRKSR0157
                <br />
                Date of Insurance - 25-Jan-2019 00:00
              </p>
            </section>
            <section className="permission--options">
              <PermissionOptions
                onChange={values => this.onChange('permission', values)}
                permissions={this.state.policySensors}
              />
              <p className="terms-container">
                <label>
                  <input
                    onChange={e =>
                      this.handleOnChangeTerm('policyTerms', e.target.checked)
                    }
                    type="checkbox"
                    value={this.state['policyTerms']}
                  />
                  <span>
                    I have gone through and understand the Terms and Conditions
                  </span>
                </label>
              </p>
              <p className="agreement-control-container">
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
        </div>
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
)(Agreement);
