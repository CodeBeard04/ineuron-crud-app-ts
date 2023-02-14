import mongoose, { Schema, model, connect } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
})

const User = mongoose.model('User', userSchema);
export default User;