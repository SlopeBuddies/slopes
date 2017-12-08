select first_name, profile_picture, home_mountain
from users
where nickname like $1 or (first_name like $1 or email like $1)