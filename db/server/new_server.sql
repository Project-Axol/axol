INSERT INTO servers(server_name, admin_id, private)
VALUES($1, $2, $3);

SELECT server_id FROM servers
WHERE server_name = $1;