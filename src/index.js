const express = require("express");
const app = express();
const cors = require("cors");
const mqttService = require("./service/mqtt");

//Routers
const deviceRouter = require("./routes/device/deviceRouter");
const sensorValueRouter = require("./routes/sensorValue/sensorValueRouter");
const authRouter = require("./routes/auth/authRouter");
const customerRouter = require("./routes/customer/customerRouter");

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/device", deviceRouter);
app.use("/sensorValue", sensorValueRouter);
app.use("/auth", authRouter);
app.use("/customer", customerRouter);

app.listen(PORT, async () => {
  console.log(`Listening to port ${PORT}`);
  const deviceIdtopicsObjs = await mqttService.getTopics();

  console.log("Device ID, TOPICS: ", deviceIdtopicsObjs);
  mqttService.saveDataFromTopics(deviceIdtopicsObjs);
});
