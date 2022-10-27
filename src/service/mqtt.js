const mqtt = require("mqtt");

const URL = "mqtt://eapl.rvce.edu.in:1884";
const TOPIC = "MQI1-90-38-0C-57-58-BC/v2/0/sensor_values";

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: "client1",
  username: "client1",
  password: "client1",
};

const client = mqtt.connect(URL, options);

client.on("connect", function () {
  console.log("CONNECTED");

  client.subscribe(TOPIC, function (err) {
    if (!err) {
      client.on("message", function (topic, payload, packet) {
        console.log("ON MESSAGE");
        // message is Buffer
        console.log(
          `Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`
        );
        // client.end();
      });
    }
  });
});
