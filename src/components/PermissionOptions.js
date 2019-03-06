import React, { Component } from "react";
class PermissionOptions extends Component {
  constructor(props) {
    super(props);
  }

  onChange(key, value) {
    this.setState({ [key]: value }, state => {
      this.props.onChange(this.state);
    });
  }
  render() {
    let listItems;
    if (this.props.permissions && this.props.permissions.length > 0) {
      const permissions = this.props.permissions.map(permission => {
        if (permission.sensorName === "video") {
          return {
            policyId: "2",
            policySensorId: "6",
            sensorName: "Video and Location"
          };
        }
        return permission;
      });
      const index = permissions.findIndex(permission => {
        return permission.sensorName === "map";
      });
      if (index > -1) {
        permissions.splice(index, 1);
      }

      listItems = permissions.map((permission, index) => {
        return (
          <li key={"pOption" + index} className="li-style permission--checkbox">
            <label>
              <input
                onChange={e =>
                  this.onChange(permission.policySensorId, e.target.checked)
                }
                type="checkbox"
                checked
                readOnly
                value={permission.policySensorId}
              />
              <span>{permission.sensorName}</span>
            </label>
          </li>
        );
      });
    }
    return <ul className="ul-style">{listItems}</ul>;
  }
}

export default PermissionOptions;
