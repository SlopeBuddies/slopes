insert into users (first_name, last_name, nickname, auth_id, profile_picture, email)
values($1, $2, $3, $4, $5, $6)
returning *