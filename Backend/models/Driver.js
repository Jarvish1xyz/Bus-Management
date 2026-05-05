const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        salary: { type: Number, required: true },
        shift: { type: String, enum: ['First', 'Second', 'Both'] },
        address: String,
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        phone: String,
        university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
