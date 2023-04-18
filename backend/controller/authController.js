const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const transporter = require('../config/mail');


// register
const registerController = async (req, res) => {
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        return res.status(422).json({ error: "fill all the details" })
    }

    try {
        const preuser = await User.findOne({ email: email });

        if (preuser) {
            return res.status(422).json({ error: "This Email is Already Exist" })
        }

        if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password Not Match" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fname, email,
            password: hashPassword
        });

        await newUser.save();

        res.status(201).json({
            status: 201,
            message: "User created successfully"
        });

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
}

// login
const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "fill all the details" })
    }

    try {
        const userValid = await User.findOne({ email: email });

        if (!userValid) {
            return res.status(401).json({ status: 401, message: "invalid details" });
        }

        const isMatch = await bcrypt.compare(password, userValid.password);

        if (!isMatch) {
            return res.status(422).json({ error: "invalid details" })
        }

        // token generate
        const accessToken = jwt.sign(
            {
                id: userValid._id,
                isAdmin: userValid.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password: pass, ...others } = userValid._doc;

        res.status(200).send({
            status: 200,
            user: others,
            token: accessToken
        });

    } catch (error) {
        res.status(401).json({ status: 401, error });
        console.log("catch block");
    }
}

// logout
const logoutController = (req, res) => {
    console.log("logout");
}


// send link through email for reset password
const sendPasswordLink = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(401).json({ status: 401, message: "Enter Your Email" })
    }

    try {
        const userfind = await User.findOne({ email: email });

        // token generate for reset password
        const token = jwt.sign(
            {
                id: userfind._id,
            },
            process.env.JWT_SEC,
            { expiresIn: "300s" }
        );

        const setusertoken = await User.findByIdAndUpdate(
            { _id: userfind._id },
            { verifytoken: token },
            { new: true }
        );

        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For Password Reset",
                text: `This Link Valid For 3 MINUTES http://localhost:5173/forgotpassword/${userfind._id}/${setusertoken.verifytoken}/`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).send({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).send({ status: 201, message: "Email sent Succsfully" })
                }
            });
        }
    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid user" })
    }
}

// verify user for forgot password time
const forgotPassword = async (req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });
        if(!validuser) {
            return res.status(401).send({ status: 401, message: "user not exist" })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SEC);
        if (!verifyToken.id) {
            return res.status(401).send({ status: 401, message: "user not exist" })
        } 

        res.status(201).send({ status: 201, message: "User varified" })

    } catch (error) {
        return res.status(401).send({ status: 401, error });
    }
}

// change password
const changePassword = async (req, res) => {
    const { id, token } = req.params;
    const { password, cpassword } = req.body;

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });
        if (!validuser) {
            return res.status(401).json({ status: 401, message: "user not exist" })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SEC);
        if (!verifyToken.id) {
            return res.status(401).json({ status: 401, message: "user not exist" })
        }

        if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password Not Match" })
        }

        const newPassword = await bcrypt.hash(password, 10);
        const setNewPassword = await User.findByIdAndUpdate(
            { _id: id }, 
            { password: newPassword },
            {new: true}
        );

        await setNewPassword.save();
        res.status(201).json({ 
            status: 201,
            message: "Password change sucessfully" 
        });
        
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    sendPasswordLink,
    forgotPassword,
    changePassword
};
