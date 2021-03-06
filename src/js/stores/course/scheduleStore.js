"use strict";

// Flux ScheduleStore
import AppDispatcher                  from '../../dispatcher/clientDispatcher';
import ScheduleConstants               from '../../constants/course/scheduleConstants';
import { EventEmitter }               from 'events';

const { LIST_SCHEDULE_EVENT,
        CREATE_SCHEDULE_EVENT,
        SAVED_SCHEDULE_EVENT,
        READ_SCHEDULE_EVENT,
        SAVE_SCHEDULE_EVENT,

        DELETED_SCHEDULE_EVENT,
        ERROR_SAVE_SCHEDULE_EVENT,
        ERROR_DELETE_SCHEDULE_EVENT } = ScheduleConstants;



// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class ScheduleStoreClass extends EventEmitter {

  constructor() {
    super();
    this.schedules = [];
    this.schedule = {};
    this.errors = {};
  }

  /* 
   * public methods
   */
  setSchedules(schedules){
    this.schedules = schedules;
  }

  setSchedule(schedule){
    this.schedule = schedule;
  }

  setErrors(errors){
    this.errors = errors;
  }  

  getSchedules(){
    return this.schedules;
  }

  getSchedule(){
    return this.schedule;
  }

  getErrors(){
    return this.errors;
  }

  /*
   * LIST
   */
  addListListener(cb) {
    this.on(LIST_SCHEDULE_EVENT, cb);
  }
  removeListListener(cb) {
    this.removeListener(LIST_SCHEDULE_EVENT, cb);
  }
  emitList(){
    this.emit(LIST_SCHEDULE_EVENT);
  }


  /*
   * Create
   */
  addCreateListener(cb) {
    this.on(CREATE_SCHEDULE_EVENT, cb);
  }
  removeCreateListener(cb) {
    this.removeCreateListener(CREATE_SCHEDULE_EVENT, cb);
  }
  emitCreate(){
    this.emit(CREATE_SCHEDULE_EVENT);
  }


  /*
   * Read
   */
  addReadListener(cb) {
    this.on(READ_SCHEDULE_EVENT, cb);
  }
  removeReadListener(cb) {
    this.removeListener(READ_SCHEDULE_EVENT, cb);
  }
  emitRead(){
    this.emit(READ_SCHEDULE_EVENT);
  }

  /*
   * Saved
   */
  addSavedListener(cb) {
    this.on(SAVED_SCHEDULE_EVENT, cb);
  }
  removeSavedListener(cb) {
    this.removeListener(SAVED_SCHEDULE_EVENT, cb);
  }
  emitSaved(){
    this.emit(SAVED_SCHEDULE_EVENT);
  }

  /*
   * Deleted
   */
  addDeletedListener(cb) {
    this.on(DELETED_SCHEDULE_EVENT, cb);
  }
  removeDeletedListener(cb) {
    this.removeListener(DELETED_SCHEDULE_EVENT, cb);
  }
  emitDeleted(){
    this.emit(DELETED_SCHEDULE_EVENT);
  }

  /*
   * Error
   */
  addErrorListener(cb) {
    this.on(ERROR_SAVE_SCHEDULE_EVENT, cb);
  }
  removeErrorListener(cb) {
    this.removeListener(ERROR_SAVE_SCHEDULE_EVENT, cb);
  }
  emitError(){
    this.emit(ERROR_SAVE_SCHEDULE_EVENT);
  }

}



// Initialize the singleton to register with the
// dispatcher and export for React components
const scheduleStore = new ScheduleStoreClass();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {
  switch (payload.actionType) {

  case ScheduleConstants.LIST_SCHEDULE_EVENT:
    scheduleStore.setSchedules(payload.schedules);
    scheduleStore.emitList();
    break;

  case ScheduleConstants.CREATE_SCHEDULE_EVENT:
    scheduleStore.setSchedule(payload.schedule);
    scheduleStore.emitSaved();
    break;

  case ScheduleConstants.SAVE_SCHEDULE_EVENT:
    scheduleStore.setSchedule(payload.schedule);
    scheduleStore.emitSaved();
    break;

  case ScheduleConstants.DELETE_SCHEDULE_EVENT:
    scheduleStore.setSchedule({});
    scheduleStore.emitDeleted();
    break;

  case ScheduleConstants.ERROR_SAVE_SCHEDULE_EVENT:
    scheduleStore.setErrors(payload.errors);
    scheduleStore.emitError();
    break;

  default:
    return true;
  }
});

export default scheduleStore;
