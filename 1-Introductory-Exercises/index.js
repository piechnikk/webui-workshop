const { HttpServer, WebSocket, WebSocketMessage, LogManager } = require("@aliceo2/web-ui");

const logger = LogManager.getLogger("workshop1");

const HTTP_CONFIG = {
  port: 8080,
};

const JWT_CONFIG = {
  expiration: "30s",
};

const http = new HttpServer(HTTP_CONFIG, JWT_CONFIG);

http.addStaticPath("public");

http.get(
  "/hello",
  (req, res) => {
    res.status(200).json({ message: "Hello World" });
  },
  { public: true }
);

http.get(
  "/token",
  (req, res) => {
    res.status(200).json({ token: http.o2TokenService.generateToken() });
  },
  { public: true }
);

http.get("/secret-hello", (req, res) => {
  res.status(200).json({ message: "Sectet Hello World" });
});

const ws = new WebSocket(http);
ws.bind("hello", (message) => {
  logger.info("Received message: " + message.payload);
  return new WebSocketMessage().setCommand("hello-back").setPayload("hello-message");
});
