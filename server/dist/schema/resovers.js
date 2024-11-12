import User from '../models/User.js';
import Note from '../models/Note.js';
const resolvers = {
    Query: {
        async getSingleUserByID(_, args) {
            const user_id = args.user_id;
            // Create a variable that stores the user we find by id
            const user = await User.findById(user_id).select('email -_id').populate({
                path: 'notes',
                select: 'text -_id'
            });
            return user;
        },
        async getAllNotes() {
            const notes = await Note.find().populate({
                path: 'user',
                populate: {
                    path: 'notes'
                }
            });
            return notes;
        },
        async getLikesForNote(_, args) {
            const note_id = args.note_id;
            const note = await Note.findById(note_id).populate({
                path: 'likes',
                populate: {
                    path: 'user',
                    select: 'email'
                }
            });
            return note?.likes;
        }
    },
    Mutation: {
        async createUser(_, args) {
            try {
                const user = await User.create(args);
                return {
                    user: user
                };
            }
            catch (error) {
                const errors = [];
                console.log(error.message);
                if (error.code === 11000) {
                    errors.push('That email is already in use');
                }
                else {
                    for (const prop in error.errors) {
                        errors.push(error.errors[prop].message);
                    }
                }
                return {
                    errors: errors
                };
            }
        },
        async createNoteForUser(_, args) {
            const user = await User.findById(args.user_id);
            const note = await Note.create({
                text: args.text,
                user: args.user_id
            });
            user?.notes.push(note._id);
            await user?.save();
            return user;
        },
        async deleteNoteFromUser(_, args) {
            const note_id = args.note_id;
            const user_id = args.user_id;
            await Note.deleteOne({
                _id: note_id
            });
            await User.findByIdAndUpdate(user_id, {
                $pull: {
                    notes: note_id
                }
            });
            return 'Note successfully removed';
        },
        async addLikeToUserNote(_, args) {
            const note_id = args.note_id;
            const user_id = args.user_id;
            await Note.findByIdAndUpdate(note_id, {
                $push: {
                    likes: {
                        user: user_id
                    }
                }
            });
            return 'You liked the note!';
        }
    }
};
export default resolvers;
