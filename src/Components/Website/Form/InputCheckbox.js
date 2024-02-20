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
            <div className="md:flex justify-end mt-2">
                <div className="md:w-full flex justify-end">
                    <label
                        className="block text-gray-500 font-bold md:text-right"
                        htmlFor="inline-full-name">
                        {this.state.label}
                        &nbsp;&nbsp;
                    <input
                        className="shadow bg-purple-500 hover:bg-purple-400 focus:outline-none text-white font-bold rounded"
                        type="checkbox"
                        checked={this.state.checked}
                        onClick={this.handleChangeCheckbox}/>
                    </label>
                </div>
            </div>
        )
            ;
    }

}

export default InputCheckbox;