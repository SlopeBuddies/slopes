select * from created_room
join rooms 
on user_id = $1 and
created_room.room_name = rooms.room_name