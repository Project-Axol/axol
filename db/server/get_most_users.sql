SELECT s.server_id, s.server_name, s.server_img, COUNT(u.user_id) FROM servers s
JOIN server_users u ON s.server_id = u.server_id
WHERE s.private = false
GROUP BY s.server_id
ORDER BY COUNT(u.user_id) DESC LIMIT 12;