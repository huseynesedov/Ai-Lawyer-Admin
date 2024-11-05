import { BaseApi } from "../Const/api";
import { apiRoutes } from "../Const/apiroute";


export const AccountApi = {
    Login(data) {
        return BaseApi.post(apiRoutes.Auth.login, data);
    },
    Edit(data) {
        return BaseApi.put(apiRoutes.Auth.edit, data);
    },
};