insert into chats (chat_message, user_id, room_id )
values($1, $2, $3)
returning *