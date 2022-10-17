"use strict"
let user = new UserForm();

user.loginFormCallback = function (data) {
    ApiConnector.login(data, res => {
        if (res.success) {
            location.reload();
        }
        if (res.error) {
            this.setLoginErrorMessage(res.error);
        }
    })
};
user.registerFormCallback = function (data) {
    ApiConnector.register(data, res => {
        if (res.success) {
            location.reload();
        }
        if (res.error) {
            this.setLoginErrorMessage(res.error);
        }
    })
};

