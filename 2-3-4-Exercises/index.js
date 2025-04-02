const path = require("path");
const config = require("./config.js");

const { HttpServer, WebSocket, WebSocketMessage } = require("@aliceo2/web-ui");

const http = new HttpServer(config.http, config.jwt, config.oAuth);
http.addStaticPath(path.join(__dirname, "public"));

http.get("/info", (req, res) => {
  res.json({
    name: "Workshop",
    version: "1.0.0",
  });
});

const ws = new WebSocket(http);

ws.bind("ws", () => new WebSocketMessage().setCommand("ws").setPayload({ number: (Math.random() * 100).toFixed(0) }));

setInterval(() => {
  ws.broadcast(new WebSocketMessage().setCommand("ws").setPayload({ number: (Math.random() * 100).toFixed(0) }));
}, 5000);
