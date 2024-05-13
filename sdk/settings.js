import { serverAddress, appSecret } from "./main.js";

export async function changePassword(token, oldPassword, newPassword, confirmNewPassword) {
    const data = JSON.stringify({
        token: token,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
        appSecret: appSecret
    });
    
    const response = await fetch(serverAddress + "/api/settings/changePassword", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json();
    return res;
}
