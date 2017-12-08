update users
set current_mtn = $1
where user_id = $2;