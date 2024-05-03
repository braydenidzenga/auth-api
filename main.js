import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, DB, } from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(DB)
    .then(() => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    });
