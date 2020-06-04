SELECT u.server_id, s.server_name, s.server_img FROM server_users u
JOIN servers s ON u.server_id = s.server_id
WHERE u.user_id = $1 ORDER BY server_id;