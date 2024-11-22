import mongoose from "mongoose";
const { Schema, model } = mongoose;
const petSchema = new Schema({
    name: {
        type: String,
        required: [true, 'You must provide the pet\'s name'],
        minLength: [2, 'Your pet name must be at least 2 characters in lenth']
    },
    type: {
        type: String,
        required: [true, 'You must provide the animal\'s type']
    },
    age: {
        type: Number,
        min: [1, 'You must enter an age greater than 0!'],
        required: [true, 'You must provide the animal\'s age']
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attacthe the user _id'],
        ref: 'User'
    },
    posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
}, {
    collection: 'pet_app_posts'
});
const Pet = model('Pet', petSchema);
export default Pet;
