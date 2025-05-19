const { verifyJWT } = require("../../admin/utils/tokenUtils");

// This is the correct way to export a single function
module.exports = function authenticateResearcher(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.authToken;
    
    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const payload = verifyJWT(token);
        
        if (payload.role !== 'researcher') {
            return res.status(403).json({ error: "Access restricted to researchers" });
        }

        req.user = {
            userId: payload.userId,
            role: payload.role
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};