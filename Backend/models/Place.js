const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
