define(function (require) {

    var React = require('react');
    var Route = require('react-router-dom').Route;

    var Home = require('./home/Home').Home;
    var Other = require('./other/Other');

    var Header = require('./Header');
    var Footer = require('./Footer');

    return class MainTemplate extends React.Component {
        render() {
            return (
                <div className="mainContainer">
                    <Header/>

                    <div className="midContainer">
                        <div className="row">
                            <div className="col-md-12">
                                    <Route path={'/'} component={Home} exact/>
                                    <Route path={'/other'} component={Other} />
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            );
        }
    };

});
