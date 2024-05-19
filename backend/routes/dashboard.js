import express from "express";
import { banUser, unbanUser } from "./dashboard/banUser.js";
import login from "./dashboard/login.js";
const router = express.Router();

router.post("/banuser", async (req,res) => {
    const { statusCode, resMessage } = await banUser(req);
    return res.status(statusCode).json(resMessage);
});

router.post("/unbanuser", async (req,res) => {
    const { statusCode, resMessage } = await unbanUser(req);
    return res.status(statusCode).json(resMessage);
});

router.post("/login", async (req,res) => {
    const { statusCode, resMessage } = await login(req);
    return res.status(statusCode).json(resMessage);
})

export default router;
