const pool = require("../../../db/pool");
const {
  authorization,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");
const {
  generateAndSaveCSV,
  getCSVPath,
  getCSVFileName,
  deleteCSVFile,
} = require("../../../utilities/generateCSV");
const fs = require("fs");

module.exports = (router) => {
  router.post(
    "/between-dates-specific-device",
    [authorization, validateInputs],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { sensorValue, sensorMaster } = appConstants.SQL_TABLE;

      try {
        const { fromDate, toDate, deviceId } = req.body;
        const currentUser = req.user;

        const reportRes = await pool.query(
          `SELECT * 
          FROM
            ${sensorValue} as sv, ${sensorMaster} as sm
          WHERE
            sv.device_id = sm.device_id AND
            sv.sensor_idx = sm.sensor_idx AND
            sv.device_id = $3 AND
            sv.reading_time::timestamp >= $1::timestamp AND
            sv.reading_time::timestamp < $2::timestamp + interval '1 day'`,
          [fromDate, toDate, deviceId]
        );
        const reportData = reportRes.rows;
        await generateAndSaveCSV(currentUser.userId, reportData);

        const csvPath = getCSVPath(currentUser.userId);
        const csvFileName = getCSVFileName(currentUser.userId);

        const file = fs.createReadStream(csvPath);
        const stat = fs.statSync(csvPath);

        res.setHeader("Content-Length", stat.size);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${csvFileName}.pdf`
        );
        file.on("end", function () {
          fs.unlink(csvFileName, function () {
            deleteCSVFile(currentUser.userId);
          });
        });
        file.pipe(res);

        return res.status(200);
      } catch (error) {
        console.log("between-dates ERROR", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
