select users.first_name, users.last_name
from users
join friends on friends.friend_id = users.user_id
where friends.f_user_id = $1