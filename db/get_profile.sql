SELECT profile_picture, nickname, first_name, last_name 
from users
where user_id = $1;