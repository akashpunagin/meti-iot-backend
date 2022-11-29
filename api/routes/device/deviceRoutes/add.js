const pool = require("../../../db/pool");
const {
  authorization,
  authorizeAdmin,
  validateInputs,
} = require("../../../middleware/exportMiddlewares");
const appConstants = require("../../../constants/appConstants");

module.exports = (router) => {
  router.post(
    "/add",
    [authorization, authorizeAdmin, validateInputs],
    async (req, res) => {
      console.log("Route:", req.originalUrl);

      const { device } = appConstants.SQL_TABLE;

      try {
        const {
          device_id,
          user_id,
          client_topic,
          variant,
          hw_ver,
          fw_ver,
          o_logo,
          o_prod_name,
          o_prod_ver,
          u_dev_name,
          u_comp_name,
          u_tz_diff,
          u_lat,
          u_long,
          u_conn_ssid,
        } = req.body;

        const devicesRes = await pool.query(
          `SELECT device_id 
            FROM ${device}
            WHERE device_id = $1`,
          [device_id]
        );
        if (devicesRes.rowCount > 0) {
          return res.status(401).json({ error: "Device already exists" });
        }

        const addRes = await pool.query(
          `INSERT INTO ${device}(device_id,
            user_id, client_topic, variant, hw_ver, fw_ver,
            o_logo, o_prod_name, o_prod_ver, u_dev_name, u_comp_name, u_tz_diff,
            u_lat, u_long, 
            u_conn_ssid)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING *`,
          [
            device_id,
            user_id,
            client_topic,
            variant,
            hw_ver,
            fw_ver,
            o_logo,
            o_prod_name,
            o_prod_ver,
            u_dev_name,
            u_comp_name,
            u_tz_diff,
            u_lat,
            u_long,
            u_conn_ssid,
          ]
        );

        return res.status(200).json({
          status: "Device added successfully",
          data: addRes.rows[0],
        });
      } catch (error) {
        console.log("ADD Device error", error);
        return res.status(500).json("Server error");
      }
    }
  );
};
