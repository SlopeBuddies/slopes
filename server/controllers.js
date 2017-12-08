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

        res.status(200).send(response)})
        .catch( (error) => res.status(400).send(error))
    },

    findUsers: (req,res,next) =>{
        const dbInstance = req.app.get('db');

        dbInstance.find_users(['%' + req.query.search + '%', req.params.id])
        .then( (response) => res.status(200).send(response))
        .catch( (error) => res.status(400).send(error))
    },

    updateUserLocation: (req,res,next) => {
        const dbInstance = req.app.get('db');

        dbInstance.update_user_location([ req.body.latitude, req.body.longitude, req.user.user_id])
        .then( (response) => {

        res.status(200).send(response)})
        .catch( (error) => res.status(400).send(error))
    }

}
    

    

