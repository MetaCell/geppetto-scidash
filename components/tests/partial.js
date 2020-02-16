import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";
import Popover from "@material-ui/core/Popover";
import LockIcon from '@material-ui/icons/Lock';
import CreateIcon from '@material-ui/icons/Create';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import { red, brown } from "@material-ui/core/colors";

const styles = {
  anchorOrigin: {
    vertical: "center",
    horizontal: "left",
  },
  targetOrigin: {
    vertical: "center",
    horizontal: "right",
  },
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
    let instanceId = this.props.value.get("testId");
    let checkInstance = function (value, index, array) {
      return value.id === instanceId; 
    };
    let instance = this.props.data.find(checkInstance);
    if (instance !== undefined){
      if ((instance.tags.indexOf("deprecated") !== -1)) {
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
    let instanceId = this.props.value.get("testId");
    let checkInstance = function (value, index, array) {
      return value.id === instanceId; 
    };
    let instance = this.props.data.find(checkInstance);
    if (instance !== undefined){
      if ((instance.tags.indexOf("unschedulable") !== -1)) {
        return true;
      }
    }
    return false;
  }


  checkInstance () {
    if (this.props.value === false || this.props.value === undefined) {
      return false
    } else {
      return true;
    }
  }

  checkUserRights () {
    if (this.props.value === false || this.props.value === undefined) {
      return false
    } else {
      var instanceId = this.props.value.get("testId");
      var checkInstance = function (value, index, array) {
        return value.id === instanceId 
      };
      var instance = this.props.data.find(checkInstance);
      if (instance.owner === this.props.user.userObject.username) {
        return false;
      }
      return true;
    }
  }

  render () {
    const { anchorEl } = this.state;
    return (
      <span className="edit-clone-test">
        { this.isBlocked() && <LockIcon /> }
        { this.checkInstance() && <IconButton
          className="fa fa-ellipsis-v"
          onClick={e => this.setState({ anchorEl: e.currentTarget })}
        /> }

        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          anchorOrigin={styles.anchorOrigin}
          targetOrigin={styles.targetOrigin}
          onRequestClose={() => this.setState({ anchorEl: null })}
        >
          <Menu>
            <MenuItem
              primaryText="Edit"
              onClick={() => {
                if (this.checkUserRights()) {
                  return false;
                } else {
                  this.props.edit(this.props.value.get("testId"));
                }
              }
              }
              leftIcon={<CreateIcon />}
              disabled={this.checkUserRights()}
            />
            <MenuItem
              primaryText="Clone"
              onClick={() => {
                if (this.isUnschedulable()) {
                  return false;
                } else {
                  this.props.clone(this.props.value.get("testId"))
                }
              }
              }
              leftIcon={<FileCopyIcon />}
              disabled={this.isUnschedulable()}
            />
          </Menu>
        </Popover>
      </span>
    );
  }
}

export const CustomTagComponent = ({ value }) => (
  <span className="chips">
    {value.map((tag, i) => <Chip color={(tag.toLowerCase() === "deprecated" || tag.toLowerCase() === "unschedulable") ? "secundary" : "primary"} key={i} label={tag} />)}
  </span>
);
