import jwt from 'jsonwebtoken'
import { config } from 'dotenv';
config();
const { USER_SK } = process.env;

const generate_token = async (token_data) => {
    try {
        let secret_key = null;
        if (token_data.scope == "USER") { secret_key = USER_SK }
        const token = jwt.sign(token_data, secret_key, { expiresIn: "8h" });
        return token;
    }
    catch (err) {
        throw err;
    }
}

const verify_token = async (req, res, next) => {
    try {

        let { token } = req.headers, api_path = req.originalUrl
        let user_path = api_path.includes("App");

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "UNAUTHORIZED",
                message: "Access denied."
            });
        }
        else {
            if (user_path) {
                const decoded = jwt.verify(token, USER_SK);
                if(decoded.role == "SuperAdmin") {
                    req.user_data = decoded;
                    next();
                }
                else {
                    return res.status(400).json({
                        success: false,
                        error: "INSUFFICIENT PERMISSIONS",
                        message: "Sorry you are not having sufficient permissions to perform this action.",
                    });
                }
            }
        }

    }
    catch (err) {
        return res.status(401).json({
            success: false,
            error: "UNAUTHORIZED",
            message: "Access denied."
        });
    }
}





export {
    generate_token,
    verify_token
}