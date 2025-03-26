import { Observable } from "/js/src/index.js";

export default class Home extends Observable {
  constructor(model) {
    super();
    this.username = model.session.username;
  }

  getUserName() {
    return this.username;
  }

  setUserName(username) {
    this.username = username;
    this.notify();
  }
}
