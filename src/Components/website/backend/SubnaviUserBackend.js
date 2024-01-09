import React, {useState} from 'react';
import {getUser, removeUser} from "../User/User";


class SubnaviUserBackend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    getSubnaviUserBackend = () => {
        return (
            <div className="top-0 z-10 w-full">
                <div className="flex justify-end">
                    <nav className="bg-transparent md:flex md:items-center flex md:justify-between">
                        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-0 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                            {this.state.user.is_superuser === true ?
                                <li className="md:my-0 p-2 ml-0.5 flex"><a href="/backend/user/create"
                                                                           className="text-sm hover:text-cyan-500 text-blue-950 duration-500 bg-gray-200 p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg w-20 text-center">Create</a>
                                </li> : null}
                            <li className="md:my-0 p-2 ml-0.5 flex">
                                <a href="#"
                                   className="text-sm hover:text-cyan-500 text-blue-950 duration-500 bg-gray-200 p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg w-20 text-center">List</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            user: getUser()
        });
    }

    render() {
        return (
            <div>
                {this.getSubnaviUserBackend()}
            </div>
        );
    }

}

export default SubnaviUserBackend;