import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    watchlist: {
        type: [],
        required: false
    }
})

export default Mongoose.model("User", UserSchema);