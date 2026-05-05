const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
    {
        busNo: { type: Number, required: true },
        numberPlate: { type: String, required: true },
        driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
        routes: [
            {
                shift: {
                    type: String,
                    enum: ["First", "Second"],
                    required: true
                },
                startTime: {
                    type: String,
                    required: true
                },
                points: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Place"
                    }
                ]
            }
        ],
        lastServiced: { type: Date, default: Date.now },
        university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bus", busSchema);
