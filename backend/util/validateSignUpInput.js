import User from "../models/User.js";

async function validateSignupInput(username, email, password, confirmPassword) {
    let valid;
    let errors = [];

    try {
        if (username.trim() === "") {
            errors.push("Username cannot be empty");
        } else {
            const usernameCheck = await User.findOne({username});
            if (usernameCheck) {
                errors.push("Username in use");
            }
        }

        if (email.trim() === "") {
            errors.push("Email cannot be empty");
        } else if (!validateEmail(email)) {
            errors.push("Not a valid email");
        }

        const emailCheck = await User.findOne({email});
        if (emailCheck) {
            errors.push("Email in use");
        }

        if (password.trim() === "") {
            errors.push("Password cannot be empty");
        } else if (password !== confirmPassword) {
            errors.push("Passwords do not match");
        }

        if (errors.length === 0) {
            valid = true;
        } else {
            valid = false;
        }

        return {
            errors,
            valid
        }
    } catch (err) {
        console.log(err);
        errors.push("Internal server error");
        valid = false;
        return {
            errors,
            valid
        }
    }
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default validateSignupInput;
