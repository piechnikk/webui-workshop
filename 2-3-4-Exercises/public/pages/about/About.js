import { Observable } from "/js/src/index.js";

export default class About extends Observable {
  constructor(model) {
    super();
    this.model = model;
    this.details = {};
    this.requestedTimes = 0;
  }

  getDetails() {
    this.notify();
    this.details[this.requestedTimes] = this.model.session.token;
    this.requestedTimes++;

    return this.details;
  }
  getDetailsWithoutRequest(){
    return this.details;
  }

  getRequestedTimes() {
    return this.requestedTimes;
  }
}
