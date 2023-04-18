const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json("You are not authenticated!");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
    });
};


module.exports = authenticate;