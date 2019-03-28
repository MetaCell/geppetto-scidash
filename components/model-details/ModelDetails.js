/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { Capabilities, RunParams } from "./partials";


const ModelDetails = ({ modelClassName, modelClassUrl, classCapabilities, instanceName, instanceSource, runParameters }) => (
  <Card>
    <CardText>
      <p><strong>Class name: </strong>
        {modelClassName}
      </p>
      <p><strong>Class source: </strong>
        <a target='_blank' className="model-url" href={modelClassUrl}> {modelClassUrl}</a>
      </p>
      <p>
        <strong>
            Class capabilities:
        </strong>
      </p>
      {classCapabilities != "None" ? <Capabilities
        capabilities={classCapabilities}
      /> : classCapabilities}
      <p><strong>Instance name: </strong>
        {instanceName}
      </p>
      <p className="model-url"><strong>Instance source: </strong>
        {instanceSource}
      </p>
      <p><strong>Instance - Run parameters: </strong>
      </p>
      {runParameters != "None" ? <RunParams
        runParams={runParameters}
      /> : runParameters}
    </CardText>
  </Card>
);

export default ModelDetails;
