import React, { Component } from "react";
class Tab extends Component {
  state = {};
  render() {
    return (
      <li
        onClick={() => this.props.handleClick(this.props.data)}
        className={
          this.props.isActive
            ? "rectangle-copy-8 tab-style rectangle-copy-8-active"
            : "rectangle-copy-8 tab-style"
        }
      >
        {this.props.data.name}
      </li>
    );
  }
}

export default Tab;
