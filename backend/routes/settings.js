import express from "express";
import changePassword from "./settings/changePassword.js";
import changeUsername from "./settings/changeUsername.js";
import { verifySecret } from "../util/appSecret.js";

const router = express.Router();

router.post("/changePassword", async (req,res) => {
    const appSecret = req.body.appSecret;

    try {
        const valid = await verifySecret(appSecret);
        if (!valid) {
            return res.status(400).json({
                message: "Not authorized"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

    const { statusCode, resMessage } = await changePassword(req);
    return res.status(statusCode).json(resMessage);
});

router.post("/changeUsername", async (req,res) => {
    const appSecret = req.body.appSecret;

    try {
        const valid = await verifySecret(appSecret);
        if (!valid) {
            return res.status(400).json({
                message: "Not authorized"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

    const { statusCode, resMessage } = await changeUsername(req);
    return res.status(statusCode).json(resMessage);
});

export default router;
