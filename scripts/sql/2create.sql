CREATE TABLE customer(
    -- indentification and verification
    customer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,

    -- customer details
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    zip INT NOT NULL,
    address VARCHAR NOT NULL,
    contact_number VARCHAR NOT NULL,

    -- customer confidential information
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR
);

CREATE TABLE device(
    device_id SERIAL PRIMARY KEY,
    customer_id uuid REFERENCES customer,

    client_topic VARCHAR NOT NULL, --topic name--

    variant VARCHAR NOT NULL,
    hw_ver VARCHAR NOT NULL,
    fw_ver VARCHAR NOT NULL,
    o_logo VARCHAR NOT NULL,
    o_prod_name VARCHAR NOT NULL,
    o_prod_ver VARCHAR NOT NULL,
    u_dev_name VARCHAR NOT NULL,
    u_comp_name VARCHAR NOT NULL,
    u_tz_diff VARCHAR NOT NULL,

    u_lat INT NOT NULL,
    u_long INT NOT NULL,

    u_conn_ssid VARCHAR NOT NULL
);

CREATE TABLE sensor_master(
    sensor_id SERIAL PRIMARY KEY,
    device_id INT REFERENCES device,

    meter_idx INT NOT NULL DEFAULT 0,
    sensor_idx INT NOT NULL,
    
    sensor_name VARCHAR NOT NULL,
    sensor_uom VARCHAR NOT NULL,
    sensor_report_group INT NOT NULL
);

CREATE TABLE sensor_value(
    id SERIAL,
    
    device_id INT REFERENCES device,
    sensor_id INT REFERENCES sensor_master,

    meter_idx INT NOT NULL DEFAULT 0,
    reading_time TIMESTAMPTZ NOT NULL,
    value INT NOT NULL
);
SELECT create_hypertable('sensor_value', 'reading_time');