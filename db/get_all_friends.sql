select users.first_name, users.last_name, users.profile_picture, user_id, friend_id, current_mtn
from users
join friends on friends.friend_id = users.user_id
where friends.f_user_id = $1