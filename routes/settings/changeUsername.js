import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { verifyToken } from "../../util/token.js";

async function changeUsername(req) {
    const { token, newUsername, password } = req.body;
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

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            statusCode = 400;
            resMessage = {"message": "Invalid credentials"};
            return {
                statusCode,
                resMessage
            }
        }

        const userCheck = await User.findOne({username: newUsername});
        if (userCheck) {
            statusCode = 400;
            resMessage = {"message": "Username in use"};
            return {
                statusCode,
                resMessage
            }
        }

        user.username = newUsername;
        await user.save();
        statusCode = 200;
        resMessage = {"message": "Username changed"}
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

export default changeUsername;
