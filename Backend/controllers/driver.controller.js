const Driver = require('../models/Driver');
const University = require('../models/University');
const Bus = require('../models/Bus');
const bcrypt = require('bcrypt');


exports.getAllDriver = async (req, res) => {
    try {
        const driveres = await Driver.find({ university: req.body.university }).populate('university');
        res.json(driveres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getDriverById = async (req, res) => {
    try {

        const driver = await Driver.findById(req.params.id);

        const buses = await Bus.find({
            driver: req.params.id,
            university: req.body.university
        }).populate({
            path: "routes.points",
            select: "name"
        });

        res.status(200).json({
            driver,
            buses
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};

exports.addDriver = async (req, res) => {
    try {

        const { data, university } = req.body;
        // console.log(data);
        const { name, salary, shift, address, email, phone } = data;

        const existingDriver = await Driver.findOne({ email });
        if (existingDriver) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        const password = email.split('@')[0];

        const hashedPassword = await bcrypt.hash(password, 10);

        const uni = await University.findById(university).select("_id");

        const driver = await Driver.create({
            name,
            salary,
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

exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        if (!driver) {
            return res.status(404).json({ msg: "Driver not found" });
        }
        res.json({ msg: "Driver deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateDriver = async (req, res) => {
    try {

        const updatedDriver = await Driver.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                salary: req.body.salary,
                shift: req.body.shift,
            },
            { returnDocument: "after" }
        );

        res.status(200).json({
            msg: "Driver updated successfully",
            driver: updatedDriver
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
};

exports.updateDriverProfile = async (req, res) => {
    try {
        const {name, email, phone} = req.body;
        
        const driver = await Driver.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
        }, {
            returnDocument: "after",
        });

        if(!driver) {
            return res.status(404).json({msg: "Driver not found"});
        }

        res.json({
            msg: "Driver updated successfully",
            driver,
        });
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}