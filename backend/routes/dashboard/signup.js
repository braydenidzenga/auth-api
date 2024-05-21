import { verifyAdminToken } from "../../util/adminToken.js";
import { verifySecret } from "../../util/appSecret.js";
import DashboardUser from "../../models/DashboardUser.js";

async function signup(req) {
    const { token, appSecret, username, password } = req.body;
    let statusCode = 200;
    let resMessage = {};

    try {
        const auth = await verifytSecret(appSecret);
        if (auth === null) {
            statusCode = 400;
            resMessage = {"message": "Not authorized"};
            return {
                statusCode,
                resMessage
            }
        }

        const user = await verifyAdminToken(token);
        if (user === null) {
            statusCode = 400;
            resMessage = {"message": "Bad token"};
            return {
                statusCode,
                resMessage
            }
        }

        const newAdminUser = new DashboardUser({
            username,
            password
        });
        await newAdminUser.save();
        statusCode = 200;
        resMessage = {"message": "Signed up"};
        return {
            statusCode,
            resMessage
        }
    } catch (err) {
        console.log(err);
        statusCode = 400;
        resMessage = {"message": "Internal server error."};
        return {
            statusCode,
            resMessage
        }
    }
}

export default signup;
