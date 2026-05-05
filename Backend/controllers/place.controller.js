const Place = require('../models/Place');
const University = require('../models/University');

exports.getAllPlace = async (req, res) => {
    try {
        const place = await Place.find({university: req.body.university}).populate('university');
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addPlace = async (req, res) => {
    try {
        const { names, university } = req.body;

        const uni = await University.findById(university).select("_id");

        for (const place of names) {
            const path = await Place.create({
                name:place,
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