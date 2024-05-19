import mongoose from "mongoose";

const DashboardUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const DashboardUserModel = new mongoose.model("DashboardUser", DashboardUserSchema);
export default DashboardUserModel;
