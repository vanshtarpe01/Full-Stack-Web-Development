import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: [true, "Text is required for comment"],
        trim: true,
        maxlength: [300, "Comment cannot exceed 300 characters"]
    }
});

const commentModel = mongoose.model("comment", commentSchema);


export default commentModel;