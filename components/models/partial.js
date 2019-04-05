import React, { Component } from "react";
import Menu from "material-ui/Menu";
import Chip from "material-ui/Chip";
import Popover from "material-ui/Popover";
import FontIcon from "material-ui/FontIcon";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";

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
    this.state = {
      anchorEl: null
    };
  }

  render () {
    const { anchorEl } = this.state;
    return (
      <span className="edit-clone-test">
        <FontIcon className="fa fa-lock" />
        <IconButton
          iconClassName="fa fa-ellipsis-v"
          onClick={e => this.setState({ anchorEl: e.currentTarget })}
        />

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
              leftIcon={<FontIcon className="fa fa-pencil-square-o" />}
            />
            <MenuItem
              primaryText="Clone"
              onClick={() => this.props.clone(this.props.value.get("modelId"))}
              leftIcon={<FontIcon className="fa fa-clone" />}
            />
          </Menu>
        </Popover>
      </span>
    );
  }
}

export const CustomTagComponent = ({ value }) => (
  <span className="chips">
    {value.map((tag, i) => <Chip containerElement="span" key={i}>{tag}</Chip>)}
  </span>
);
