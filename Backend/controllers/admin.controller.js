const Admin = require('../models/Admin');
const University = require('../models/University');
const bcrypt = require('bcrypt');

exports.getAllAdmin = async (req, res) => {
    try {
        const admin = await Admin.find().populate('university');
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).populate('university');
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addAdmin = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, university } = req.body;
        console.log(name, email, password, confirmPassword, university);

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const uni = await University.findById(university).select("_id");

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            university: uni._id,
        });
        console.log(admin);

        res.status(200).json({
            msg: "Admin registered successfully",
            admin: {
                id: admin._id,
                email: admin.email,
                university: admin.university,
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}