import bcrypt from "bcryptjs";
import User from "../../models/User.js"; 
import { genToken } from "../../util/token.js";
import validateSignupInput from "../../util/validateSignUpInput.js";

async function signUp(req) {
    const { username, email, password, confirmPassword } = req.body;
    let statusCode = 200;
    let resMessage = {};

    const { errors, valid } = await validateSignupInput(username,email,password,confirmPassword)
    if (!valid) {
        statusCode = 400;
        resMessage = errors;
        return {
            statusCode,
            resMessage
        };
    }

    try {
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = new User({
           username,
           email,
           password: hashPass
        });

        await newUser.save();
        const token = genToken(newUser);

        statusCode = 200;
        resMessage = {
            "message": "Signed up",
            "token": token
        };
        return {
            statusCode,
            resMessage
        }
    } catch (err) {
        console.log(err);
        statusCode = 500;
        resMessage = {"message": "internal server error"};
        return {
            statusCode,
            resMessage
        }
    }
}

export default signUp;
