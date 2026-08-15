import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId
    },
    caption:{
        type: String,
        maxlength: [200, "Caption cannot exceed 200 characters"],
        trim: true
    },
    image:{
        type: String,
        trim: true,
        required: [true, "Image is reqired for creating a post"],
    },
     likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
     },],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },],
    createdAt:{
        type: Date
    }
}, {
    timestamps: true
});

const postModel = mongoose.model("post", postSchema);

export default postModel;