import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
     username:{
        type: String,
        required: [true, "Username is required for creating an Snapfeed account"],
        trim: true,
        lowercase: true,
        match: [/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, "please enter correct username"],
        unique:[true, "username should be unique"]
    },
    email:{
        type: String,
        required:[true, "Email id is required"], 
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required:[true, "Password is required for creating an account"],
        minlength: [6, "Password should contains more than 6 letters"]
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [150, "Bio cannot exceed 150 characters"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdAt: {
      type: Date,
    }

}, {
    timestamps : true
});


const userModel = mongoose.model("user", userSchema);

export default userModel;
