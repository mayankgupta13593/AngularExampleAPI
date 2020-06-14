const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
const router=express.Router();

//env variables
const PORT=process.env.PORT || 3000;
const MONGODB_URI= process.env.MONGODB_URI || 'mongodb+srv://mongoDbexp:M@yank@123@cluster0-xmgar.mongodb.net/test?retryWrites=true&w=majority';

mongoose.Promise=Promise;
mongoose.connect(MONGODB_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(bodyParser.json(),cors());
app.use(require('../routes/user.route'));

app.all('*',(req,res)=>{
    console.log(req.body);
    console.log('Returning a 404 from the catch-all route');
    return res.sendStatus(404);
})

const start= ()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening on port:${PORT}`);
    })
}
const stop= ()=>{
    app.cancel(PORT,()=>{
        console.log(`Server is stop on port:${PORT}`);
    })
}

module.exports={start,stop};