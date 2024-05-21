import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcyrpt from "bcryptjs";

import { PORT, DB, JWT } from "./config.js";
import authRoute from "./routes/auth.js";
import settingsRoute from "./routes/settings.js";
import dashboardRoute from "./routes/dashboard.js";
import App from "./models/App.js";
import { makeSecret } from "./util/appSecret.js";
import DashboardUser from "./models/DashboardUser.js";

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
        await checkForAdminUser();
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

// Checks if there is a admin user, if not creates one
async function checkForAdminUser() {
    const adminUser = await DashboardUser.findOne({username: "admin"});
    if (!adminUser) {
        const hashPass = await bcyrpt.hash("admin", 12);

        const newAdminUser = new DashboardUser({
            username: "admin",
            password: hashPass,
        });
        await newAdminUser.save();

        console.log("dashboard username: admin");
        console.log("dashboard password: admin");
    }
}
