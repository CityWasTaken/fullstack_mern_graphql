import mongoose from "mongoose";
const { Schema, model } = mongoose;
const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    _id: false
});
const noteSchema = new Schema({
    text: {
        type: String,
        minLength: [3, 'Your notes must have at least 3 characters in length']
    },
    user: {
        type: Schema.Types.ObjectId,
        // This is a reference to the model name that was declare in the user model file through model('User', userSchema)
        ref: 'User'
    },
    likes: [likeSchema]
});
const Note = model('Note', noteSchema);
export default Note;
