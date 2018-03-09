define(function (require) {

    var React = require('react');

    var Home = require('./home/Home').Home;

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
                                <Home />
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            );
        }
    };

});
