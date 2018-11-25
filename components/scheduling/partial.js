import React from 'react';
import { OKicon, Xicon } from '../../assets/CustomIcons';

import { brown500, blue500 } from 'material-ui/styles/colors';

const styles = {
  modelsAvatar: {
    background: blue500, position: 'relative'
  },
  testsAvatar: {
    background: brown500, position: 'relative'
  },
  icon: {
    position: 'absolute', top: '9px', left: '9px'
  },
  action: {
    positon: 'absolute'
  },
  tableContainer: {
    textAlign: 'center', marginTop: '40px'
  },
  table: {
    display: "inline-block"
  }, 
  tableFirstHeader: {
    float: "left", margin: "2px 10px 10px 0px"
  },
  tableHeader: {
    margin: "2px 10px 10px 2px"
  },
  tableFirstBody:{
    borderBottom: "1px solid grey"
  },
  tableBody: {
    float: "left", margin: "8px 10px 8px 0px"
  },
}

export const CustomTable = ({ tests, models }) => (
  <div style={styles.tableContainer}>
    <table style={styles.table}>
      <tbody>
        <tr>
          <th key="Models"><p style={styles.tableFirstHeader}>Models</p></th>
          {tests.map( ({ name }, i) => <th key={i}><p style={styles.tableHeader}>{name}</p></th>)}
        </tr>
			
        {models.map(({ name, meta }) => [ `${name} (${meta})`, ...tests.map( ({ id }) => id < 4 ? <OKicon color="primary" key={id} /> : <Xicon color="error" key={id} /> )])
          .map( row => (
            <tr key={row[0]}>
              {row.map((el, i) => (
                <td key={i} style={styles.tableFirstBody}>
                  {el.constructor.name == 'String'
                    ? <p style={styles.tableBody}>{el}</p>
                    : <Tooltip title={el.props.color == "primary" ? "Test compatible with model" : "Test incompatible with model"} styles={{ tooltip: styles.lightTooltip }} placement="top">{el}</Tooltip> 
                  }
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table> 
  </div>
)
