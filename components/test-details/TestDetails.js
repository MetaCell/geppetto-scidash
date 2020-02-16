import React from "react";
import Chip from "@material-ui/core/Chip";
import { red, brown } from "@material-ui/core/colors";
import { Card, CardHeader, CardContent } from "@material-ui/core";

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
  <div style={{ minWidth: "100px", margin: "15px" }}>
    <h4
      style={{ maxWidth: "360px" }}
    >
          Test details
    </h4>
    <Card>
      <CardContent>
        <div>
          <strong>Test name: </strong>
          {instanceTestName}
        </div>
        <div>
          <strong>Test class: </strong>
          {testClassName}
        </div>
        <div>
          <strong>Build info: </strong>
          <BuildInfoLine
            buildInfo={buildInfo.text}
            iconClass={buildInfo.icon}
          />
        </div>
        <div>
          <strong>Tags: </strong>
          {testTags.map((tag, i) => (
            <Chip
              containerElement="span"
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
        <div>
          <strong>Observation: </strong>
          <Observation observation={observation} />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TestDetails;
