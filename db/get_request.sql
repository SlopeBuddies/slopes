select request_type, first_name, last_name, join_room_id, request_to, request_from, id from request
join users on users.user_id = request.request_from
where request_to = $1 And pending = true