CREATE TABLE users(
    -- indentification and verification
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,

    -- user details
    email VARCHAR UNIQUE NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    zip INT NOT NULL,
    address VARCHAR NOT NULL,
    contact_number VARCHAR NOT NULL,

    -- user confidential information
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR
);

-- to store tokens while user email verification
CREATE TABLE user_verification_tokens(
    user_id uuid PRIMARY KEY REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    token VARCHAR NOT NULL
);

-- role of each users will be defined in this table
CREATE TABLE user_role(
    user_id uuid PRIMARY KEY REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    role_admin BOOLEAN DEFAULT FALSE,
    role_customer BOOLEAN DEFAULT FALSE,
    role_tenant BOOLEAN DEFAULT FALSE
);

-- permissions of users will be defined here
CREATE TABLE user_permission(
    user_id uuid PRIMARY KEY REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    perm_add_device BOOLEAN DEFAULT FALSE,
    perm_add_customer BOOLEAN DEFAULT FALSE,
    perm_add_sensor BOOLEAN DEFAULT FALSE,
    perm_add_tenant BOOLEAN DEFAULT FALSE
);

CREATE TABLE customer_tenant(
    customer_id uuid REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    tenant_id uuid REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(customer_id, tenant_id)
);

CREATE TABLE device(
    device_id VARCHAR PRIMARY KEY, --"MQI1-90-38-0C-57-58-BC/v2/0/sensor_values"; in this "MQI1-90-38-0C-57-58-BC" this is device id--
    user_id uuid REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE, --customer id (device belongs to which customer)--

    client_topic VARCHAR NOT NULL UNIQUE, --topic name--

    variant VARCHAR NOT NULL,
    hw_ver VARCHAR NOT NULL,
    fw_ver VARCHAR NOT NULL,
    o_logo VARCHAR NOT NULL,
    o_prod_name VARCHAR NOT NULL,
    o_prod_ver VARCHAR NOT NULL,
    u_dev_name VARCHAR NOT NULL,
    u_comp_name VARCHAR NOT NULL,
    u_tz_diff VARCHAR NOT NULL,

    -- address --
    u_lat VARCHAR NOT NULL,
    u_long VARCHAR NOT NULL,

    u_conn_ssid VARCHAR NULL
);

CREATE TABLE device_tenant(
    tenant_id uuid REFERENCES users ON DELETE CASCADE ON UPDATE CASCADE,
    device_id VARCHAR REFERENCES device ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(tenant_id, device_id)
);

--for each device, which sensor has what name and measurement--
CREATE TABLE sensor_master(
    sensor_id SERIAL PRIMARY KEY,
    
    device_id VARCHAR REFERENCES device ON DELETE CASCADE ON UPDATE CASCADE,

    sensor_idx INT NOT NULL,
    meter_idx INT NOT NULL DEFAULT 0,
    
    sensor_name VARCHAR NOT NULL,
    sensor_uom VARCHAR NOT NULL, --measurement unit-- 
    sensor_report_group INT NOT NULL, --analog or digital,  digital (1), analog (2)--

    UNIQUE(device_id, sensor_id)
);

CREATE TABLE sensor_value(
    id SERIAL,
    
    device_id VARCHAR REFERENCES device(device_id) ON DELETE CASCADE ON UPDATE CASCADE, -- "MQI1-90-38-0C-57-58-BC/v2/0/sensor_values"; in this "MQI1-90-38-0C-57-58-BC" this is device id
    sensor_idx INT,

    meter_idx INT NOT NULL DEFAULT 0,
    value FLOAT NOT NULL,
    -- reading_time TIMESTAMPTZ NOT NULL
    reading_time timestamp without time zone default (now() at time zone 'utc')
);
-- SELECT create_hypertable('sensor_value', 'reading_time');

--table to store sensor names--
CREATE TABLE sensor_type(
    id SERIAL PRIMARY KEY,
    sensor_idx INT NOT NULL,
    sensor_name VARCHAR NOT NULL,
    sensor_uom VARCHAR NOT NULL, --measurement unit-- 
    sensor_report_group INT NOT NULL --analog or digital,  digital (1), analog (2)--
);