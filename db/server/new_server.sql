INSERT INTO servers(server_name, admin_id, server_img, private, password)
VALUES($1, $2, $3, $4, $5);

SELECT server_id FROM servers
WHERE server_name = $1;