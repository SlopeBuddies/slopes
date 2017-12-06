SELECT profile_picture, nickname, first_name, last_name , home_mountain
from users
where user_id = $1;