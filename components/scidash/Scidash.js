import React from 'react';

import HeaderContainer from '../page/header/HeaderContainer';
import FooterContainer from '../page/footer/FooterContainer';
import Content from '../page/content/ContentContainer';


export default class Scidash extends React.Component {

    render() {

        return (
            <div className="mainContainer">
                <HeaderContainer />
                <div className="midContainer">
                    <div className="row">
                        <div className="col-md-12">
                            <Content />
                        </div>
                    </div>
                </div>
                <FooterContainer />
            </div>
        )
    }
}
