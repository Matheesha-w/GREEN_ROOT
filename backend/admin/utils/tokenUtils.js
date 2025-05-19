const jwt = require('jsonwebtoken');

const createJWToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}

// verify the token
const verifyJWT = (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return payload;

    } catch (error) {
        return { error: 'Invalid or expired token' };
    }
}

module.exports = { createJWToken, verifyJWT };