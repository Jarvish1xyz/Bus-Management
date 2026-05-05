const Driver = require('../models/Driver');
const University = require('../models/University');
const bcrypt = require('bcrypt');


exports.getAllDriver = async (req, res) => {
    try {
        const driveres = await Driver.find({university: req.params.university}).populate('university');
        res.json(driveres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id).populate('university');
        res.json(driver);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addDriver = async (req, res) => {
    try {

        const { name, Salary, shift, address, email, phone, university } = req.body;

        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const password = email.split('@')[0];

        const hashedPassword = await bcrypt.hash(password, 10);

        const uni = await University.findById(university).select("_id");

        const driver = await Driver.create({
            name,
            Salary,
            shift,
            address,
            email,
            password: hashedPassword,
            phone,
            university: uni._id,
        });

        res.status(200).json({
            msg: 'New Driver Added successfully',
            driver,
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}