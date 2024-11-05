import { BaseApi } from "../Const/api";
import { apiRoutes } from "../Const/apiroute";

export const Admin = {
    Users(params) {
        return BaseApi.get(apiRoutes.Admin.getUsers, { params });
    },
    UsersCount(params) {
        return BaseApi.get(apiRoutes.Admin.UsersCount, { ...params });
    },
    BanUser(data) {
        return BaseApi.post(apiRoutes.Admin.banUser, data);
    },
    UnBanUser(userId) {
        return BaseApi.post(`${apiRoutes.Admin.unBanUser}${userId}`);
    },
    BlockedUsersCount(params) {
        return BaseApi.get(apiRoutes.Admin.BlockedUsersCount, { params });
    },
    ApproveForm(id) {
        return BaseApi.post(`${apiRoutes.Admin.approveForm}${id}`);
    },
    UnAprovedFormsCount(params) {
        return BaseApi.get(apiRoutes.Admin.unAprovedFormsCount, { params });
    },
    GetAllForms(params) {
        return BaseApi.get(apiRoutes.Admin.getAllForms, { params });
    },
    GetAllFormsCount(params) {
        return BaseApi.get(apiRoutes.Admin.getAllFormsCount, { params });
    },
    SetPremium(userId) {
        return BaseApi.post(`${apiRoutes.Admin.setPremium}${userId}`);
    },
    RemovePremium(userId) {
        return BaseApi.post(`${apiRoutes.Admin.removePremium}${userId}`);
    },
    UpdateRequestCount(params) {
        return BaseApi.put(apiRoutes.Admin.updateRequestCount, params);
    },
    DeleteUser(userId) {
        return BaseApi.delete(`${apiRoutes.Admin.DeleteUser}${userId}`);
    }
};
