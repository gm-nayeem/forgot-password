const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        res.status(201).json({ status: 201, user });
    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
}

module.exports = getUser;