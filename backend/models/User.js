const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    verifytoken: {
        type: String,
    },
    isAdmin: {type: Boolean, default: false},
},
    { timestamps: true }
);


module.exports = mongoose.model("Users", userSchema);
