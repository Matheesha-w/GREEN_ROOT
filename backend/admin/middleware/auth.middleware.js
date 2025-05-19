const { verifyJWT } = require("../utils/tokenUtils");

const validateUser = (req, res, next) => {
    const { firstName, lastName, address, phone, email, password, role } = req.body;

    if (!firstName || !lastName || !address || !phone || !email || !password || !role) {
        return res.status(400).json({ error: `All fields are required!` });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: `Password must be at least 6 characters long!` });
    }

    next();
};

// autheticate user
const authenticateUser = (req, res, next) => {
    try {
        const { authToken } = req.cookies;

        if (!authToken) {
            return res.status(400).json({ err: `Authentication invalid!` });
        }

        const payload = verifyJWT(authToken);

        if (!payload) {
            return res.status(401).json({ err: `Authentication invalid!` });
        }

        req.user = { userId: payload.userId, role: payload.role };
        next();

    } catch (err) {
        res.status(401).json({ message: err });
    }

};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ err: `unauthorized to access this route!` });
        }
        next();
    }
};

module.exports = {
    validateUser,
    authenticateUser,
    authorizePermissions
};
