import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { PORT, DB, } from "./config.js";
import authRoute from "./routes/auth.js";
import settingsRoute from "./routes/settings.js";
import dashboardRoute from "./routes/dashboard.js";
import App from "./models/App.js";
import { makeSecret } from "./util/appSecret.js";

const app = express();
// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/dashboard", dashboardRoute);

// database connection and server listening
mongoose.connect(DB)
    .then(async () => {
        console.log("connected to database");
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
        await checkForDefaultApp();
    });

// Checks if there is a default app registered, if not, creates one
async function checkForDefaultApp() {
    const defaultApp = await App.findOne({name: "default"});
    if (!defaultApp) {
        const newApp = new App({
            name: "default",
            appSecret: makeSecret(128),
        });
        await newApp.save();
        console.log("default app secret: " + newApp.appSecret);
    }
}
