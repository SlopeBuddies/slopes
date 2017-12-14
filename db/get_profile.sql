SELECT profile_picture, nickname, first_name, last_name , home_mountain, location_visible, cover_picture
from users
where user_id = $1;