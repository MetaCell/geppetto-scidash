import React from "react";
import Helper from "../../../common/Helper";
import $ from "jquery";

export default class ScidashModelDetailLinkColumn extends React.Component {
    constructor(props, context){
        super(props, context)
        this.props = props;
        this.helper = new Helper();
    }

    componentDidMount(){
        // sad fix for weird React lifecycle bug :(,
        // pls, someone, check how it works without setTimeout from time to time
        setTimeout(() => $(".build-info-cell").tooltip(), 400)
    }

    render(){
        let buildInfoRegex = /(.+)(\/)(\w+)/;
        let buildInfoResult = null;
        let iconClass = "";

        if (buildInfoRegex.test(this.props.value)){
            buildInfoResult = buildInfoRegex.exec(this.props.value)
            iconClass = this.helper.getOSIconClass(buildInfoResult[3])
        }

        return (
            <div className="build-info-cell" title={this.props.value}>
                <i className={`fa ${iconClass}`}></i> {this.props.value}
            </div>
        )
    }
}
