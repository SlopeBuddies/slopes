insert into friends (f_user_id, friend_id)
            values($1, $2);
insert into friends (f_user_id, friend_id)
            values($2, $1);
update request
set pending = false
where id = $3;
