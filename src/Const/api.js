import axios from "axios";
import backendUrl from "./const";
const BASE_URL = backendUrl

const createConfig = (params, contentType) => {
    let token = localStorage.getItem('token')

    let config = {};
    if (params) {
        config["params"] = params;
    }
    if (token) {
        config["headers"] = {"Content-Type": contentType, "Authorization": `Bearer ${token}`};
    }
    return config;
}

const createJsonConfig = (params) => {
    return createConfig(params, "application/json;charset=UTF-8");
}


export const BaseApi = {
    get(url, params) {

        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig(params)

        return axios.get(fullUrl, config).then(response => response.data);
    },
    post(url, params , queryParams) {
        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig(queryParams);

        return axios.post(fullUrl, params, config).then(response => response.data);
    },
    delete(url, params) {
        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig(params);

        return axios.delete(fullUrl, config).then(response => response.data);
    },
    put(url, params) {

        let fullUrl = `${BASE_URL}${url}`;
        let config = createJsonConfig();

        return axios.put(fullUrl, params, config).then(response => response.data);
    },
    getBaseUrl() {
        return BASE_URL;
    }
};
