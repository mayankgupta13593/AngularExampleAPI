const UserPost = require('../models/userPost.model');
const Error = function (type, message) {
    this.type = type;
    this.message = message;
}
const UserPostCtrl = {
    signin: (req, res) => {
        UserPost.findOne({'email':req.body.email}).then((result) => {
            if (!!result) {
                res.status(500).send(new Error('signin', "Email id is already exists"));
            }
            else {
                UserPost.create(req.body).then(() => res.sendStatus(200)).
                    catch((err) => {
                        res.status(500).send(new Error('signin', err));
                    });
            }

        }).catch((err) => {
            res.status(500).send(new Error('signin', err));
        });

    },
    login: (req, res) => {

        UserPost.findOne({ 'email': req.body.email, 'pass': req.body.pass }).then((result) => {
            if(!!result)
            res.status(200).send(result);
            else
            res.status(500).send(new Error('login', 'Please enter valid credntials'));
        }).
            catch((err) => { res.status(500).send(new Error('signin', err)); })

    },
    getAllUser: (req, res) => {
        UserPost.find().then((result) => res.status(200).send(result)).
            catch((err) => { res.status(500).send(new Error('getAllUser', err)); })
    },
    deleteUser:(req,res)=>{
          
            UserPost.deleteOne({'_id':req.params.id}).then(()=>{
                UserPost.find().then((result) => res.status(200).send({message:`${req.params.id} Deleted`,users:result})).
                catch((err) => { res.status(500).send(new Error('deleteUser', err)); })
            }).
            catch((err)=>res.status(500).send(new Error('deleteUser',err)));
    }
}
module.exports = UserPostCtrl;