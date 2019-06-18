import React from "react";
import Chip from "material-ui/Chip";
import { red400, brown500 } from "material-ui/styles/colors";
import { Card, CardHeader, CardText } from "material-ui/Card";
import ModelDetailsContainer from "../model-details/ModelDetailsContainer";

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

const ScoreDetails = ({
  scoreClassName,
  testClassName,
  score,
  sortKey,
  scoreType,
  buildInfo,
  hostname,
  error,
  observation,
  timestamp,
  modelBackend,
  background,
  modelInstance,
  testTags,
  instanceTestName
}) => (
  <Card>
    <CardText
      style={{
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start"
      }}
    >
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
              <strong>Score: </strong>
              <span
                style={{
                  background: background,
                  color: "white",
                  padding: "1px"
                }}
              >
                {score}
              </span>
            </div>
            <div>
              <strong>Normalized score: </strong>
              <span
                style={{
                  background: background,
                  color: "white",
                  padding: "1px"
                }}
              >
                {sortKey}
              </span>
            </div>
            <div>
              <strong>Test class: </strong>
              {testClassName}
            </div>
            <div>
              <strong>Score type: </strong>
              {scoreType}
            </div>
            <div>
              <strong>Test suite: </strong>
              N/A
            </div>
            <div>
              <strong>Build info: </strong>
              <BuildInfoLine
                buildInfo={buildInfo.text}
                iconClass={buildInfo.icon}
              />
            </div>
            <div>
              <strong>Hostname: </strong>
              {hostname}
            </div>
            <div style={{
              wordWrap: "break-word",
              width: "230px"
            }}
            >
              <strong>Errors: </strong>
              {unpackError(error)}
            </div>
            <div>
              <strong>Timestamp: </strong>
              {timestamp}
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
            <div>
              <strong>Simulator: </strong>
              {modelBackend}
            </div>
          </CardText>
        </Card>
      </div>
      <div
        style={{ wordWrap: "break-word", minWidth: "100px", margin: "15px" }}
      >
        <h4>Model details</h4>
        <ModelDetailsContainer model={modelInstance} />
      </div>
    </CardText>
  </Card>
);

export default ScoreDetails;
