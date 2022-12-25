function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

const constants = {
  SQL_TABLE: {
    users: "users",
    userVerificationTokens: "user_verification_tokens",
    userRole: "user_role",
    userPermission: "user_permission",
    device: "device",
    sensorMaster: "sensor_master",
    sensorValue: "sensor_value",
    customerTenant: "customer_tenant",
    deviceTenant: "device_tenant",
  },
};

module.exports = deepFreeze(constants);
