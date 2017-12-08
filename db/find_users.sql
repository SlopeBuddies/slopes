select first_name, profile_picture, home_mountain, user_id
from users
where user_id != $2 and (nickname like $1 or first_name like $1 or email like $1)