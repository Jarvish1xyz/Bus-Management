const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ msg: "No token, access denied" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mom_secret");
        req.user = decoded; // { id, role }
        // console.log(req.body);
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

exports.adminMiddleware = (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            next();
        }
        else {
            throw new Error('Unauthorized Role');
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};


exports.driverMiddleware = (req, res, next) => {
    try {
        // console.log(req.body);
        if (req.user.role === "driver") {
            next();
        }
        else {
            throw new Error('Unauthorized Role');
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};


exports.studentMiddleware = (req, res, next) => {
    try {
        if (req.user.role === "student") {
            next();
        }
        else {
            throw new Error('Unauthorized Role');
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};