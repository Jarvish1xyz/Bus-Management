const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
    {
        busNo: { type: Number, required: true },
        numberPlate: { type: String, Required: true },
        driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
        shift: { type: String, enum: ['First', 'Second', 'Both'] },
        routes: [
            {
                startTime: Date,
                points: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }]
            }
        ],
        lastServiced: { type: Date, required: true, default: Date.now },
        university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);
