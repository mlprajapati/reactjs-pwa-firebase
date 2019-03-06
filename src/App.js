import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import './App.css';
import Login from './views/Login';
import CarDetails from './views/CarDetails';
import Agreement from './views/Agreement';
import Permission from './views/Permission';
import AuthGuard from './authguard/AuthGuard';
import GLOBAL_VARIABLES from './config/config';
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthGuard.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class App extends Component {
  state = {
    auth: true
  };
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      GLOBAL_VARIABLES.BASEROUTE = this.props.location.pathname;
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        {this.props.spinnerStatus ? (
          <div className="spinner-overlay-container">
            <div className="spinner-border text-app spinner-body" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="bottom-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/car-details" component={CarDetails} />
          <PrivateRoute
            path="/permission/:agreementId"
            component={Permission}
          />
          <PrivateRoute path="/agreement/:agreementId" component={Agreement} />
          <PrivateRoute path="/car-details/:stage" component={CarDetails} />

          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
App.defaultProps = {
  children: null
};
const mapStateToProps = state => {
  const loginResponse = JSON.parse(localStorage.getItem('user'));

  return { auth: true, spinnerStatus: state.spinnerStatus.spinnerStatus };
  // if (loginResponse && loginResponse.status === "Success") {
  //   console.log("app state spinner", state);
  //   return { auth: true, spinnerStatus: state.spinnerStatus.spinnerStatus };
  // }
  // return { auth: false };
};
export default withRouter(connect(mapStateToProps)(App));
