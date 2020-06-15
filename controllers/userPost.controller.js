const UserPost = require('../models/userPost.model');
const emailModule = require('../utils/email.module');
const Error = function (type, message) {
    this.type = type;
    this.message = message;
}
const UserPostCtrl = {
    // For SignUp
    signin: (req, res) => {
        UserPost.findOne({ 'email': req.body.email }).then((result) => {
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
    // For Login
    login: (req, res) => {

        UserPost.findOne({ 'email': req.body.email, 'pass': req.body.pass }).then((result) => {
            if (!!result)
                res.status(200).send(result);
            else
                res.status(500).send(new Error('login', 'Please enter valid credntials'));
        }).
            catch((err) => { res.status(500).send(new Error('signin', err)); })

    },
    // For GetAllUser
    getAllUser: (req, res) => {
        UserPost.find().then((result) => res.status(200).send(result)).
            catch((err) => { res.status(500).send(new Error('getAllUser', err)); })
    },
    // For Delete single user
    deleteUser: (req, res) => {

        UserPost.deleteOne({ '_id': req.params.id }).then(() => {
            UserPost.find().then((result) => res.status(200).send({ message: `${req.params.id} Deleted`, users: result })).
                catch((err) => { res.status(500).send(new Error('deleteUser', err)); })
        }).
            catch((err) => res.status(500).send(new Error('deleteUser', err)));
    },
    otpSend:  (req, res) => {
        const otp=Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: 'nikkirocks786@gmail.com',
            to: req.body.email,
            subject: 'OTP for AngularExample',
            text: `Otp is ${otp} & It's valid upto 10 mins.`
        };
       emailModule.sendOTPMail(mailOptions).then((result)=>{
           if(result.type==='success'){
           UserPost.updateOne({'email':req.body.email},{'otp':otp}).then(()=>{
            res.status(200).send(`OTP: ${otp} has been sent to ${req.body.email}`);
            setTimeout(()=>{
                UserPost.updateOne({'email':req.body.email},{'otp':undefined}).then(()=>{
                   }).catch((err)=>console.log(err));
            },10*60*1000);
           }).catch((err)=>res.status(500).send(new Error('otpSend', err)))
           }
           else
           res.status(500).send(result.result);
          
      });
    },
    verifyOTP:(req,res)=>{
       UserPost.findOne({'email':req.body.email}).then((result)=>{
          if(req.body.otp===result.otp)
           res.status(200).send({'isError':false,"message":'Otp verified successfully'});
          else
          res.status(200).send({'isError':true,"message":'Please enter valid otp'});

       }).catch((err)=>res.status(500).send(new Error('verifyOTP', err))); 

    },
    changePassword:(req,res)=>{
        UserPost.findOne({'email':req.body.email}).then((rs)=>{
         if(!!rs){
            UserPost.updateOne({'email':req.body.email},{'pass':req.body.password}).then((result)=>{
                res.status(200).send('Password has been changed');
               }).catch((err)=>res.status(500).send(new Error('otpSend', err)))
         }
         else{
            res.status(500).send(new Error('changePassword', "Email id doesn't exist"));
         } 
        }).catch((err)=>res.status(500).send(new Error('changePassword', err)));

    }
}
module.exports = UserPostCtrl;