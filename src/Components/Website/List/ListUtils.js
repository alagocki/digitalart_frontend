import ListItem from "../List/ListItem";
import React from "react";

class ListUtils {

    static prepareListDataMultiple = (listData, dataType) => {
        const tmp = [];
        // eslint-disable-next-line array-callback-return
        listData.map((data) => {
            const tmpdata = <ListItem
                id={data['id']}
                key={data['id']}
                headlineCardHeader={data['headlineCardHeader']}
                headline2={data['headline2']}
                headline1={data['headline1']}
                info1={data['info1']}
                info2={data['info2']}
                info3={data['info3']}
                dataType={dataType}
            />
            tmp.push(tmpdata)
        })
        return tmp;
    }

}

export default ListUtils;