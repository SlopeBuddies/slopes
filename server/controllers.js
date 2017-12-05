module.exports = {
    getAllFriends: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.get_all_friends([req.params.id])
        .then( (response) => res.status(200).send(response))
        .catch( (response) => res.status(400).send(error))
    }
}
    

