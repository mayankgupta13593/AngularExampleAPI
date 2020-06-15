const Router=require('express').Router;
const bodyparser=require('body-parser');

const UserPostCtrl=require('../controllers/userPost.controller');

const userPostRoute=new Router();

userPostRoute.post('/api/user/signin',UserPostCtrl.signin);
userPostRoute.post('/api/user/login',UserPostCtrl.login);
userPostRoute.get('/api/user/getAllUser',UserPostCtrl.getAllUser);
userPostRoute.delete('/api/user/deleteUser/:id',UserPostCtrl.deleteUser);
userPostRoute.put('/api/user/otpSend',UserPostCtrl.otpSend);
userPostRoute.post('/api/user/verifyOTP',UserPostCtrl.verifyOTP);
userPostRoute.put('/api/user/changePassword',UserPostCtrl.changePassword);

module.exports=userPostRoute;