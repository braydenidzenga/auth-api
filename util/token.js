import jsonwebtoken from "jsonwebtoken";
import { JWT } from "../config.js";
import User from "../models/User.js";

export const genToken = (user) => {
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

export const verifyToken = async (token) => {
    let decoded;
    let user;

    try {
        decoded = jsonwebtoken.verify(token, JWT);
        user = await User.findOne({ email: decoded.email });
    } catch (err) {
        return null;
    }

    return user;
}
