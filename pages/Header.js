define(function (require) {

    var React = require('react');

    var header = React.createClass({
    	
    	render() {
            return (

                <div id="header">
                    <h1>This is the header</h1>
                </div>

                
            );
        }
    });

    return header;
});
