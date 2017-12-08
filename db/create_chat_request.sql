insert into request (request_type, pending, request_to, request_from)
values($1, true, $2, $3);

insert into rooms (room_id, room_name, room_private)
values($4, $5, true);