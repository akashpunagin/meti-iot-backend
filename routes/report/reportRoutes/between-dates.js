const pool = require("../../../db/pool");
const {
  authorization,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");
const {
  generateReport,
  getReportPath,
  getReportFileName,
  deleteReportFile,
} = require("../../../utilities/generateReport");
const fs = require("fs");

module.exports = (router) => {
  router.post(
    "/between-dates",
    [authorization, validateInputs],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { sensorValue, sensorMaster } = appConstants.SQL_TABLE;

      try {
        const { fromDate, toDate } = req.body;
        const currentUser = req.user;

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
        const reportData = reportRes.rows;
        generateReport(currentUser.userId, reportData, fromDate, toDate);

        const reportPath = getReportPath(currentUser.userId);
        const reportFileName = getReportFileName(currentUser.userId);

        const file = fs.createReadStream(reportPath);
        const stat = fs.statSync(reportPath);

        res.setHeader("Content-Length", stat.size);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${reportFileName}.pdf`
        );
        file.on("end", function () {
          fs.unlink(reportFileName, function () {
            deleteReportFile(currentUser.userId);
          });
        });
        file.pipe(res);

        return res.status(200);
      } catch (error) {
        console.log("PROILE ERROR", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
