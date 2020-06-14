const mongoose=require('mongoose');

const userPostSchema=mongoose.Schema({
 
    fName:{type:String,required:true},
    lName:{type:String,required:true},
    dob:{type:String,required:true},
    gender:{type:Boolean,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    pass:{type:String,required:true}
})
userPostSchema.index({'$**': 'text'});
const UserPost=mongoose.model('userPost',userPostSchema);
module.exports=UserPost;