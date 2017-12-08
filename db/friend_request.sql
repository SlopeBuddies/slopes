insert into request (request_from, request_to, request_type, pending)
            values ($1, $2, 'friend_request', true)