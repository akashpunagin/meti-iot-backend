const express = require("express");
const app = express();
const cors = require("cors");

//Routers
const tempRouter = require("./routes/temp/tempRouter");

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/temp", tempRouter);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
