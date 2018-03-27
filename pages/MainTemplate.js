import React from 'react';
import Home from './home/Home';
import Header from './Header';
import Footer from './Footer';


export default class MainTemplate extends React.Component {

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
