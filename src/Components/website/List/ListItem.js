import React from "react";
import Button from "../Form/Button";

class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            headlineCardHeader: props.headlineCardHeader,
            headline1: props.headline1,
            headline2: props.headline2,
            info1: props.info1,
            info2: props.info2,
            info3: props.info3,
        };
    }

    render() {
        return (
            <div className="mt-4 border m-3 border-gray-300 rounded-b-lg rounded-t-lg shadow-xl" key={this.state.key}>
                <div className="">
                    <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex justify-between rounded-t-lg">
                        <div className="text-gray-400">{this.state.headlineCardHeader}</div>
                        <div className="">
                            <Button
                                label="Details"/>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="px-6 py-4">
                            <h3 className="text-3xl font-bold text-amber-950">
                                {this.state.headline1},<br/> {this.state.headline2}
                            </h3>
                        </div>
                        <div className="text-gray-700 text-base px-6 py-4 w-1/2">
                            {this.state.info1}<br/>
                            {this.state.info2}
                            <hr className="w-full"/>
                            <p className="pt-2">
                                {this.state.info3}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                </div>
            </div>
        );
    }

}

export default ListItem