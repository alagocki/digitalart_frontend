import {useLocation} from "react-router-dom";
import React from "react";


class Breadcrumb extends React.Component {


    getCurrentPath = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const location = useLocation()

        console.log(location.pathname);
        return location.pathname
    }

    render() {
        return (
            <div className="breadcrumb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h1>{this.getCurrentPath()}</h1>
                                {/*<ul>*/}
                                {/*    <li><a href="/">Home</a></li>*/}
                                {/*    <li>User</li>*/}
                                {/*</ul>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;