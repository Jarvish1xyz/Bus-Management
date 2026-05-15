const University = require('../models/University');


exports.getAllUniversity = async (req, res) => {
    try {
        const uni = await University.find();
        res.status(200).json(uni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUniversityById = async (req, res) => {
    try {
        const uni = await University.findById(req.params.id);
        console.log(uni);
        res.status(200).json(uni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addUniversity = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const uni = await University.create({
            name,
            email,
            phone,
        });

        res.status(200).json(uni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

exports.updateUniversity = async (req, res) => {
    try {
        const { uniName, uniEmail, uniPhone } = req.body;
        // console.log(req.params.id);

        const updatedUni = await University.findByIdAndUpdate(
            req.params.id,
            {
                name: uniName,
                email: uniEmail,
                phone: uniPhone,
            },
            { returnDocument: "after" }
        );

        res.status(200).json({
            msg: "University updated successfully",
            university: updatedUni
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}