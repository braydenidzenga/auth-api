import App from "../models/App.js";

export function makeSecret(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export async function verifySecret(appSecret) {
    const app = await App.findOne({appSecret});
    if (!app) {
        return false;
    }
    return true;
}
