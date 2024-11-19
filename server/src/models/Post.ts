import mongoose from "mongoose";

const {Schema, model} = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: ['The post must have a title'],
        minLength: [3, 'Your post title must be at least 3 characters in length']
    },
    body: {
        type: String,
        required: ['The post must have a body'],
        minLength: [3, 'Your post body must be at least 3 characters in length']
    },
    pet: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attatch the pet _id to the post'],
        ref: 'Pet'
    }
});

const Post = model('Post', postSchema);

export default Post;