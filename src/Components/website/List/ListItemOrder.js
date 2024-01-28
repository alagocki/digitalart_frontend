import React from "react";
import Button from "../Form/Button";

class ListItemOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            email: props.email,
            forename: props.forename,
            lastname: props.lastname,
            info: props.info,
            status: props.status,
            topic: props.topic
        };
    }

    render() {
        return (
            <div className="mt-4 border m-3 border-gray-300 rounded-b-lg rounded-t-lg shadow-xl"
                 key={this.state.id}>
                <div className="">
                    <div className="text-gray-400 text-xl mb-2 bg-gray-300 px-6 py-4 flex justify-between rounded-t-lg">
                        <div className="text-gray-400">{this.state.topic}</div>
                        <div className="">
                            <Button
                                label="Details"/>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="px-6 py-4">
                            <h3 className="text-3xl font-bold text-amber-950">
                                {this.state.lastname},<br/> {this.state.forename}
                            </h3>
                        </div>
                        <p className="text-gray-700 text-base px-6 py-4">
                            {this.state.info}<br/>
                            {this.state.status}
                        </p>
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

export default ListItemOrder