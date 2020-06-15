const mongoose=require('mongoose');

const userPostSchema=mongoose.Schema({
 
    fName:{type:String,required:true},
    lName:{type:String,required:true},
    dob:{type:Date,required:true},
    gender:{type:Boolean,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    pass:{type:String,required:true},
    otp:{type:Number}
})
userPostSchema.index({'$**': 'text'});
const UserPost=mongoose.model('userPost',userPostSchema);
module.exports=UserPost;