import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:6,
        select:false
    },
    // avatar:{
    //     type:String,
    //     default:null
    // },
    currency:{
        type:String,
        default:'USD',
        enum:['USD','EUR','GBP','INR','JPV','CNY']
    },
    refreshToken:{
        type:String,
        select:false
    },
    // googleId:{
    //     type:String,
    //     default:null
    // }
},{
    timestamps:true
});

// hashPassword before storing
 userSchema.pre('save',async function (){
    if(!this.isModified('password'))return ;
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        
    }
    catch(error){
        throw error;
    }
 });
//  compare password methods
userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};
const User=mongoose.model('user',userSchema);
export default User;
