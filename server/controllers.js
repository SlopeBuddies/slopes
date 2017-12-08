module.exports = {
    getUser: (req, res, next)=>{
        req.app.get('db').get_profile([req.params.id]).then(user =>{
            res.status(200).send(user)
        })
    },
    checkUser: (req, res)=>{
        if (req.session.user){
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    },
    updateUser: (req, res, next) => {
        req.app.get('db').update_profile([req.body.nickname, req.body.first, req.body.last, req.body.home_mountain, req.params.id])
        .then(user => {
            res.status(200).send(user)
        });
    },

    getAllFriends: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_all_friends([req.params.id])
        .then( (response) => {
        console.log('response', response)
        res.status(200).send(response)})
        .catch( (error) => res.status(400).send(error))
    },

    findUsers: (req,res,next) =>{
        const dbInstance = req.app.get('db');
        console.log('reqquery', req.query)
        dbInstance.find_users('%' + req.query.search + '%')
        .then( (response) => {
            console.log(response)
        
        res.status(200).send(response)})
        .catch( (error) => {
            console.log(error)
            res.status(400).send(error)})
    },

    updateUserLocation: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.update_user_location([ req.body.latitude, req.body.longitude, req.user.user_id])
        .then( (response) => {

        res.status(200).send(response)})
        .catch( (error) => res.status(400).send(error))
    },

    getRoomMessages: (req, res, next) => {
        const dbInstance = req.app.get('db');
        
                dbInstance.get_room_messages([ req.params.room_id])
                .then( (response) => {
        
                res.status(200).send(response)})
                .catch( (error) => res.status(400).send(error))
    },

    createChatRequest: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {roomid, room_name, request_type, request_to, request_from} = req.body;

        dbInstance.create_chat_request([request_type, request_to, request_from, roomid, room_name])
        .then((response) => {
            res.status(200).send(response)});
    },

    getRequest: (req, res, next) => {
        const db = req.app.get('db');

        db.get_request([req.params.user_id]).then(response => res.status(200).send(response));
    }

}



// insert into request (request_type, pending, request_to, request_from)
// values($1, true, $2, $3);

// insert into rooms (room_id, room_name, room_private)
// values($4, $5, true);
    

    

