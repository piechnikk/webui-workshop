import About from "./pages/about/About.js";
import Home from "./pages/home/Home.js";
import { Loader, Observable, QueryRouter, sessionService, WebSocketClient } from "/js/src/index.js";

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export default class Model extends Observable {
  /**
   * Load all sub-models and bind event handlers
   */
  constructor() {
    super();

    this.session = sessionService.get();
    this.session.personid = parseInt(this.session.personid, 10);

    this.loader = new Loader(this);
    this.loader.bubbleTo(this);

    // Setup router
    this.router = new QueryRouter();
    this.router.observe(this.handleLocationChange.bind(this));
    this.router.bubbleTo(this);

    this.home = new Home(this);
    this.home.bubbleTo(this);

    this.about = new About(this);
    this.about.bubbleTo(this);

    this.number = 0;

    this.setupWebSocket();

    this.handleLocationChange(); // Init first page
  }

  /**
   * Setup websocket connection
   */
  setupWebSocket() {
    this.ws = new WebSocketClient();
    this.ws.addListener("authed", () => {
      this.ws.sendMessage({ command: "ws" });
    });

    this.ws.addListener("command", (message) => {
      if (message.command === "ws") {
        this.setNumber(message.payload.number);
      }
    });
  }

  setNumber(number) {
    this.number = number;
    this.notify();
  }

  /**
   * Delegates sub-model actions depending on new location of the page
   */
  handleLocationChange() {
    switch (this.router.params.page) {
      case "home":
        break;
      case "about":
        break;
      default:
        this.router.go("?page=home");
        break;
    }
  }
}
