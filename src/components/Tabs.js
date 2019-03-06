import React, { Component } from "react";
import Tab from "./Tab";

class Tabs extends Component {
  state = {
    tabData: this.props.tabData
  };
  render() {
    return (
      <ul className="nav nav-tabs">
        {this.state.tabData.map((tab, index) => {
          return (
            <Tab
              key={"tab_" + index}
              data={tab}
              isActive={this.props.activeTab.name === tab.name}
              handleClick={this.props.changeTab}
            />
          );
        })}
      </ul>
    );
  }
}

export default Tabs;
