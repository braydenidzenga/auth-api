import signUpUser from "./auth/signup.js";
import { loginWithEmail, loginWithUsername } from "./auth/login.js";
import { changePassword } from "./settings.js";

export let serverAddress;
export let appSecret;

function connect(serverAddr, secret) {
    serverAddress = serverAddr;
    appSecret = secret;
}

const sdk = {
    connect,
    signUpUser,
    loginWithEmail,
    loginWithUsername,
    changePassword
};
export default sdk;
