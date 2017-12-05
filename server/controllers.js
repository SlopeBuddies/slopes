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
    },
    updateUser: (req, res, next) => {
        console.log(req.body);
        req.app.get('db').update_profile([req.body.nickname, req.body.first, req.body.last, req.params.id]).then(user => {
            console.log(user);
            res.status(200).send(user)
        });
    }
}