import jsonwebtoken from "jsonwebtoken";
import DashboardUser from "../models/DashboardUser.js";
import { JWT } from "../config.js";

export function genAdminToken(user) {
    const token = jsonwebtoken.sign({
        id: user._id,
        username: user.username
    }, JWT, {expiresIn: "1h"});
    return token
}

export async function verifyAdminToken(token) {
    let decoded;
    let user;

    try {
        decoded = jsonwebtoken.decode(token, JWT);
        user = await DashboardUser.findOne({username: decoded.username});
    } catch (err) {
        return null;
    }

    return user;
}
