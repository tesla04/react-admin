'use strict';

let BASE_URL = 'http://localhost:3000/api/';

export default {
  BASE_URL: BASE_URL,
  CREATE_TEACHER_EVENT: 'CREATE_TEACHER_EVENT',
  READ_TEACHER_EVENT: 'READ_TEACHER_EVENT',
  UPDATE_TEACHER_EVENT: 'UPDATE_TEACHER_EVENT',
  DELETE_TEACHER_EVENT: 'DELETE_TEACHER_EVENT',
  LIST_TEACHER_EVENT: 'LIST_TEACHER_EVENT',

  // trigger when success or errors
  SAVED_TEACHER_EVENT: 'SAVED_TEACHER_EVENT',
  DELETED_TEACHER_EVENT: 'DELETED_TEACHER_EVENT',
  ERROR_SAVE_TEACHER_EVENT: 'ERROR_SAVE_TEACHER_EVENT',
  ERROR_DELETE_TEACHER_EVENT: 'ERROR_DELETE_TEACHER_EVENT'
};