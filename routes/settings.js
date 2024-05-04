import express from "express";
import changePassword from "./settings/changePassword.js";

const router = express.Router();

router.post("/changePassword", async (req,res) => {
    const { statusCode, resMessage } = await changePassword(req);
    return res.status(statusCode).json(resMessage);
})

export default router;
