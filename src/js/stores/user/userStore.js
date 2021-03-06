"use strict";
import jwt_decode                     from 'jwt-decode';

// Flux CourseStore
import AppDispatcher                  from '../../dispatcher/clientDispatcher';
import UserConstants                  from '../../constants/user/userConstants';
import { EventEmitter }               from 'events';

const {CHANGE_EVENT, ERROR_EVENT} = UserConstants;


// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class UserStoreClass extends EventEmitter {

  constructor() {
    super();
    this.data = null;
    this.token = null;
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  emitChange(){
    this.emit(CHANGE_EVENT);
  }

  doneUser(data){
    this.data = data;
    this.token = data.id_token;

    // save token into local storage
    localStorage.setItem('token', this.token)
  }

  errorUser(data){
    this.data = data;
  }

  logout(){
    this.data = null;
    this.token = null;
    // remove token into local storage
    localStorage.removeItem('token');
  }


  getData(){
    return this.data;
  }

  getUser(){
    let token = localStorage.getItem('token');
    if(!!token){
      return jwt_decode(token).username;
    }    
  }

  _getToken(){
    if(!!localStorage.getItem('token')){
      return localStorage.getItem('token');
    }
    else{
      return this.token;
    }
  }
  getToken(){
    return this._getToken();
  }
  isLoggedIn(){
    return !!this._getToken();
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const userStore = new UserStoreClass();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {
  switch (payload.actionType) {

  case UserConstants.DONE_LOGIN:
    userStore.doneUser(payload.data);
    userStore.emit(CHANGE_EVENT);
    break;

  case UserConstants.ERROR_LOGIN:
    userStore.errorUser(payload.data);
    userStore.emit(ERROR_EVENT);
    break;

  case UserConstants.LOGOUT:
    userStore.logout();
    userStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default userStore;
