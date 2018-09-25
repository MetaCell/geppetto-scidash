import React from 'react';
import ModelDetailsContainer from '../model-details/ModelDetailsContainer';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Observation, BuildInfoLine } from './partials';


const ScoreDetails = ({
    scoreClassName,
    testClassName,
    score,
    sortKey,
    scoreType,
    buildInfo,
    hostname,
    observation,
    timestamp,
    modelBackend,
    background,
    modelInstance
}) => {
    return (
        <Card>
            <CardText style={{
                wordWrap: "break-word",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-start"
            }}>
                <div style={{minWidth: "350px", margin: "15px"}}>
                    <h4 style={{
                        maxWidth: "360px"
                    }}>{testClassName + " details"}</h4>
                    <Card>
                        <CardText>
                            <div><strong>Test name: </strong>
                                {testClassName}
                            </div>
                            <div><strong>Score: </strong>
                                <span style={{
                                    background: background,
                                    color: "white",
                                    padding:"1px"
                                }}>{score}</span>
                            </div>
                            <div><strong>Normalized score: </strong>
                                <span style={{
                                    background: background,
                                    color: "white",
                                    padding:"1px"
                                }}>{sortKey}</span>
                            </div>
                            <div><strong>Test class: </strong>
                                {testClassName}
                            </div>
                            <div><strong>Score type: </strong>
                                {scoreType}
                            </div>
                            <div><strong>Test suite: </strong>
                                N/A
                            </div>
                            <div><strong>Build info: </strong>
                                <BuildInfoLine
                                    buildInfo={buildInfo.text}
                                    iconClass={buildInfo.icon}
                                />
                            </div>
                            <div><strong>Hostname: </strong>
                                {hostname}
                            </div>
                            <div><strong>Timestamp: </strong>
                                {timestamp}
                            </div>
                            <hr />
                            <div><strong>Observation: </strong>
                                <Observation
                                    observation={observation}
                                />
                            </div>
                            <div><strong>Simulator: </strong>
                                {modelBackend}
                            </div>
                        </CardText>
                    </Card>
                </div>
                <div style={{ wordWrap: "break-word", minWidth:"350px", margin:"15px" }}>
                    <h4>Model details</h4>
                    <ModelDetailsContainer model={modelInstance} />
                </div>
            </CardText>
        </Card>
    )
}

export default ScoreDetails;
