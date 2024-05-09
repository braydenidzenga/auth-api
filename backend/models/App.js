import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    appSecret: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const App = mongoose.model("App", appSchema);
export default App;
