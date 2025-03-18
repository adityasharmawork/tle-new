const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders) {
        return res.status(401).json({
            message: "No Token Provided in the Request Headers!"
        });
    }

    try {
        const token = authHeaders.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Invalid Token",
        });
    }

}