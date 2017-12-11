insert into request (request_type, pending, request_to, request_from, join_room_id)
values($1, true, $2, $3, $4);

insert into rooms (room_id, room_name, room_private)
values($5, $6, true);