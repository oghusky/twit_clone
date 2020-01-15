const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        unique: true,
    },
    password:
    {
        type: String,
    },
    avatar:
    {
        type: String,
        default: "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
    },
    realname: String,
    email: {
        type: String,
        unique: true,
    },
    bio: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);