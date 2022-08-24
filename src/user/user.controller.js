import user_module from './user.module.js';

class user_controller extends user_module {

    static create_user = async (req, res) => {
        try {
            let response = await this.create(req)
            let message = "Success";
            res.send({
                success: true,
                message: message,
                data: response
            });
        }
        catch (err) {
            console.log("err...",err)
            let status_code = err.status_code != undefined ? err.status_code : 400;
            let type = err.type != undefined ? err.type : "Bad Request";
            let message = err.custom_msg != undefined ? err.custom_msg : "Something went wrong";
            res.status(status_code).send({
                success: false,
                error: type,
                message: message
            });
            res.end();
        }
    }

    static user_login = async (req, res) => {
        try {
            let response = await this.login(req)
            let message = "Success";
            res.send({
                success: true,
                message: message,
                data: response
            });
        }
        catch (err) {
            let status_code = err.status_code != undefined ? err.status_code : 400;
            let type = err.type != undefined ? err.type : "Bad Request";
            let message = err.custom_msg != undefined ? err.custom_msg : "Something went wrong";
            res.status(status_code).send({
                success: false,
                error: type,
                message: message
            });
            res.end();
        }
    }

    static update_users = async (req, res) => {
        try {
            let response = await this.update_user_profile(req)
            let message = "Success";
            res.send({
                success: true,
                message: message,
                data: response
            });
        }
        catch (err) {
            console.log("err...",err)
            let status_code = err.status_code != undefined ? err.status_code : 400;
            let type = err.type != undefined ? err.type : "Bad Request";
            let message = err.custom_msg != undefined ? err.custom_msg : "Something went wrong";
            res.status(status_code).send({
                success: false,
                error: type,
                message: message
            });
            res.end();
        }
    }
    
    static list_users = async (req, res) => {
        try {
            let response = await this.retrive_users(req)
            let message = "Success";
            res.send({
                success: true,
                message: message,
                data: response
            });
        }
        catch (err) {
            let status_code = err.status_code != undefined ? err.status_code : 400;
            let type = err.type != undefined ? err.type : "Bad Request";
            let message = err.custom_msg != undefined ? err.custom_msg : "Something went wrong";
            res.status(status_code).send({
                success: false,
                error: type,
                message: message
            });
            res.end();
        }
    }

    static delete_a_user = async (req, res) => {
        try {
            let response = await this.delete_user(req)
            let message = "Success";
            res.send({
                success: true,
                message: message,
                data: response
            });
        }
        catch (err) {
            let status_code = err.status_code != undefined ? err.status_code : 400;
            let type = err.type != undefined ? err.type : "Bad Request";
            let message = err.custom_msg != undefined ? err.custom_msg : "Something went wrong";
            res.status(status_code).send({
                success: false,
                error: type,
                message: message
            });
            res.end();
        }
    }

}

export default user_controller