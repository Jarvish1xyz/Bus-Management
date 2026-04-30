const Student = require('../models/Student');
const University = require('../models/University');
const Bus = require('../models/Bus');
const bcrypt = require('bcrypt');
const Place = require('../models/Place');

exports.getAllStudent = async (req, res) => {
    try {
        const student = await Student.find().populate('university').populate('bus').populate('pickupPoint');
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('university').populate('bus').populate('pickupPoint');
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addStudent = async (req, res) => {
    try {
        const { name, email, university, busNo, pickupPoint } = req.body;

        const uni = await University.findById(university).select("_id");
        if (!uni) {
            return res.status(400).json({ msg: "University not found" });
        }

        const bus = await Bus.findOne({ university: uni._id, busNo: busNo }).select("_id");
        if (!bus) {
            return res.status(400).json({ msg: "Bus not found" });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const place = await Place.findOne({ name: pickupPoint, university }).select("_id");

        const password = email.split('@')[0];

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            university: uni._id,
            bus,
            pickupPoint: place._id,
        });

        res.status(200).json({
            msg: "Student registered successfully",
            student: {
                id: student._id,
                studentId: student.studentId,
                email: student.email
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}