import React from "react";
import Chip from "material-ui/Chip";
import { red400, brown500 } from "material-ui/styles/colors";
import { Card, CardHeader, CardText } from "material-ui/Card";

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
          style={{
            maxWidth: "360px"
          }}
        >
          Test details
        </h4>
        <Card>
          <CardText>
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
                  backgroundColor={
                    tag.toLowerCase() === "deprecated" ? red400 : brown500
                  }
                  style={{
                    marginTop: 6,
                    marginBottom: 0,
                    whiteSpace: "nowrap",
                    display: "inline-block"
                  }}
                  key={`${tag}-${i}`}
                >
                  {tag}
                </Chip>
              ))}
            </div>
            <hr />
            <div>
              <strong>Observation: </strong>
              <Observation observation={observation} />
            </div>
          </CardText>
        </Card>
      </div>
);

export default TestDetails;
