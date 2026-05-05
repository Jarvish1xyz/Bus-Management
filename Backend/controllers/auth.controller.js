const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Driver = require("../models/Driver");
const Student = require("../models/Student");

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Admin login attempt:", email, password);

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: "admin",
                email: admin.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            msg: "Login successful",
            token,
            user: {
                id: admin._id,
                email: admin.email,
                role: "admin",
                name: admin.name,
                university: admin.university,
            }
        });

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

exports.driverLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: driver._id,
                role: "driver",
                email: driver.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            msg: "Login successful",
            token,
            user: {
                id: driver._id,
                email: driver.email,
                role: "driver",
                name: driver.name,
                university: driver.university,
            }
        });

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};
exports.studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields required" });
        }

        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: student._id,
                role: "student",
                email: student.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            msg: "Login successful",
            token,
            user: {
                id: student._id,
                email: student.email,
                role: "student",
                name: student.name,
                university: student.university,
            }
        });

    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};