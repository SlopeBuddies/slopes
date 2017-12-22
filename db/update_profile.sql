update users set nickname = $1, first_name = $2, last_name = $3, home_mountain = $4, profile_picture = $6, cover_picture = $7, insta = $8
where user_id = $5;
select profile_picture, nickname, first_name, last_name, home_mountain, cover_picture, insta, location_visible from users
where user_id = $5;