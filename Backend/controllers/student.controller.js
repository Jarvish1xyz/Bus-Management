const Student = require('../models/Student');
const University = require('../models/University');
const Bus = require('../models/Bus');
const bcrypt = require('bcrypt');
const Place = require('../models/Place');

exports.getAllStudent = async (req, res) => {
    try {
        const student = await Student.find({ university: req.body.university }).populate('university').populate('bus').populate('pickupPoint');
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
            .populate({
                path: "bus",
                populate: {
                    path: "routes.points",
                    select: "name"
                }
            })
            .populate({
                path: "bus",
                populate: {
                    path: "driver",
                    select: "name phone"
                }
            })
            .populate("pickupPoint", "name")
            .populate("university", "name");

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addStudent = async (req, res) => {
    try {
        const { data, university } = req.body;
        const { name, email, pickupPoint } = data;

        const uni = await University.findById(university).select("_id");
        if (!uni) {
            return res.status(400).json({ msg: "University not found" });
        }


        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const place = await Place.findOne({ name: pickupPoint, university: uni._id }).select("_id");
        const bus = await Bus.findOne({ university: uni._id, "routes.points": place._id }).select("_id");
        if (!bus) {
            return res.status(400).json({ msg: "Bus not found" });
        }
        // console.log(bus);

        const password = email.split('@')[0];

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            university: uni._id,
            bus: bus._id,
            pickupPoint: place._id,
        });
        // console.log(student);

        res.status(200).json({
            msg: "Student registered successfully",
            student: {
                id: student._id,
                email: student.email
            }
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        res.json({ msg: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateStudent = async (req, res) => {
    try {

        const { name, email, pickupPoint } = req.body;

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                msg: "Student not found"
            });
        }

        const place = await Place.findOne({
            name: pickupPoint,
            university: student.university
        });

        if (!place) {
            return res.status(404).json({
                msg: "Pickup point not found"
            });
        }

        const bus = await Bus.findOne({
            university: student.university,
            "routes.points": place._id
        });

        if (!bus) {
            return res.status(404).json({
                msg: "Bus not found for selected pickup point"
            });
        }

        student.name = name;
        student.email = email;
        student.pickupPoint = place._id;
        student.bus = bus._id;

        await student.save();

        res.status(200).json({
            msg: "Student updated successfully",
            student
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
};

exports.updateStudentProfile = async (req, res) => {
    try {
        const {name, email, phone} = req.body;
        
        const student = await Student.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
        }, {
            returnDocument: "after",
        });

        if(!student) {
            return res.status(404).json({msg: "Student not found"});
        }

        res.json({
            msg: "Student updated successfully",
            student,
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}