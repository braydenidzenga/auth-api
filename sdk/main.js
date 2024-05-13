let serverAddress;
let appSecret;

function connect(serverAddr, secret) {
    serverAddress = serverAddr;
    appSecret = secret;
}

async function registerUser(username, email, password, confirmPassword) {
    const data = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        appSecret: appSecret
    };
    const payload = JSON.stringify(data);

    const response = await fetch(serverAddress + "/api/auth/signup", {
        method: "POST",
        body: payload,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await response.json();

    return res;
}

const sdk = {connect, registerUser};
export default sdk;
