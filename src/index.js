const express = require("express");
const app = express();
const cors = require("cors");
const mqttService = require("./service/mqtt");

//Routers
const tempRouter = require("./routes/temp/tempRouter");
const deviceRouter = require("./routes/device/deviceRouter");

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/temp", tempRouter);
app.use("/device", deviceRouter);

app.listen(PORT, async () => {
  console.log(`Listening to port ${PORT}`);
  const deviceIdtopicsObjs = await mqttService.getTopics();

  console.log("Device ID, TOPICS: ", deviceIdtopicsObjs);
  mqttService.saveDataFromTopics(deviceIdtopicsObjs);
});
