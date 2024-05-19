import bcrypt from "bcryptjs";
import DashboardUser from "../../models/DashboardUser.js";
import { verifySecret } from "../../util/appSecret.js";
import { genAdminToken } from "../../util/adminToken.js";


async function login(req) {
    const { username, password, appSecret } = req.body;
    let statusCode = 200;
    let resMessage;

    try {
        const validApp = await verifySecret(appSecret);
        if (!validApp) {
            statusCode = 400;
            resMessage = {message: "Not authorized!"};
            return {
                statusCode,
                resMessage
            }
        }

        const user = await DashboardUser.findOne({username:username});
        if (!user) {
            statusCode = 400;
            resMessage = {message: "Invalid credentials"};
            return {
                statusCode,
                resMessage
            }
        }

        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            statusCode = 400;
            resMessage = {message: "Invalid credentials"}
            return {
                statusCode,
                resMessage
            }
        }

        const token = genAdminToken(user);
        resMessage = {
            message: "Logged in",
            token: token
        }
        return {
            statusCode,
            resMessage
        }
    } catch (err) {
        console.log(err);
        resMessage = {message: "Internal server error!"};
        statusCode = 500;
        return {
            statusCode,
            resMessage
        }
    }
}

export default login;
