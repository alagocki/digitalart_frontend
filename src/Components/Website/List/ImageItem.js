import React from "react";

class ImageItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            // key: props.key
            image: props.image,
        };

        // console.log(this.state.image);
    }

    render() {
        return (
            <div className="border m-3 rounded-b-lg rounded-t-lg shadow-gray-300 shadow-xl w-96 border-white"
                 key={this.state.id}>
                <div className="h-80">
                    <div
                        className="text-blue-700 text-xl mb-2 bg-amber-950 px-6 py-4 flex justify-between rounded-t-lg border border-amber-950">
                        <div className="text-white text-xs">{this.state.image.name}</div>
                    </div>
                    <div className="flex justify-center">
                        <div className="px-6 py-4">
                            <img src={this.state.image.base64encoded} alt={this.state.image.name} className="max-h-52"/>
                        </div>

                    </div>
                </div>
                <div className="px-6 pt-4 pb-2 inline-block align-bottom">
                    <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                </div>
            </div>
        );
    }

}

export default ImageItem