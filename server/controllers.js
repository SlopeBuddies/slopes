module.exports = {
    getUser: (req, res, next)=>{
        req.app.get('db').get_profile([req.params.id]).then(user =>{
            res.status(200).send(user)
        })
    },
    checkUser: (req, res)=>{
        console.log(req.session.user)
        if (req.session.user){
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    }
}