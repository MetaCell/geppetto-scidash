import React from "react";
import Chip from "@material-ui/core/Chip";
import { red, brown } from "@material-ui/core/colors";
import { Card, CardHeader, CardContent } from "@material-ui/core";
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
  testClassDescription,
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
  <Card style={{ overflow: "scroll" }}>
    <CardContent
      style={{
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start"
      }}
    >
      <div id="test-details-dialog" style={{ minWidth: "100px", margin: "15px" }}>
        <h4
          style={{ maxWidth: "360px" }}
        >
          <strong className="cardTitle">Test details</strong>
        </h4>
        <Card raised={true}>
          <CardContent id="test-score">
            <strong className="dialogTitle">Test name: </strong>
            <div className="dialogText">
              {instanceTestName}
            </div>
            <p />
            <strong className="dialogTitle">Score: </strong>
            <div className="dialogText">
              <span
                style={{
                  background: background,
                  color: "white",
                  padding: "1px"
                }}
              >
                {score.toFixed(2)}
              </span>
            </div>
            <p />
            <strong id="normalized-score" className="dialogTitle">Normalized score: </strong>
            <div className="dialogText">
              <span
                style={{
                  background: background,
                  color: "white",
                  padding: "1px"
                }}
              >
                {sortKey.toFixed(2)}
              </span>
            </div>
            <p />
            <strong id="test-class" className="dialogTitle">Test class: </strong>
            <div className="dialogText">
              {testClassName}
            </div>
            <div className="dialogText">
              {testClassDescription}
            </div>
            <p />
            <strong className="dialogTitle">Score type: </strong>
            <div className="dialogText">
              {scoreType}
            </div>
            <p />
            <strong id="test-suite" className="dialogTitle">Test suite: </strong>
            <div className="dialogText">
              N/A
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
            <strong id="hostname" className="dialogTitle">Hostname: </strong>
            <div className="dialogText">
              {hostname}
            </div>
            <p />
            <strong className="dialogTitle">Errors: </strong>
            <div className="dialogText" style={{
              wordWrap: "break-word",
              width: "230px"
            }}
            >
              {unpackError(error)}
            </div>
            <p />
            <strong className="dialogTitle">Timestamp: </strong>
            <div className="dialogText">
              {timestamp}
            </div>
            <p />
            <strong id="timestamp" className="dialogTitle">Tags: </strong>
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
            <p />
            <strong id="observation" className="dialogTitle">Simulator: </strong>
            <div className="dialogText">
              {modelBackend}
            </div>
          </CardContent>
        </Card>
      </div>
      <div
        style={{ wordWrap: "break-word", minWidth: "100px", margin: "15px" }}
      >
        <h4><strong className="cardTitle">Model details</strong></h4>
        <ModelDetailsContainer model={modelInstance} />
      </div>
    </CardContent>
  </Card>
);

export default ScoreDetails;
