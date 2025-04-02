import { Loader, Observable, RemoteData } from "/js/src/index.js";

const parseData = (remoteData) =>
  remoteData.match({
    NotAsked: () => "Data has not been fetched from the server",
    Loading: () => "Loading, please wait",
    Success: (details) => details,
    Failure: (error) => `An error has occurred: ${error.message}`,
  });

export default class About extends Observable {
  constructor(model) {
    super();
    this.model = model;
    this.details = parseData(RemoteData.notAsked());
    this.requestedTimes = 0;
    this.loader = new Loader();
  }

  async getDetails() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.details = parseData(RemoteData.loading());
    this.notify();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const { result, ok } = await this.loader.get("/api/info");
      console.log(result);
      console.log(ok);
      this.details = parseData(RemoteData.success(result));
    } catch (error) {
      this.details = parseData(RemoteData.failure(error));
    } finally {
      this.requestedTimes++;
      this.notify();
      return this.details;
    }
  }

  getDetailsWithoutRequest() {
    return this.details;
  }

  getRequestedTimes() {
    return this.requestedTimes;
  }
}
