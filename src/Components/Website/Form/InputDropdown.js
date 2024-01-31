import React from "react";

class InputDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputid: props.id,
            label: props.label,
            dropdown: props.items,
        };

    }

    componentDidMount() {
        //proops.items comes from API for User
        this.getDataForOption(this.props.items);
    }


    getDataForOption = (items) => {
        const timer = setTimeout(() => {
            this.setState({dropdown: items});
        }, 500);
        return () => clearTimeout(timer);
    }

    handleChangeDropdown = (event) => {
        const text = event.target.value;
        this.props.onChange(this.props.id, text);
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
                    <select
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                        id={this.state.inputid}
                        value={this.props.value}
                        onChange={this.handleChangeDropdown}>
                        <option value="">Please Select...</option>
                        {this.state.dropdown.items.map((item, index) => (
                            <option key={index} value={Object.keys(item)}>{Object.values(item)}</option>
                        ))};
                    </select>
                </div>
            </div>
        );
    }

}

export default InputDropdown;