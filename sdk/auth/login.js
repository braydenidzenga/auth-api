import { serverAddress, appSecret } from "../main.js";

export async function loginWithUsername(username, password) {
    const data = JSON.stringify({
        username: username,
        password: password,
        appSecret: appSecret
    });
    const response = await fetch(serverAddress + "/api/auth/loginWithUsername", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json();
    return res;
}

export async function loginWithEmail(email, password) {
    const data = JSON.stringify({
        email: email,
        password: password,
        appSecret: appSecret
    });
    const response = await fetch(serverAddress + "/api/auth/loginWithEmail", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json();
    return res;
}
