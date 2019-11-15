const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dreamSchema = new Schema({
    title: String,
    content: String,
    created_at: { type: Date, default: Date.now },
    category: String,
    user_id: String
})

module.exports = mongoose.model("Dream", dreamSchema);