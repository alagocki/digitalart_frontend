import React from "react";
import Datepicker from "tailwind-datepicker-react";
import {getUser} from "../User/User";
import {fetchToken} from "../Auth";

class InputDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputid: props.id,
            label: props.label,
            show: false,
            selectedDate: '',
        };
    }

    getOptions = () => {
        return {
            title: "Shooting Date",
            autoHide: true,
            todayBtn: false,
            clearBtn: true,
            clearBtnText: "Clear",
            maxDate: new Date("2050-01-01"),
            minDate: new Date("2023-01-01"),
            theme: {
                background: "bg-gray-700 dark:bg-gray-800",
                todayBtn: "",
                clearBtn: "",
                icons: "",
                text: "",
                disabledText: "bg-red-500",
                input: "",
                inputIcon: "",
                selected: "",
            },
            icons: {
                // () => ReactElement | JSX.Element
                prev: () => <span>Previous</span>,
                next: () => <span>Next</span>,
            },
            datepickerClassNames: "top-1",
            defaultDate: '',
            language: "de",
            disabledDates: [],
            weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            inputNameProp: "date",
            inputIdProp: "date",
            inputPlaceholderProp: "Select Date",
            inputDateFormatProp: {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            }
        }
    }

    getToday = () => {
        return new Date(Date.now()).toLocaleDateString("de-DE")
    }

    handleChange = (event) => {
        // setSelectedDate(selectedDate)
        const dateTime = event.toLocaleDateString('de-DE');
        this.setState({
            selectedDate: dateTime
        })

        // make Timestamp
        const [d, m, y] = dateTime.split('.');
        const date = new Date(y, m - 1, d);
        this.props.onChange(this.props.id, this.getFormatedDateString(date));
    }

    getFormatedDateString(timestamp = null) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).substring(-2);
        var day = ("0" + date.getDate()).substring(-2);
        var hour = ("0" + date.getHours()).substring(-2);
        var minutes = ("0" + date.getMinutes()).substring(-2);
        var seconds = ("0" + date.getSeconds()).substring(-2);

        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    componentDidMount() {
        this.setState({
            selectedDate: this.getToday()
        });
    }

    render() {
        return (
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                           htmlFor="inline-full-name">
                        Date
                    </label>
                </div>
                <div className="md:w-2/3">
                    <Datepicker options={this.getOptions()} onChange={this.handleChange} show={this.state.show}
                                setShow={this.handleClose}>
                        <div
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                            <input type="text"
                                   className="bg-gray-200 appearance-none rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                   placeholder="Select Date" value={this.state.selectedDate}
                                   onFocus={this.handleShow} readOnly/>
                        </div>
                    </Datepicker>
                </div>
            </div>
        )
    }

}

export default InputDatePicker;