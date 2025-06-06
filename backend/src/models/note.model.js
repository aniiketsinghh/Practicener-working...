import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [1, 'Title must be at least 1 character long'],
    },
    content: {
        type: String,
        required: true,
        minlength: [1, 'Content must be at least 1 character long'],
    }
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
export default Note;