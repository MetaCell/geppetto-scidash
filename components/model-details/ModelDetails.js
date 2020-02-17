import React from "react";
import Chip from "@material-ui/core/Chip";
import { Capabilities, RunParams } from "./partials";
import { red, brown } from '@material-ui/core/colors';
import { Card, CardHeader, CardContent } from "@material-ui/core";


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
    <CardContent>
      <div><strong>Class name: </strong>
        {modelClassName}
      </div>
      <div><strong>Class source: </strong>
        <a target='_blank' className="model-url" href={modelClassUrl}> {modelClassUrl}</a>
      </div>
      <div>
        <strong>
            Class capabilities:
        </strong>
      </div>
      {classCapabilities != "None" ? <Capabilities
        capabilities={classCapabilities}
      /> : classCapabilities}
      <div><strong>Instance name: </strong>
        {instanceName}
      </div>
      <div className="model-url"><strong>Instance source: </strong>
        {instanceSource.search(/http/) > -1 
          ? <a target='_blank' className="model-url" href={instanceSource}> {instanceSource}</a> 
          : instanceSource}
      </div>
      <div className="model-url"><strong>Instance Tags: </strong>
        {modelTags.map((tag, i) => <Chip
          color={tag.toLowerCase() === "deprecated" ? "secondary" : "primary"}
          style={{ 
            marginTop: 6, 
            marginBottom: 0,
            whiteSpace: "nowrap"
          }}
          key={`${tag}-${i}`}
          label={tag}
        />) }
      </div>
      <div><strong>Instance - Run parameters: </strong>
      </div>
      {runParameters != "None" ? <RunParams
        runParams={runParameters}
      /> : runParameters}
    </CardContent>
  </Card>
);

export default ModelDetails;
