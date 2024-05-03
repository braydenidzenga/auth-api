import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { JWT } from "../config.js";

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

async function validateSignupInput(username, email, password, confirmPassword) {
    let valid;
    let errors = [];

    try {
        if (username.trim() === "") {
            errors.push("Username cannot be empty");
        } else {
            const usernameCheck = await User.findOne({username});
            if (usernameCheck) {
                errors.push("Username in use");
            }
        }

        if (email.trim() === "") {
            errors.push("Email cannot be empty");
        } else if (!validateEmail(email)) {
            errors.push("Not a valid email");
        }

        const emailCheck = await User.findOne({email});
        if (emailCheck) {
            errors.push("Email in use");
        }

        if (password.trim() === "") {
            errors.push("Password cannot be empty");
        } else if (password !== confirmPassword) {
            errors.push("Passwords do not match");
        }

        if (errors.length === 0) {
            valid = true;
        } else {
            valid = false;
        }

        return {
            errors,
            valid
        }
    } catch (err) {
        console.log(err);
        errors.push("Internal server error");
        valid = false;
        return {
            errors,
            valid
        }
    }
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function genToken(user) {
    try {
        const token = jsonwebtoken.sign({
            id: user._id,
            username: user.username,
            email: user.email
        }, JWT, {"expiresIn": "1h"});
        return token;
    } catch (err) {
        console.log(err);
        return;
    }
}

export default router;
