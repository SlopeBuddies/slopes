insert into users (first_name, last_name, email, profile_picture, nickname, auth_id, cover_picture)
values($1, $2, $3, $4, $5, $6, $7)
returning *