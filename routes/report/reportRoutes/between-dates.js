const pool = require("../../../db/pool");
const {
  authorization,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.post(
    "/between-dates",
    [authorization, validateInputs],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { sensorValue, sensorMaster } = appConstants.SQL_TABLE;

      try {
        const { fromDate, toDate } = req.body;

        const reportRes = await pool.query(
          `SELECT * 
          FROM
            ${sensorValue} as sv, ${sensorMaster} as sm
          WHERE
            sv.device_id = sm.device_id AND
            sv.sensor_idx = sm.sensor_idx AND
            sv.reading_time BETWEEN $1 and $2`,
          [fromDate, toDate]
        );
        const data = reportRes.rows;
        console.log({ data });

        return res.status(200).json(data);
      } catch (error) {
        console.log("PROILE ERROR", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
