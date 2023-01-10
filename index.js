const express = require("express");
const app = express();
const cors = require("cors");
const mqttService = require("./service/mqtt");
require("dotenv").config();

//Routers
const deviceRouter = require("./routes/device/deviceRouter");
const sensorValueRouter = require("./routes/sensorValue/sensorValueRouter");
const authRouter = require("./routes/auth/authRouter");
const customerRouter = require("./routes/customer/customerRouter");
const profileRouter = require("./routes/profile/profileRouter");
const tenantRouter = require("./routes/tenant/tenantRouter");
const sensorMasterRouter = require("./routes/sensorMaster/sensorMasterRouter");

const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/device", deviceRouter);
app.use("/sensorValue", sensorValueRouter);
app.use("/auth", authRouter);
app.use("/customer", customerRouter);
app.use("/profile", profileRouter);
app.use("/tenant", tenantRouter);
app.use("/sensorMaster", sensorMasterRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, async () => {
  console.log(`Listening to port ${PORT}`);
  const deviceIdtopicsObjs = await mqttService.getTopics();

  console.log("index.js: Device ID, TOPICS: ", deviceIdtopicsObjs);
  mqttService.saveDataFromTopics(deviceIdtopicsObjs);
});

module.exports = app;

//TODO admin - get all devices with customer name
