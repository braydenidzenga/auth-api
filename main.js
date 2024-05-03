import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, DB, } from "./config.js";
import authRoute from "./routes/auth.js";

const app = express();
// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoute);

mongoose.connect(DB)
    .then(() => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    });
