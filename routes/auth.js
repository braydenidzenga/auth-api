import express from "express";
import signUp from "./auth/signup.js";
import { loginWithUsername, loginWithEmail } from "./auth/login.js";
import { verifyToken } from "../util/token.js";

const router = express.Router();

router.post("/signup", async (req,res) => {
    const { statusCode, resMessage } = await signUp(req);
    return res.status(statusCode).json(resMessage); 
});

router.post("/loginWithUsername", async (req,res) => {
    const { statusCode, resMessage } = await loginWithUsername(req);
    return res.status(statusCode).json(resMessage);
});

router.post("/loginWithEmail", async (req,res) => {
    const { statusCode, resMessage } = await loginWithEmail(req);
    return res.status(statusCode).json(resMessage);
});

router.post("/getuser", async (req,res) => {
    const { token } = req.body;

    try {
        const user = await verifyToken(token);
        if (user === null) {
            return res.status(400).json({
                message: "Bad token",
            })
        }

        const data = {
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        };
        return res.status(200).json({
            data
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default router;
