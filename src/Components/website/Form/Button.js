import React from "react";

class InputText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: props.label
        };

    }

    handleSubmit = (event) => {
        this.props.onClick(event);
    }

    render() {
        return (
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button
                        className="shadow bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={this.handleSubmit}>
                        {this.state.label}
                    </button>
                </div>
            </div>
        );
    }

}

export default InputText;