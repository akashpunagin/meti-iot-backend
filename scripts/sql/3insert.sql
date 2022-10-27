INSERT INTO customer(is_verified, email, name, country, state, city, zip, address, contact_number, password, refresh_token)
VALUES (true, 'test@gmail.com', 'Mr.X', 'India', 'Karnataka', 'Bangalore', 1212121, 'Pattengere', '1212121212', 'password', 'asjkdhsakjhdksjh');

INSERT INTO device(device_id, client_topic,
variant, hw_ver, fw_ver, o_logo, o_prod_name, o_prod_ver, u_dev_name, u_comp_name, u_tz_diff,
u_lat, u_long)
VALUES ('MQI1-90-38-0C-57-58-BC', 'MQI1-90-38-0C-57-58-BC/v2/0/sensor_values',
'1', '1', '1', '1', '1', '1', '1', '1', '1',
'121212', '11212122'
);

INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 0, 'Frequency', 'Hz', '1');
INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 1, 'Voltage-R', 'VLN', '1');
INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 2, 'Voltage-Y', 'VLN', '1');
INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 3, 'Voltage-B', 'VLN', '1');
INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 4, 'Voltage-RY', 'VLL', '1');
INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 5, 'Voltage-YB', 'VLL', '1');
INSERT INTO sensor_master(device_id, sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES ('MQI1-90-38-0C-57-58-BC', 6, 'Voltage-BR', 'VLL', '1');

