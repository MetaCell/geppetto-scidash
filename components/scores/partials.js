import React from 'react';
import Helper from "../../shared/Helper";
import $ from "jquery";

const CustomScoreName = ({value}) => <div style={{paddingRight:"20px"}}>{value}</div>;

class ScidashBuildInfoColumn extends React.Component {

    constructor(props, context){
        super(props, context)
        this.props = props;
        this.helper = new Helper();
    }

    componentDidMount(){
        if (this.props.value != " ")
            $(".build-info-cell").tooltip()
    }

    render(){
        let parsedBuildInfo = this.helper.parseBuildInfo(this.props.value);

        return (
            <div className="build-info-cell" title={this.props.value}>
                <i className={`fa ${parsedBuildInfo.icon}`}></i> {this.props.value}
            </div>
        )
    }
}

class ScidashTimestampColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
    }

    componentDidMount(){
        if (this.props.value != " ")
            $(".timestamp-cell").tooltip()
    }

    render(){
        if(this.props.value != " ")
            return (<div className="timestamp-cell" style={{textAlign: "center"}} title={this.props.value.get("full")}>{this.props.value.get("short")}</div>)

        return (<span></span>)
    }
}

export {
    CustomScoreName,
    ScidashBuildInfoColumn,
    ScidashTimestampColumn
}
