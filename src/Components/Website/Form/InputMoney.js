import React from "react";

class InputMoney extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputid: props.id,
            label: props.label
        };
    }

    handleChangeText = (event) => {
        const price = event.target.value;
        this.props.onChange(this.props.id, price);
    }

    render() {
        return (
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                           htmlFor="inline-full-name">
                        {this.state.label}
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id={this.state.inputid}
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                        value={this.props.value}
                        onChange={this.handleChangeText}/>
                </div>
            </div>
        );
    }

}

export default InputMoney;