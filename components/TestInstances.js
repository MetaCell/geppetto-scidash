import React, { Component } from 'react';


export default class TestInstances extends React.Component {

    constructor(props) {
        super(props);
        this.rows = [];
        this._columns = [
            {key: 'id', name: 'ID'},
            {key: 'hostname', name: 'Hostname'}
        ];
    }

    rowGetter (i) {
        return this.rows[i];
    };

    componentDidMount() {
        this.Init();
    }

    Init() {
    }

    render() {
        return (
            <div>
            Hello
            </div>
        )
    }
};
