update users set nickname = $1, first_name = $2, last_name = $3
where user_id = $4
returning profile_picture, nickname, first_name, last_name;