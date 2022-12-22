const missingCredsMessage = "Missing Credentials";
const invalidCredsMessage = "Invalid Credentials";
const invalidEmailMessage = "Invalid Email";

function isValidEmail(userEmail) {
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    userEmail
  );
  return isValidEmail;
}

function handleAuthReq(req) {
  const {
    userId,
    email,
    firstName,
    lastName,
    country,
    state,
    city,
    zip,
    address,
    contact_number,
    password,
  } = req.body;

  if (req.path === "/register-admin") {
    if (
      ![
        email,
        firstName,
        lastName,
        country,
        state,
        city,
        zip,
        address,
        contact_number,
        password,
      ].every(Boolean)
    ) {
      return missingCredsMessage;
    }

    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/register-customer") {
    if (
      ![
        email,
        firstName,
        lastName,
        country,
        state,
        city,
        zip,
        address,
        contact_number,
        password,
      ].every(Boolean)
    ) {
      return missingCredsMessage;
    }
    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/register-tenent") {
    if (
      ![
        email,
        firstName,
        lastName,
        country,
        state,
        city,
        zip,
        address,
        contact_number,
        password,
      ].every(Boolean)
    ) {
      return missingCredsMessage;
    }
    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/delete-user") {
    if (![userId].every(Boolean)) {
      return missingCredsMessage;
    }
  }

  if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return missingCredsMessage;
    }
    if (!isValidEmail(email)) {
      return invalidEmailMessage;
    }
  }

  if (req.path === "/send-confirmation-email") {
    if (![userId].every(Boolean)) {
      return missingCredsMessage;
    }
  }
}

function handleDeviceReq(req) {
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

  if (req.path === "/add") {
    if (
      ![
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
      ].every(Boolean)
    ) {
      return missingCredsMessage;
    }
  }
}

function handleSensorValueError(req) {
  const { deviceId, parameter } = req.body;

  if (req.path === "/get-all-data") {
    if (![deviceId].every(Boolean)) {
      return missingCredsMessage;
    }
  }
  if (req.path === "/get-data") {
    if (![deviceId, parameter].every(Boolean)) {
      return missingCredsMessage;
    }
  }
}

module.exports = (req, res, next) => {
  const authError = handleAuthReq(req);
  const deviceError = handleDeviceReq(req);
  const sensorValueError = handleSensorValueError(req);

  if (authError) {
    return res.status(401).json({ error: authError });
  }
  if (deviceError) {
    return res.status(401).json({ error: deviceError });
  }
  if (sensorValueError) {
    return res.status(401).json({ error: sensorValueError });
  }

  next();
};
