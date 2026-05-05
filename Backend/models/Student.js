const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        phone: { type: String, unique: true, sparse: true },
        university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
        bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
        pickupPoint: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
