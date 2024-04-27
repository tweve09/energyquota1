let mqttClient;

window.addEventListener("load", (event) => {
  connectToBroker();
  subscribeToTopic();
});

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const host = "ws://localhost:9001/mqtt";

  const options = {
    keepalive: 60,
    clientId: clientId,
    username: "elementrix",
    password: "210502",
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(host, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // Received message from broker
  mqttClient.on("message", (topic, message, packet) => {
    const data = JSON.parse(message.toString());
    console.log(data.Units);
    document.getElementById("remaining-units").innerText = data.Units;
    console.log("Received Message: " + message.toString());
  });
}

function subscribeToTopic() {
  const topic = "esp32/hello";
  mqttClient.subscribe(topic, { qos: 0 });
  console.log("Subscribe to " + topic);
}

function unsubscribeToTopic() {
  mqttClient.unsubscribe(topic, { qos: 0 });
}
