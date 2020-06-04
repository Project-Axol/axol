UPDATE servers
SET private = $2
WHERE server_id = $1;