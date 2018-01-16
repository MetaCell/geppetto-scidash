define(function (require) {

    var React = require('react');

    var header = React.createClass({

        render() {
            return (

                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                SciDash
                            </a>
                        </div>
                    </div>
                </nav>

            );
        }
    });

    return header;
});
