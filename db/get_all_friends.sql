select users.first_name, users.last_name, users.profile_picture, user_id, f_user_id, friend_id, current_mtn, users.location_visible
from users
join friends on friends.friend_id = users.user_id
where friends.f_user_id = $1