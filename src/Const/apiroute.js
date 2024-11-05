export const apiRoutes = {
    Admin: {
        getUsers: '/api/admin/get-users',
        UsersCount: '/api/admin/total-user-count',
        banUser: '/api/admin/ban-user',
        unBanUser: '/api/admin/unban-user/',
        BlockedUsersCount: '/api/admin/blocked-user-count',
        approveForm: '/api/admin/ApproveForm/',
        unAprovedFormsCount: '/api/admin/unapproved-forms-count',
        getAllForms: '/api/admin/GetAllForms',
        getAllFormsCount: '/api/admin/GetAllFormsCount',
        setPremium: '/api/admin/set-premium/',
        removePremium: '/api/admin/remove-premium/',
        updateRequestCount: '/api/admin/UpdateRequestCount',       
        DeleteUser: '/api/admin/delete/',       
    },
    Auth: {
        login: '/api/Auth/login',
        edit: '/api/Auth/edit',
    },

};