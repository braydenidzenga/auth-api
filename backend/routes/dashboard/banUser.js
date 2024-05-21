import { verifySecret } from "../../util/appSecret.js";
import { verifyAdminToken } from "../../util/adminToken.js";
import User from "../../models/User.js";

export async function banUser(req) {
    const { token, appSecret, email, reason } = req.body;
    let statusCode = 200;
    let resMessage = {};

    try {
        const valid = await verifySecret(appSecret);
        if (!valid) {
            statusCode = 400;
            resMessage = {"message": "Not authorized"};
            return {
                statusCode,
                resMessage
            }
        }

        const admin = await verifyAdminToken(token);
        if (admin === null) {
            statusCode = 400;
            resMessage = {"message": "Bad token"};
            return {
                statusCode,
                resMessage
            }
        }

        const user = await User.findOne({email});
        if (!user) {
            statusCode = 400;
            resMessage = {"message": "User not found"};
            return {
                statusCode,
                resMessage
            }
        }

        user.banned = true;
        user.banReason = reason;
        await user.save();
        resMessage = {"message": "User banned"};
        return {
            statusCode,
            resMessage 
        } 
    } catch (err) {
        console.log(err);
        statusCode = 500;
        resMessage = {"message": "Internal server error"}
        return {
            statusCode,
            resMessage
        }
    }
}

export async function unbanUser(req) {
    const { appSecret, email } = req.body;
    let statusCode = 200;
    let resMessage = {};

    try {
        const valid = await verifySecret(appSecret);
        if (!valid) {
            statusCode = 400;
            resMessage = {"message": "Not authorized"};
            return {
                statusCode,
                resMessage
            }
        }

        const user = await User.findOne({email});
        if (!user) {
            statusCode = 400;
            resMessage = {"message": "User not found"};
            return {
                statusCode,
                resMessage
            }
        }

        user.banned = false;
        await user.save();
        resMessage = {"message": "User unbanned"};
        return {
            statusCode,
            resMessage 
        }
    } catch (err) {
        console.log(err);
        statusCode = 500;
        resMessage = {"message": "Internal server error"}
        return {
            statusCode,
            resMessage
        }
    }
}
