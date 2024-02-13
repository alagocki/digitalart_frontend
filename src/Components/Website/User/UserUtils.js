import {url as api_url} from "../Constants";
import {fetchToken} from "../Auth";
import axios from "axios";

class UserUtils {

    static errorHandler(error) {
        throw new Error('ERROR: ' + error);
    }

    static setUser = async () => {
        const user = await this.getUserFromApi();
        localStorage.setItem('user', JSON.stringify(user.data))
    }

    static getAllUser = () => {
        try {
            return this.getAllUserFromApi();
        } catch (error) {
            this.errorHandler(error);
        }
    }

    static getUser = () => {
        return JSON.parse(localStorage.getItem('user')) || null
    }

    static removeUser = () => {
        localStorage.removeItem('user');
    }

    static getUserFromApi = async () => {

        let url = api_url + 'user/single';
        let token = fetchToken();
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            // use data destructuring to get data from the promise object
            const {data: response} = await axios.get(url, options);
            return response; // <- promise
        } catch (error) {
            throw new Error(error);
        }
    }

    static getAllUserFromApi = async () => {
        let url = api_url + 'user/all';
        let token = fetchToken();
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            const {data: response} = await axios.get(url, options);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    static isSuperUser = () => {
        const user = this.getUser();
        return user.is_superuser === true;
    }

    static prepareDataUser = (res) => {
        let preparedlistData = [];
        // eslint-disable-next-line array-callback-return
        res.map((data) => {
            // eslint-disable-next-line array-callback-return
            Object.keys(data).map((key) => {
                let pld = {
                    id: data[key]['id'],
                    headlineCardHeader: data[key]['email'],
                    headline2: data[key]['forename'],
                    headline1: data[key]['lastname'],
                    info1: data[key]['street'] + ' ' + data[key]['number'],
                    info2: data[key]['zip'] + ' ' + data[key]['city'],
                    info3: ''
                }
                preparedlistData.push(pld);
            });
        });
        return preparedlistData;
    }

}

export default UserUtils;