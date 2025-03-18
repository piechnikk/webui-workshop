const url = new URL(window.location.href);
const token = url.searchParams.get("token");

let ws = new WebSocket(`ws://localhost:8080?token=${token}`);

ws.onopen = () => {
  console.log("Connected to server");
  ws.send(JSON.stringify({ command: "hello", payload: "hello world", token: token }));
};

ws.onmessage = (message) => {
  console.log("Received message: ", message.data);
};
