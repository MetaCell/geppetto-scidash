import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import { OKicon, Xicon } from '../../assets/CustomIcons';

const styles = {
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

const generateSVG = (svg, props) => (
  <SvgIcon {...props}>
    {svg}
  </SvgIcon> 
)

const getTableHeader = (tests) => (
  <tr>
    <th key="Models"><p style={styles.tableFirstHeader}>Models</p></th>
    {tests.map( test => (
      <th key={test.id}>
        <p style={styles.tableHeader}>
          {test.name}
        </p>
      </th>
    ))}
  </tr>
)

const getRowsArray = (tests, models ) => { // check HERE if the test is compatible with the model
  const compatibility = tests.map( test => test.id < 4 )

  const modelNames = models.map(model => `${model.name} (${model.meta})`)
  
  return modelNames.map(title => [ title, ...compatibility ])
  
}

const getTableCell = cellInfo => {
  if (cellInfo.constructor.name == "String") {
    return (
      <p style={styles.tableBody}>
        {cellInfo}
      </p>
    )
  }
  else {
    return (
      <span 
        data-tooltip={ cellInfo
          ? "Test compatible with model" 
          : "Test incompatible with model"
        } 
      >
        {generateSVG(cellInfo ? OKicon : Xicon)}
      </span> 
    )
  }
}

const getTableRow = (rowsArray) => {
  return rowsArray.map(row => (
    <tr key={row[0]}>
      {row.map((el, i) => (
        <td key={i} style={styles.tableFirstBody}>
          {getTableCell(el)}
        </td>
      ))}
    </tr>
  ))
}

export default ({ tests, models }) => {
  const tableHeaders = getTableHeader(tests)
  const rowsArray = getRowsArray(tests, models)
  const tableRows = getTableRow(rowsArray)
  
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <tbody>
          {tableHeaders}
          {tableRows}
        </tbody>
      </table> 
  </div>
  )
}
  

