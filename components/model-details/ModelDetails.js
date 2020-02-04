/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Chip from "material-ui/Chip";
import { Capabilities, RunParams } from "./partials";
import {red400, brown500} from 'material-ui/styles/colors';
import { Card, CardHeader, CardText } from "material-ui/Card";


const ModelDetails = ({ 
    modelClassName, 
    modelClassUrl, 
    classCapabilities, 
    instanceName, 
    instanceSource, 
    runParameters,
    modelTags
  }) => (
  <Card>
    <CardText id="model-details-dialog">
      <p id="model-class-name"><strong>Class name: </strong>
        {modelClassName}
      </p>
      <p id="model-class-source"><strong>Class source: </strong>
        <a target='_blank' className="model-url" href={modelClassUrl}> {modelClassUrl}</a>
      </p>
      <p id="model-class-capabilities">
        <strong>
            Class capabilities:
        </strong>
      </p>
      {classCapabilities != "None" ? <Capabilities
        capabilities={classCapabilities}
      /> : classCapabilities}
      <p id="model-instance-name"><strong>Instance name: </strong>
        {instanceName}
      </p>
      <p id="model-url" className="model-url"><strong>Instance source: </strong>
        {instanceSource.search(/http/) > -1 ? 
          <a target='_blank' className="model-url" href={instanceSource}> {instanceSource}</a> : 
          instanceSource}
      </p>
      <p id="model-tags" className="model-url"><strong>Instance Tags: </strong>
        {modelTags.map((tag, i) => 
        {
          return <Chip
              containerElement={'span'}
              backgroundColor={tag.toLowerCase() === "deprecated" ? red400 : brown500}
              style={{ 
                      marginTop: 6, 
                      marginBottom: 0,
                      whiteSpace: "nowrap",
                      display: "inline-block"
                    }}
              key={`${tag}-${i}`}>
              {tag}
          </Chip>
        }) }
      </p>
      <p id="model-parameters"><strong>Instance - Run parameters: </strong>
      </p>
      {runParameters != "None" ? <RunParams
        runParams={runParameters}
      /> : runParameters}
    </CardText>
  </Card>
);

export default ModelDetails;
