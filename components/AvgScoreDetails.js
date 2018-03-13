import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import Helper from '../common/Helper';
import ModelDetails from './ModelDetails';

export default class ScoreDetails extends React.Component {

    constructor(props, context){
        super(props, context);

        this.helper = new Helper();

        this.props = props;

        this.state = {
        }
    }

    render(){
        return (
            <Card>
            <CardText>
                Avg Score Details
            </CardText>
            </Card>
        );

    }
}

