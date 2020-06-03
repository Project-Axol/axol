INSERT INTO categories(category_name, server_id)
VALUES ($1, $2)
returning *;