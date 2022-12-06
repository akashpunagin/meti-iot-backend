const axios = require("axios");
const mqtt = require("mqtt");
require("dotenv").config();

const MQTT_URL = process.env.MQTT_URL;
const MQTT_PORT = process.env.MQTT_PORT;
const BASE_URL = process.env.BASE_URL;
const MQTT_CLIENT_ID = process.env.MQTT_CLIENT_ID;
const MQTT_CLIENT_PASSWORD = process.env.MQTT_CLIENT_PASSWORD;
const MQTT_CLIENT_USERNAME = process.env.MQTT_CLIENT_USERNAME;

async function getTopics() {
  try {
    const response = await axios.get(`${BASE_URL}/device/getTopics`);
    return response.data;
  } catch (error) {
    console.log("GET TOPICS ERROR:", error);
    return false;
  }
}

async function saveDataInDatabase(deviceIdtopicsObj, payload) {
  // const sampleOutput = [
  //   {
  //     meter_idx: 0,
  //     ts: 1666848445,
  //     ts_reg: 1666868245,
  //     sensors: [
  //       { idx: 0, val: 53.65 },
  //       { idx: 1, val: 230.91 },
  //       { idx: 2, val: 0 },
  //       { idx: 3, val: 0 },
  //       { idx: 4, val: 230.91 },
  //       { idx: 5, val: 0 },
  //       { idx: 6, val: 230.91 },
  //     ],
  //   },
  // ];

  for (const data of payload) {
    for (const sensor of data.sensors) {
      const reqBody = {
        device_id: deviceIdtopicsObj.deviceId,
        sensor_idx: sensor.idx,
        value: sensor.val,
      };

      const response = await fetch(`${BASE_URL}/sensorValue/addData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const res = await response.json();
      console.log("ADD RES DATA: ", res);
    }
  }
}

function saveDataFromTopics(deviceIdtopicsObjs) {
  const URL = `${MQTT_URL}:${MQTT_PORT}`;

  const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Auth
    clientId: MQTT_CLIENT_ID,
    username: MQTT_CLIENT_USERNAME,
    password: MQTT_CLIENT_PASSWORD,
  };

  console.log("SAVE DATA FROM TOPICS: ", URL, options);

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
            saveDataInDatabase(
              deviceIdtopicsObj,
              JSON.parse(payload.toString())
            );
            // client.end();
          });
        }
      });
    }
  });
}

module.exports = { getTopics, saveDataFromTopics };
