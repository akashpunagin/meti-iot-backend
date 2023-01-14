INSERT INTO customer(is_verified, email, name, country, state, city, zip, address, contact_number, password, refresh_token)
VALUES (true, 'test@gmail.com', 'Mr.X', 'India', 'Karnataka', 'Bangalore', 1212121, 'Pattengere', '1212121212', 'password', 'asjkdhsakjhdksjh');

INSERT INTO device(device_id, client_topic,
variant, hw_ver, fw_ver, o_logo, o_prod_name, o_prod_ver, u_dev_name, u_comp_name, u_tz_diff,
u_lat, u_long,
user_id)
VALUES ('MQI1-90-38-0C-57-58-BC', 'MQI1-90-38-0C-57-58-20/v2/0/sensor_values',
'1', '1', '1', '1', '1', '1', '1', '1', '1',
'121212', '11212122',
'6a6dcefa-437f-47af-b82b-f7e4f074114b'
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

INSERT INTO sensor_type(sensor_idx, sensor_name, sensor_uom, sensor_report_group)
VALUES
    (0,'Frequency', 'Hz', '1' ),
    (1, 'Voltage Phase R', 'V', '1'),
    (2, 'Voltage Phase Y', 'V', '1'),
    (3, 'Voltage Phase B', 'V', '1'),
    (4, 'Voltage Phase R to Y', 'V', '1'),
    (5, 'Voltage Phase Y to B', 'V', '1'),
    (6, 'Voltage Phase B to R', 'V', '1'),
    (7, 'Current Phase R', 'A', '1'),
    (8, 'Current Phase Y', 'A', '1'),
    (9, 'Current Phase B', 'A', '1'),
    (10, 'Power Factor R', '-', '1'),
    (11, 'Power Factor Y', '-', '1'),
    (12, 'Power Factor B', '-', '1'),
    (13, 'Total Power Factor', '-', '1'),
    (14, 'Active Power R', 'W', '1'),
    (15, 'Active Power Y', 'W', '1'),
    (16, 'Active Power B', 'W', '1'),
    (17, 'Total Active Power', 'W', '1'),
    (18, 'Reactive Power R', 'VAr', '1'),
    (19, 'Reactive Power Y', 'VAr', '1'),
    (20, 'Reactive Power B', 'VAr', '1'),
    (21, 'Total Reactive Power', 'VAr', '1'),
    (22, 'Apparent Power R', 'VA', '1'),
    (23, 'Apparent Power Y', 'VA', '1'),
    (24, 'Apparent Power B', 'VA', '1'),
    (25, 'Total Apparent Power', 'VA', '1'),
    (26, 'Active Energy (Import)', 'Wh', '1'),
    (27, 'Active Energy (Export)', 'Wh', '1'),
    (28, 'Active Energy (Total)', 'Wh', '1'),
    (29, 'Reactive Energy (Import)', 'V Arh', '1'),
    (30, 'Reactive Energy (Export)', 'V Arh', '1'),
    (31, 'Reactive Energy (Total)', 'V Arh', '1'),
    (32, 'Apparent Energy (Import)', 'V Ah', '1'),
    (33, 'Apparent Energy (Export)', 'V Ah', '1'),
    (34, 'Apparent Energy (Total)', 'V Ah', '1'),
    (35, 'Inductive Energy (Import)', 'V Arh', '1'),
    (36, 'Capacitive Energy (Export)', 'V Arh', '1'),
    (37, 'Inductive Energy (Export)', 'V Arh', '1'),
    (38, 'Capacitive Energy (Import)', 'V Arh', '1'),
    (39, 'Load Hours (Import)', 'Min', '1'),
    (40, 'Load Hours (Export)', 'Min', '1'),
    (41, 'Load Hours (Total)', 'Min', '1'),
    (41, 'Reserved', '-', '1'),
    (41, 'RPM', '-', '1');