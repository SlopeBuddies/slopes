update users set nickname = $1, first_name = $2, last_name = $3, home_mountain = $4
where user_id = $5
returning profile_picture, nickname, first_name, last_name, home_mountain;