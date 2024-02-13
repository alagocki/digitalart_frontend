import React, {useState} from 'react';
import UserUtils from "../User/UserUtils";
import {getCurrentPath} from "./NaviHelper";
import {Link} from "react-router-dom"

const SubnaviBackendStandard = (props) => {

    const [dataType] = useState(props.type);
    const [subType] = useState(props.sub);

    const createLink = (target) => {
        const href = "/backend/" + dataType + "/" + target.string;
        return (
            <Link to={href}
                  className="text-xs hover:text-cyan-500 bg-white  p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg w-20 text-center">{target.string.toUpperCase()}</Link>
        )
    }

    const getSubType = () => {
        return subType;
    }

    const getSubnaviBackend = () => {

        return (
            <div className="top-0 z-10 w-full">
                <div className="flex justify-end">
                    <nav className="bg-transparent md:flex md:items-center flex md:justify-between">
                        <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-0 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                            {(UserUtils.isSuperUser()) ?
                                <li className={(getCurrentPath().includes(dataType + '/create')) ? "md:my-0 p-0 ml-0.5 flex text-blue-500 font-medium" : "md:my-0 p-0 ml-0.5 flex"}>
                                    {createLink({string: "create"})}
                                </li> : null}
                            <li className={(getCurrentPath().includes(dataType + '/list')) ? "md:my-0 p-0 ml-0.5 flex text-blue-500 font-medium" : "md:my-0 p-0 ml-0.5 flex"}>
                                {createLink({string: "list"})}
                            </li>
                            {(undefined !== getSubType() && null !== getSubType()) ?
                                <li className={(getCurrentPath().includes(dataType + '/detail')) ? "md:my-0 p-0 ml-0.5 flex text-blue-500 font-medium " : "md:my-0 p-0 ml-0.5 flex"}>
                                    <span
                                        className="text-xs hover:text-cyan-500 bg-white  p-1.5 rounded-t-lg rounded-r-lg rounded-b-lg rounded-l-lg w-20 text-center">{getSubType().toUpperCase()}</span>
                                </li> : null}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }

    return (
        <div>
            {getSubnaviBackend()}
        </div>
    )

}

export default SubnaviBackendStandard;