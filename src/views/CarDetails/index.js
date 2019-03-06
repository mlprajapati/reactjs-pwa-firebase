import React, { Component } from 'react';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import './styles.css';
import CarDetail from './CarDetail';
import axios from 'axios';
import { connect } from 'react-redux';
import InsuranceDetails from './InsuranceDetails';
import InsuranceConfirm from './InsuranceConfirm';
import * as actionTypes from '../../spinnerStore/actions';
import * as policies from '../../Data/policies';
class CarDetails extends Component {
  getPolicies() {
    return new Promise((resolve, reject) => {
      resolve(policies.default);
    });
  }
  componentWillMount() {
    this.props.setSpinnerStatus(true);
    // axios
    //   .get('https://jwrr2fa8mf.execute-api.us-east-1.amazonaws.com/p3/policy')
    this.getPolicies().then(policiesDetail => {
      this.props.setSpinnerStatus(false);
      console.dir(policiesDetail);
      this.setState({ policies: policiesDetail.data });
    });
  }
  componentDidMount() {
    const appliedPolicy = JSON.parse(localStorage.getItem('applied-policy'));
    if (
      appliedPolicy &&
      appliedPolicy.updateItemResult &&
      appliedPolicy.updateItemResult.attributes
    ) {
      this.props.history.replace('/car-details/confirm');
    }
  }

  state = {
    tabData: [
      { name: 'CAR DETAILS', isActive: false },
      { name: 'INSURANCE POLICY', isActive: true }
    ],
    policies: [],
    activeTab: { name: 'INSURANCE POLICY', isActive: true }
  };
  handleClickApply = policyId => {
    console.log('policyId=====', policyId, this.props);
    this.props.history.push(`/agreement/${policyId}`);
  };
  handleClick = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Header headeTitle="Car Details" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 content-container">
            <div className="car-image">
              <img
                src="../../Assets/hdpi/Car.png"
                alt="car-img"
                srcSet="../../Assets/xhdpi/Car.png 1.5x, ../../Assets/xxhdpi/Car.png 2x"
                width="100%"
              />
            </div>
            <Tabs
              tabData={this.state.tabData}
              activeTab={this.state.activeTab}
              changeTab={this.handleClick}
            />
            <div>
              {this.state.activeTab.name === 'CAR DETAILS' ? (
                <CarDetail />
              ) : null}
              {this.state.activeTab.name === 'INSURANCE POLICY' &&
              this.props.location.pathname === '/car-details' ? (
                <InsuranceDetails
                  policies={this.state.policies}
                  handleClickApply={this.handleClickApply}
                />
              ) : null}
              {this.state.activeTab.name === 'INSURANCE POLICY' &&
              this.props.location.pathname === '/car-details/confirm' ? (
                <InsuranceConfirm />
              ) : null}
            </div>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     getPolicies: (tab) => {
//       if(tab.name === 'INSURANCE POLICY') {
//         dispatch(Action.allPoliciesDispatch());
//       }
//     }
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CarDetails);

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
)(CarDetails);
