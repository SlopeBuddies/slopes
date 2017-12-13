insert into chats (chat_message, user_id, room_id, user_name, time_now )
values($1, $2, $3, $4, $5)
returning *