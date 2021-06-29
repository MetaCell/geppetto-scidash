import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import LockIcon from '@material-ui/icons/Lock';
import CreateIcon from '@material-ui/icons/Create';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { ListItemIcon, ListItemText } from "@material-ui/core";

const styles = {
  anchorOrigin: {
    vertical: "center",
    horizontal: "left"
  },
  targetOrigin: {
    vertical: "center",
    horizontal: "right"
  }
};

export class CustomMenu extends Component {
  constructor (props) {
    super(props);
    this.state = { anchorEl: null };

    this.isBlocked = this.isBlocked.bind(this);
    this.checkInstance = this.checkInstance.bind(this);
    this.checkUserRights = this.checkUserRights.bind(this);
  }

  isBlocked () {
    if (this.props.value === false) {
      return false;
    }
    if (this.props.value === undefined) {
      return false;
    }
    if (this.props.value.get("isBlocked")) {
      return true;
    }
    let instanceId = this.props.value.get("modelId");
    let checkInstance = function (value, index, array) {
      return value.id === instanceId;
    };
    let instance = this.props.data.find(checkInstance);
    if (instance != undefined) {
      if (instance.tags.indexOf("deprecated") !== -1) {
        return true;
      }
    }
    return false;
  }

  isUnschedulable () {
    if (this.props.value === false) {
      return false;
    }
    if (this.props.value === undefined) {
      return false;
    }
    let instanceId = this.props.value.get("modelId");
    let checkInstance = function (value, index, array) {
      return value.id === instanceId;
    };
    let instance = this.props.data.find(checkInstance);
    if (instance != undefined) {
      if (instance.tags.indexOf("unschedulable") !== -1) {
        return true;
      }
    }
    return false;
  }


  checkInstance () {
    if (this.props.value === false || this.props.value === undefined) {
      return false;
    } else {
      return true;
    }
  }

  checkUserRights () {
    if (this.props.value === false || this.props.value === undefined) {
      return false;
    } else {
      let instanceId = this.props.value.get("modelId");
      let checkInstance = function (value, index, array) {
        return value.id === instanceId;
      };
      let instance = this.props.data.find(checkInstance);
      if (instance != undefined) {
        if (instance.owner === this.props.user.userObject.username) {
          return false;
        }
      }
      return true;
    }
  }

  render () {
    const { anchorEl } = this.state;
    return (
      <span className="edit-clone-test"
        title={ this.isBlocked() && "This model instance is locked because it has already a score associated to it or model class of this instance has no import path, only tags can be edited. Clone from the grid view to create a different instance."}
      >
        {this.isBlocked() && <LockIcon />}
        {this.checkInstance() && (
          <IconButton
            className="fa fa-ellipsis-v"
            onClick={e => this.setState({ anchorEl: e.currentTarget })}
          />
        )}

        <Menu
          open={anchorEl != null}
          anchorEl={anchorEl}
          onClose={() => this.setState({ anchorEl: null })}
        >
          <MenuItem
            onClick={() => {
              if (this.checkUserRights()) {
                return false;
              } else {
                this.props.edit(this.props.value.get("modelId"));
              }
            }}
            disabled={this.checkUserRights()}
          >
            <ListItemIcon>{<CreateIcon />}</ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (this.isUnschedulable()) {
                return false;
              } else {
                this.props.clone(this.props.value.get("modelId"))
              }
            }
            }
            disabled={this.isUnschedulable()}
          >
            <ListItemIcon>{<FileCopyIcon />}</ListItemIcon>
            <ListItemText>Clone</ListItemText>
          </MenuItem>
        </Menu>
      </span>
    );
  }
}

export const CustomTagComponent = ({ value }) => (
  <span className="chips">
    {value.map((tag, i) => (
      <Chip
        color={(tag.toLowerCase() === "deprecated" || tag.toLowerCase() === "unschedulable") ? "secondary" : "primary"}
        key={i}
        label={tag}
      />
    ))}
  </span>
);
