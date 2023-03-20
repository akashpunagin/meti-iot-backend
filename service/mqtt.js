const axios = require("axios");
const mqtt = require("mqtt");
require("dotenv").config();

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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

async function saveDataInDatabase(deviceId, payload) {
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
        device_id: deviceId,
        sensor_idx: sensor.idx,
        value: sensor.val,
      };

      const response = await fetch(`${BASE_URL}/sensorValue/addData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const res = await response.json();
      console.log("ADDED TO DATABASE: ", res);
    }
  }
}

let client = null;

function connectMQTTClient() {
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

  return client;
}

function endMQTTClient() {
  client.end();
}

async function saveDataFromTopics(deviceIdtopicsObjs, client) {
  console.log("inside saveDataFromTopics");
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
  client = mqtt.connect(URL, options);
  client.on("connect", async function () {
    console.log("\nCONNECTED TO MQTT");
    for (let i = 0; i < deviceIdtopicsObjs.length; i++) {
      const deviceIdtopicsObj = deviceIdtopicsObjs[i];
      const TOPIC = deviceIdtopicsObj.topic;
      client.subscribe(TOPIC);
      console.log(`SUBSCRIBED TO TOPIC: `, TOPIC);
    }
  });

  client.on("message", function (topic, payload, packet) {
    const deviceId = topic.split("/")[0];

    saveDataInDatabase(deviceId, JSON.parse(payload.toString()));
  });
}

module.exports = {
  getTopics,
  saveDataFromTopics,
  connectMQTTClient,
  endMQTTClient,
};
