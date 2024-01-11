import React from "react";

class InputCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: props.label
        };

    }

    handleChangeCheckbox = (event) => {
        const checked = event.target.checked;
        this.props.onChange(this.props.id, checked);
    }


    render() {
        return (
            <div className="md:flex md:items-center mb-7">
                <div className="md:w-1/3">
                    <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name">
                        {this.state.label}
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="checkbox"
                        checked={this.state.checked}
                        onClick={this.handleChangeCheckbox}/>
                </div>
            </div>
        )
            ;
    }

}

export default InputCheckbox;