insert into gusers (
  user_name,
  created_at,
  user_uuid,
  email,
  profile_pic)
  values ($1, $2, $3, $4, $5) returning *;