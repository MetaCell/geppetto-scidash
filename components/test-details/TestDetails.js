import React from "react";
import Chip from "@material-ui/core/Chip";
import { Card, CardContent } from "@material-ui/core";
import { Observation, BuildInfoLine } from "./partials";

function unpackError (error){
  let parsedError = null;

  try {
    parsedError = JSON.parse(error);
  } catch (exception){
    return error;
  }

  parsedError = JSON.parse(parsedError.error_running_experiment);

  let result = `${parsedError.message} (${parsedError.exception})`;

  return result;
}

const TestDetails = ({
  testClassName,
  buildInfo,
  observation,
  testTags,
  instanceTestName
}) => (
  <div style={{ minWidth: "100px", margin: "15px" }} raised={true}>
    <Card>
      <CardContent>
        <strong className="dialogTitle">Test name: </strong>
        <div className="dialogText">
          {instanceTestName}
        </div>

        <p />
        <strong className="dialogTitle">Test class: </strong>
        <div className="dialogText">
          {testClassName}
        </div>

        <p />
        <strong className="dialogTitle">Build info: </strong>
        <div className="dialogText">
          <BuildInfoLine
            buildInfo={buildInfo.text}
            iconClass={buildInfo.icon}
          />
        </div>

        <p />
        <strong className="dialogTitle">Tags: </strong>
        <div className="dialogText">
          {testTags.map((tag, i) => (
            <Chip
              color={
                tag.toLowerCase() === "deprecated" ? "secondary" : "primary"
              }
              style={{
                marginTop: 6,
                marginBottom: 0,
                whiteSpace: "nowrap"
              }}
              key={`${tag}-${i}`}
              label={tag}
            />
          ))}
        </div>

        <hr />

        <strong className="dialogTitle">Observation: </strong>
        <div className="dialogText">
          <Observation observation={observation} />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TestDetails;
