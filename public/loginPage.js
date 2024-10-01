'use strict';

const formForUser = new userForm();

userForm.loginFormCallback = ({login, password}) => {
    ApiConnector.login({login, password}, (data) => {
        if (data.success) {   
            location.reload();
        } else {
            userForm.setLoginErrorMessage(data.error);    
        };
    });
};

userForm.registerFormCallback = ({login, password}) =>
    ApiConnector.register({login, password}, (data) => {
        if (data.success) {   
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(data.error);     
        };
    });