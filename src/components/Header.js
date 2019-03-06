import React, { Component } from "react";
class Header extends Component {
  state = {
    headeTitle: this.props.headeTitle ? this.props.headeTitle : "Default"
  };
  render() {
    return (
      <header className="header-container">
        <div className="nav-btn">
          <nav className="navbar navbar-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </nav>
        </div>
        <div className="header-title">{this.state.headeTitle}</div>
      </header>
    );
  }
}

export default Header;
