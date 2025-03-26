import { WebSocketClient, sessionService } from "/js/src/index.js";

sessionService.loadAndHideParameters();

const ws = new WebSocketClient();

ws.addListener("authed", () => {
  console.log("authed");
  ws.sendMessage({ command: "hello", payload: "hello world" });
});

ws.addListener("command", (message) => {
  console.log("Received message");
  if (message.command === "hello-back") {
    console.log("received response: ", message.payload);
  }
});
