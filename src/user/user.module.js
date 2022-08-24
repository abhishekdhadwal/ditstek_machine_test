import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();
const { SALT_ROUNDS } = process.env;
import { ERROR } from '../config/index.config.js';
import * as Models from '../models/index.model.js';
import common_module from './common.module.js';


class user_module extends common_module {

    static create = async (req) => {
        try {
            let { email } = req.body, { token } = req.headers;
            let retrive_users = await this.verify_email(email)
            if (retrive_users.length) {
                throw ERROR.EMAIL_ERROR;
            }
            else {
                let User;
                let total_users = await Models.Users.countDocuments()
                if (total_users > 0) {
                    if (!token) {
                        throw ERROR.TOKEN_REQUIRED;
                    }
                    else {
                        User = await this.save_user_details(req.body, "User")
                    }
                }
                else {
                    console.log("case_2...")
                    User = await this.save_user_details(req.body, "SuperAdmin")
                }
                let access_token = await this.retrive_user_token(User)
                User._doc["access_token"] = access_token
                return User
            }
        }
        catch (err) {
            throw err;
        }
    }

    static save_user_details = async (payload, role) => {
        try {
            let data_to_save = payload
            let { email, password } = payload;
            let hash = bcrypt.hashSync(password, parseInt(SALT_ROUNDS));

            data_to_save.email = email.toLowerCase();
            data_to_save.password = hash;
            data_to_save.role = role;
            data_to_save.updated_at = +new Date();
            data_to_save.created_at = +new Date();

            let User = await Models.Users.create(data_to_save);
            return User
        }
        catch (err) {
            throw err;
        }
    }

    static login = async (req) => {
        try {
            let { email, password } = req.body;
            let query = {
                email: email.toLowerCase()
            }
            let projection = { __v: 0 }
            let options = { lean: true }
            let User = await Models.Users.find(query, projection, options)
            if (!User.length) {
                throw ERROR.EMAIL_NOT_FOUND;
            }
            else {
                let { password: hash } = User[0]
                let decrypt = bcrypt.compareSync(password, hash);
                if (decrypt != true) {
                    throw ERROR.WRONG_PASSWORD;
                }
                else {
                    let access_token = await this.retrive_user_token(User[0])
                    User[0].access_token = access_token
                    return User[0]
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    static update_user_profile = async (req) => {
        try {

            let { _id, firstName, lastName, role, email, password, status } = req.body;
            let query = { _id: _id }
            let update = { updated_at: +new Date() }
            if (!!firstName) { update.firstName = firstName }
            if (!!lastName) { update.lastName = lastName }
            if (!!role) { update.role = role }
            if (!!email) {
                // check other user email
                let check_email = await this.check_other_user_email(_id, email.toLowerCase())
                if (check_email.length) {
                    throw ERROR.EMAIL_ERROR;
                }
                else {
                    update.email = email.toLowerCase()
                }
            }
            if (!!password) {
                let hash = bcrypt.hashSync(password, parseInt(SALT_ROUNDS));
                update.password = hash
            }
            if (!!status) { update.status = status }
            let options = { new : true }
            let User = await Models.Users.findOneAndUpdate(query, update, options);
            return User
        }
        catch (err) {
            throw err;
        }
    }

    static retrive_users = async (req) => {
        try {

            let { pagination, limit } = req.query;
            let query = { is_deleted: false }
            let projection = { __v: 0, is_deleted: 0 }
            let options = {
                lean: true,
                sort: { _id: -1 },
                skip: !pagination ? 0 : parseInt(pagination) * !limit ? 10 : parseInt(limit),
                limit: !limit ? 10 : parseInt(limit)
            }
            let Users = await Models.Users.find(query, projection, options);
            let Count = await Models.Users.count(query)
            return {
                Count: Count,
                Users: Users
            }

        }
        catch (err) {
            throw err;
        }
    }

    static delete_user = async (req) => {
        try {

            let { _id } = req.params;
            let query = { _id: _id }
            let delete_user = await Models.Users.deleteOne(query)
            return delete_user
        }
        catch (err) {
            throw err;
        }
    }


}

export default user_module