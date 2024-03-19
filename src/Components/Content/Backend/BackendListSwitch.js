import React, {useState} from "react";


import UserUtils from "../../Website/User/UserUtils";
import BackendListAdmin from "./BackendListAdmin";
import BackendListUser from "./BackendListUser";


const BackendListSwitch = (props) => {

    const [dataType] = useState(props.type);

    return (
        <main className="p-20">
            {(UserUtils.isSuperUser()) ? <BackendListAdmin type={dataType}/> : <BackendListUser type={dataType}/>}
        </main>
    );
}


export default BackendListSwitch;