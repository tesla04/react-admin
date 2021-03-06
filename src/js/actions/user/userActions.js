"use strict";

// Vendor modules
import Request                        from "superagent";

// Project modules
import ClientDispatcher               from "../../dispatcher/clientDispatcher";
import userConstants                  from "../../constants/user/userConstants";

// login('gonto', 'gonto');
export function login(username, password){
  let data = {
    username: username,
    password: password
  }
  Request
    .post(userConstants.LOGIN_URL)
    .accept('application/json')
    .type('application/json')
    .send(data)
    .end((err, res) => {
      if(res.body.hasError){
        ClientDispatcher.dispatch({
          actionType: userConstants.ERROR_LOGIN,
          data: res.body
        });
      } else {
        ClientDispatcher.dispatch({
          actionType: userConstants.DONE_LOGIN,
          data: res.body
        });
      }
    });
}

export function logout(){
  ClientDispatcher.dispatch({
    actionType: userConstants.LOGOUT,
  });
}

