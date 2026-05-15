const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        phone: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("University", universitySchema);
