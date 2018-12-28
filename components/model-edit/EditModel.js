import React from 'react';
import Chip from 'material-ui/Chip';
import SvgIcon from 'material-ui/SvgIcon';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { brown500 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import { OKicon } from '../../assets/CustomIcons';

export default class EditModel extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      newtag: 'my_tag',
      loading: false,
      success: false
    }

    this.doSomethingToDownloadModel = this.doSomethingToDownloadModel.bind(this);
  }

  doSomethingToDownloadModel = (key) => {
    if (key == "Enter") {
      console.log("I want to download a model")
      const { loading } = this.state;
      if (!loading) {
        this.setState({
          success: false,
          loading: true,
        }, () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 2000);
        },);
      }
    }
  };

  render () {
    const { loading, success, newtag } = this.state;
    const { activateEditModel } = this.props;

    return (
      <span>
        <div style={styles.firstLine.container}>
          <TextField
            value="Model name"
            style={styles.firstLine.one}
            floatingLabelText="Name of the model"
            underlineStyle={{ borderBottom: "1px solid grey" }}
          />
          <TextField
            value={"url address"}
            style={styles.firstLine.two}
            floatingLabelText="Source URL"
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onKeyPress={event => this.doSomethingToDownloadModel(event.key)}
          />
          <span style={styles.firstLine.three}>
            {success ? <SvgIcon>{OKicon}</SvgIcon> : null}
            {loading && <CircularProgress size={36} />}
          </span>

        </div>

        <div style={styles.thirdLine.container}>
          <SelectField
            floatingLabelText="Select class"
            value={this.state.selectedClass}
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onChange={( event, index, value ) => this.setState({ selectedClass: value })}
          >
            <MenuItem value="None"><em>None</em></MenuItem>
            <MenuItem value={1} primaryText="Option 1" label="Option 1" />
            <MenuItem value={2} primaryText="Option 2" label="Option 2" />
            <MenuItem value={3} primaryText="option 3" label="Option 3" />
          </SelectField>

          <TextField
            value={newtag}
            onChange={() => {}}
            style={styles.thirdLine.one}
            floatingLabelText="Add a new tag"
            underlineStyle={{ borderBottom: "1px solid grey" }}
            onKeyPress={e => e.key === 'Enter' ? () => {} : null}
          />

          <div style={styles.thirdLine.two}>
            <Chip	style={{ marginLeft: 4, marginTop: 4, float: "left" }}>A tag</Chip>
            <Chip style={{ marginLeft: 4, marginTop: 4, float: "left" }}>Another tag</Chip>
            <Chip style={{ marginLeft: 4, marginTop: 4, float: "left" }}>A third tag</Chip>
          </div>
        </div>

        <div style={styles.fourthLine}>
          <h3>Model parameters</h3>
        </div>

        <div style={styles.fifthLine.container}>
          <TextField
            disabled
            value="value"
            style={styles.fifthLine.item}
            floatingLabelText="model parameter"
            underlineStyle={{ borderBottom: "1px solid grey" }}
          />
        </div>

        <div style={styles.actionsContainer}>
          <RaisedButton
            label="save"
            style={styles.actionsButton}
            onClick={() => activateEditModel()}
          />

          <RaisedButton
            label="cancel"
            style={styles.actionsButton}
            onClick={() => activateEditModel()}
          />
        </div>

      </span>
    )
  }
}

const styles = {
  actionsContainer: { width: "100%", display: 'flex', justifyContent: 'center', marginTop: '100px' },
  actionsButton: { width: '100px' },

  firstLine: {
    container: { width: '100%', display: 'flex', flexFlow: 'horizontal', justifyContent: "space-around", alignItems: "center" },
    one: { flex:3 },
    two: { flex: 9, marginLeft: '15px' },
    three: { flex: 1, marginLeft: '15px', position: 'relative' },
  },

  thirdLine: {
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    one: { width: '20%', marginLeft: "20px" },
    two: { float: 'right', width: '79%' }
  },
  fourthLine: { marginTop: '50px' },

  fifthLine:{
    container: { width: '100%', dysplay: 'flex', justifyContent: "flex-start", flexFlow: 'horizontal', alignItems: "center" },
    item: { marginRight: "15px", width: "200px" }
  }

}
