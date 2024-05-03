import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import validateSignupInput from "../util/validateSignUpInput.js";
import { genToken, verifyToken } from "../util/token.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    try {
        const { errors, valid } = await validateSignupInput(username, email, password, confirmPassword)
        if (!valid) {
            return res.status(400).json({
                message: "Error signing up",
                errors
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

    try {
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = new User({
           username,
           email,
           password: hashPass
        });

        await newUser.save();
        const token = genToken(newUser);

        return res.status(200).json({
            message: "Signed up",
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
});

router.post("/loginWithUsername", async (req,res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({
                message: "invalid credentials"
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({
                message: "invalid credentials"
            });
        }

        const token = genToken(user);
        return res.status(200).json({
            message: "Logged in",
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/loginWithEmail", async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = genToken(user);
        return res.status(200).json({
            message: "Logged in",
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/getuser", async (req,res) => {
    const { token } = req.body;

    try {
        const user = await verifyToken(token);
        if (user === null) {
            return res.status(400).json({
                message: "Bad token",
            })
        }

        const data = {
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        };
        return res.status(200).json({
            data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default router;
