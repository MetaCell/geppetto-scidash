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
        if (this.props.value != " ")
            $(".build-info-cell").tooltip()
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
