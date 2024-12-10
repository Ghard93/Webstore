import httpCommon from './http-common';

class AccountDataServices {

    getAccount(email, data) {
        return httpCommon.get(`/accounts/account?email=${email}&password=${data}`);
    }

    postAccount(data) {
        return httpCommon.post('/accounts/account', data);
    }

    putOrder(data, email) {
        return httpCommon.put(`/accounts/placeorder?email=${email}`, data);
    }

    updateAccountDetails(email, data) {
        return httpCommon.put(`/accounts/accountupdate?email=${email}`, data);
    }

    changePassword(email, data) {
        return httpCommon.put(`accounts/changepassword?email=${email}`, data);
    }

    deleteAccount(email, pass) {
        return httpCommon.delete(`accounts/deleteaccount?email=${email}&password=${pass}`)
    }
}

const accountService = new AccountDataServices();
export default accountService;