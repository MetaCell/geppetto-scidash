import React from "react";
import Chip from "@material-ui/core/Chip";
import { Capabilities, RunParams } from "./partials";
import { Card, CardContent } from "@material-ui/core";


const ModelDetails = ({ 
  modelClassName, 
  modelClassUrl, 
  classCapabilities, 
  instanceName, 
  instanceSource, 
  runParameters,
  modelTags
}) => (
  <Card style={{ overflow: "scroll", width: "calc(100vw - 50vw)" }} raised={true}>
    <CardContent>
      <strong className="dialogTitle">Class name: </strong>
      <div className="dialogText">
        {modelClassName}
      </div>

      <p />
      <strong className="dialogTitle">Class source: </strong>
      <div className="dialogText">
        {(modelClassUrl !== "None")
          ? <a target='_blank' className="model-url" href={modelClassUrl}> {modelClassUrl} </a>
          : <span> {modelClassUrl} </span>}
      </div>

      <p />
      <strong className="dialogTitle">Class capabilities:</strong>
      <div className="dialogText">
      {classCapabilities != "None" ? <Capabilities
        capabilities={classCapabilities}
      /> : classCapabilities}
      </div>

      <p />
      <strong className="dialogTitle">Instance name: </strong>
      <div className="dialogText">
        {instanceName}
      </div>

      <p />
      <strong className="dialogTitle">Instance source: </strong>
      <div className="model-url dialogText">
        {instanceSource.search(/http/) > -1 
          ? <a target='_blank' className="model-url" href={instanceSource}> {instanceSource}</a> 
          : instanceSource}
      </div>

      <p />
      <strong className="dialogTitle">Instance Tags: </strong>
      <div className="model-url dialogText">
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

      <p />
      <strong className="dialogTitle">Instance - Run parameters: </strong>
      <div className="dialogText">
      {runParameters != "None" ? <RunParams
        runParams={runParameters}
      /> : runParameters}
      </div>
    </CardContent>
  </Card>
);

export default ModelDetails;
