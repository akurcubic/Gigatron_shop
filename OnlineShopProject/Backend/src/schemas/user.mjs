import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    email: {type: String, requried: true},
    password: {type: String, requried: true},
    type: {type: String, requried: true, default : "REGULAR_USER"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

const User = mongoose.model('User', userSchema);

export default User;