import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


const userScheme = new Schema(
    {
        username :{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim: true,
            index: true   // Searching speed will be fast
        },
        email:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim: true,
        },
        fullname :{
            type : String,
            required : true,
            trim: true,
            index: true   // Searching speed will be fast
        },
        avatar :{
            type : String,              // cloudinary link
            required : true,
        },
        coverImage:{
            type : String,              // cloudinary link
        },
        watchHistory :[
            {
            type : Schema.Types.ObjectId,
            ref:"Video"
            }
           
        ],
        password :{
            type : String,
            required : [true,"Password is required"],
            trim: true,
        },
        refreshToken :{
            type : String,
        },
},{timestamps:true});

userScheme.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userScheme.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userScheme.methods.generateToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname},
        process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
);
}

userScheme.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id
    },
        process.env.REFERSH_TOKEN,
    {
        expiresIn : process.env.REFERSH_TOKEN_EXPIRY

    }
);
}

export const User = mongoose.model("User", userScheme);

