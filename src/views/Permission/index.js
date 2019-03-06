import React, { Component } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import './styles.css';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import GLOBAL_VARIABLES from '../../config/config';
import PermissionOptions from '../../components/PermissionOptions';
import * as actionTypes from '../../spinnerStore/actions';
import * as policyDetails from '../../Data/policy-details';
import * as carDetails from '../../Data/car-details';
class Permission extends Component {
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
    console.log('this.props permission did mount', this.props);
    this.props.setSpinnerStatus(true);
    // axios
    //   .get(
    //     'https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/policy/' +
    //       this.props.match.params.agreementId
    //   )
    this.getAppliedPolicyDetails(this.props.match.params.agreementId).then(
      policyDetailResponse => {
        this.props.setSpinnerStatus(false);
        console.log('policy detail');
        console.dir(policyDetailResponse);
        this.setState({
          policyDetail: policyDetailResponse[0].policyDetails,
          policySensors: policyDetailResponse[0].policySensors
        });
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
      this.props.setSpinnerStatus(false);
      console.log('car details', carDetailsResponse.data[0]);
      this.setState({ carDetails: carDetailsResponse.data[0] });
    });
  }
  componentWillMount() {
    console.log('this.props permission willmount', this.props);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      GLOBAL_VARIABLES.BASEROUTE = this.props.location.pathname;
      this.props.history.push('/login');
    }
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
        .put(
          'https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/userpermissions',
          {
            vin: this.state.carDetails ? this.state.carDetails.vin : '121212',
            video_enabled: true,
            map_enabled: true,
            speed_enabled: false
          }
        )
        .then(postResponse => {
          this.props.setSpinnerStatus(false);
          toastr.success('Insurance Policy Applied.');
          localStorage.setItem(
            'applied-policy',
            JSON.stringify(postResponse.data)
          );
          //  this.props.history.push("/car-details/confirm");
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
            <Header headeTitle="Permission" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 content-container">
            <section className="insurance-panel">
              <div className="insurance-policy-heading">
                Data Access Permission
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
)(Permission);
