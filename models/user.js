const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    sub: String,
    name: String,
    email: String,
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema);