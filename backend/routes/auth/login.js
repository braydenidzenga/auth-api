import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { genToken } from "../../util/token.js";

export async function loginWithUsername(req) {
    const { username, password } = req.body;
    let statusCode = 200;
    let resMessage = {}

    try {
        const user = await User.findOne({username});
        if (!user) {
            statusCode = 400;
            resMessage = {"message": "Invalid credentials"};
            return {
                statusCode,
                resMessage
            }
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            statusCode = 400;
            resMessage = {"message": "Invalid credentials"}
            return {
                statusCode,
                resMessage
            }
        }

        const token = genToken(user);
        statusCode = 200;
        resMessage = {
            "message": "Logged in",
            "token": token
        };
        return {
            statusCode,
            resMessage
        }
    }
    catch (err) {
        console.log(err);
        statusCode = 500;
        resMessage = {"message": "internal server error"};
        return {
            statusCode,
            resMessage
        }
    }
}

export async function loginWithEmail(req) {
    const { email, password } = req.body;
    let statusCode = 200;
    let resMessage = {}

    try {
        const user = await User.findOne({email});
        if (!user) {
            statusCode = 400;
            resMessage = {"message": "Invalid credentials"};
            return {
                statusCode,
                resMessage
            }
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            statusCode = 400;
            resMessage = {"message": "Invalid credentials"};
            return {
                statusCode,
                resMessage
            }
        }

        const token = genToken(user);
        statusCode = 200;
        resMessage = {
            "message": "Logged in",
            "token": token
        }
        return {
            statusCode,
            resMessage
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
