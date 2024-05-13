import { serverAddress, appSecret } from "../main.js";

async function signupUser(username, email, password, confirmPassword) {
    const data = JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        appSecret: appSecret
    });
    const response = await fetch(serverAddress + "/api/auth/signup", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json();
    return res;
}

export default signupUser;
