const Place = require('../models/Place');
const University = require('../models/University');
const Bus = require('../models/Bus');
const Student = require('../models/Student');

exports.getAllPlace = async (req, res) => {
    try {
        const place = await Place.find({ university: req.body.university }).populate('university');
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);

        const buses = await Bus.find({
            "routes.points": req.params.id,
            university: req.body.university
        })
            .populate('driver')
            .populate('university')
            .populate({
                path: "routes.points",
                select: "name"
            });

        const students = await Student.find({
            pickupPoint: req.params.id,
            university: req.body.university
        })
            .populate("bus")
            .populate("pickupPoint");

        const data = {
            ...place.toObject(),
            buses,
            students,
            totalBuses: buses.length,
            totalStudents: students.length
        };

        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

exports.addPlace = async (req, res) => {
    try {
        const { names, university } = req.body;

        const uni = await University.findById(university).select("_id");

        for (const place of names) {
            const path = await Place.create({
                name: place,
                university: uni._id,
            });
        }

        res.status(200).json({
            msg: "Place registered successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Place deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updatePlace = async (req, res) => {
    try {
        const { name } = req.body;

        const place = await Place.findByIdAndUpdate(
            req.params.id,
            { name },
            { returnDocument: "after" }
        );

        res.status(200).json({
            msg: "Place updated successfully",
            place
        });
    }catch(err) {
        res.status(500).json({ error: err.message });
    }
}