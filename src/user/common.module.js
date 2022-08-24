// import { ERROR } from '../config/index.config.js';
import { config } from 'dotenv';
config();
const { USER_SCOPE } = process.env;
import * as Models from '../models/index.model.js';
import { generate_token } from '../auth/index.auth.js';


class common_module {

    static verify_email = async (email) => {
        try {
            let query = {
                email: email.toLowerCase()
            }
            let projection = { _id: 1 }
            let options = { lean: true }
            let users = await Models.Users.find(query, projection, options)
            return users

        }
        catch (err) {
            throw err;
        }
    }

    static retrive_users = async () => {
        try {
            let query = {}
            let projection = { _id: 1 }
            let options = { lean: true }
            let users = await Models.Users.find(query, projection, options)
            return users
        }
        catch (err) {
            throw err;
        }
    }

    static check_other_user_email = async (_id, email) => {
        try {
            let query = {
                _id : { $ne : _id },
                email: email.toLowerCase()
            }
            let projection = { _id: 1 }
            let options = { lean: true }
            let users = await Models.Users.find(query, projection, options)
            return users

        }
        catch (err) {
            throw err;
        }
    }

    static retrive_user_token = async (user_data) => {
        try {
            let { _id, role } = user_data
            let token_data = {
                _id: _id,
                role : role,
                scope: USER_SCOPE,
                token_gen_at: +new Date()
            }
            let access_token = await generate_token(token_data)
            return access_token
        }
        catch (err) {
            throw err;
        }
    }

}

export default common_module