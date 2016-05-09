"use strict";

// Flux CourseNameStore
import AppDispatcher                  from '../dispatcher/clientDispatcher';
import CourseNameConstants            from '../constants/courseNameConstants';
import { EventEmitter }               from 'events';

const { LIST_COURSE_NAME_EVENT,
        CREATE_COURSE_NAME_EVENT,
        SAVED_COURSE_NAME_EVENT,
        READ_COURSE_NAME_EVENT,
        SAVE_COURSE_NAME_EVENT,
        ERROR_SAVE_COURSE_NAME_EVENT } = CourseNameConstants;



// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class CourseNameStoreClass extends EventEmitter {

  constructor() {
    super();
    this.courseNames = [];
    this.courseName = {};
    this.errors = {};
  }

  /* 
   * public methods
   */
  setCourseNames(courseNames){
    this.courseNames = courseNames;
  }

  setCourseName(courseName){
    this.courseName = courseName;
  }

  setErrors(errors){
    this.errors = errors;
  }  

  getCourseNames(){
    return this.courseNames;
  }

  getCourseName(){
    return this.courseName;
  }

  getErrors(){
    return this.errors;
  }
  // new(){
  //   return {
  //     id: null,
  //     title: null
  //   }
  // }

  list(){
    this.emitList();
  }

  /*
   CRUD operations
   */
  create(todo) {
    console.log("creating a todo");
    todo.id = _todos.length + 1;
    _todos.push(todo);
    this.emitList(todo);
  }

  update(todo) {
    var index = this.find(todo.id);
    todo.id = parseInt(todo.id);
    if(index === undefined) return this.triggerFailToTakeAction();
    _todos[index] = todo;
    this.emitList();
  }

  delete(id) {
    var index = this.find(id);
    if(index === undefined) return this.triggerFailToTakeAction();
    _todos.splice(index, 1);
    this.emitList();
  }

  find(id) {
    var id = parseInt(id);
    var found = undefined;
    _todos.some(function(todo, i) {
      if(todo.id === id) found = i;
    });
    return found;
  }


  /*
   * LIST
   */
  addListListener(cb) {
    this.on(LIST_COURSE_NAME_EVENT, cb);
  }
  removeListListener(cb) {
    this.removeListener(LIST_COURSE_NAME_EVENT, cb);
  }
  emitList(){
    this.emit(LIST_COURSE_NAME_EVENT);
  }


  /*
   * Create
   */
  addCreateListener(cb) {
    this.on(CREATE_COURSE_NAME_EVENT, cb);
  }
  removeCreateListener(cb) {
    this.removeCreateListener(CREATE_COURSE_NAME_EVENT, cb);
  }
  emitCreate(){
    this.emit(CREATE_COURSE_NAME_EVENT);
  }


  /*
   * Read
   */
  addReadListener(cb) {
    this.on(READ_COURSE_NAME_EVENT, cb);
  }
  removeReadListener(cb) {
    this.removeReadListener(READ_COURSE_NAME_EVENT, cb);
  }
  emitRead(){
    this.emit(READ_COURSE_NAME_EVENT);
  }



  /*
   * Saved
   */
  addSavedListener(cb) {
    this.on(SAVED_COURSE_NAME_EVENT, cb);
  }
  removeSavedListener(cb) {
    this.removeReadListener(SAVED_COURSE_NAME_EVENT, cb);
  }
  emitSaved(){
    this.emit(SAVED_COURSE_NAME_EVENT);
  }

  /*
   * Error
   */
  addErrorListener(cb) {
    this.on(ERROR_SAVE_COURSE_NAME_EVENT, cb);
  }
  removeErrorListener(cb) {
    this.removeReadListener(ERROR_SAVE_COURSE_NAME_EVENT, cb);
  }
  emitError(){
    this.emit(ERROR_SAVE_COURSE_NAME_EVENT);
  }

}



// Initialize the singleton to register with the
// dispatcher and export for React components
const courseNameStore = new CourseNameStoreClass();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {
  switch (payload.actionType) {

  case CourseNameConstants.LIST_COURSE_NAME_EVENT:
    courseNameStore.setCourseNames(payload.courseNames);
    courseNameStore.emitList();
    break;

  case CourseNameConstants.CREATE_COURSE_NAME_EVENT:
    courseNameStore.setCourseName(payload.courseName);
    courseNameStore.emitSaved();
    break;

  case CourseNameConstants.SAVE_COURSE_NAME_EVENT:
    courseNameStore.setCourseName(payload.courseName);
    courseNameStore.emitSaved();
    break;

  case CourseNameConstants.ERROR_SAVE_COURSE_NAME_EVENT:
    courseNameStore.setErrors(payload.errors);
    courseNameStore.emitError();
    break;

  default:
    return true;
  }
});

export default courseNameStore;
