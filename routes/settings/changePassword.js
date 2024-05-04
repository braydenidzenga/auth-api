import bcrypt from "bcryptjs";
import { verifyToken } from "../../util/token.js";

async function changePassword(req) {
    const { token, oldPassword, newPassword, confirmNewPassword } = req.body;
    let statusCode = 200;
    let resMessage = {};

    try {
        const user = await verifyToken(token);
        if (user === null) {
            statusCode = 400;
            resMessage = {"message": "Bad token"};
            return {
                statusCode,
                resMessage
            }
        }

        const passMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passMatch) {
            statusCode = 400;
            resMessage = {"message": "password incorect"};
            return {
                statusCode,
                resMessage
            }
        }

        if (newPassword !== confirmNewPassword) {
            statusCode = 400;
            resMessage = {"message": "passwords do not match"};
            return {
                statusCode,
                resMessage
            }
        }

        const newPass = await bcrypt.hash(newPassword, 12);
        user.password = newPass;
        await user.save();

        resMessage = {"message": "password changed"};
        return {
            statusCode,
            resMessage
        }
    } catch (err) {
        console.log(err);
        statusCode = 500;
        resMessage = {"message": "Internal server error"};
        return {
            statusCode,
            resMessage
        }
    }
}

export default changePassword;
