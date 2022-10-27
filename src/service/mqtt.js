const fetch = require("node-fetch");
const mqtt = require("mqtt");

const URL = "mqtt://eapl.rvce.edu.in:1884";

async function getTopics() {
  try {
    const response = await fetch("http://localhost:8080/device/getTopics", {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
      // body: "{}",
    });
    return await response.json();
  } catch (error) {
    return false;
  }
}

async function saveDataInDatabase(deviceIdtopicsObj) {}

function saveDataFromTopics(deviceIdtopicsObjs) {
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

    for (let i = 0; i < deviceIdtopicsObjs.length; i++) {
      const deviceIdtopicsObj = deviceIdtopicsObjs[i];
      const TOPIC = deviceIdtopicsObj.topic;

      client.subscribe(TOPIC, function (err) {
        if (!err) {
          client.on("message", function (topic, payload, packet) {
            console.log("ON MESSAGE, topic: ", TOPIC);
            // message is Buffer
            console.log(
              `Topic: ${topic}, Message: ${payload.toString()}, QoS: ${
                packet.qos
              }`
            );
            saveDataInDatabase(deviceIdtopicsObj);
            // client.end();
          });
        }
      });
    }
  });
}

module.exports = { getTopics, saveDataFromTopics };
