import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UsersSchema = new Schema({        
    firstName   : { type: String, default: null },
    lastName    : { type: String, default: null },
    role        : { type: String, default: "User", enum: ['SuperAdmin', 'User'] },
    email       : { type: String, default: null },
    password    : { type: String, default: null },
    status      : { type: String, default : "Active", enum: ['Active', 'Deleted']},
    updated_at  : { type: Number, default: +new Date() },
    created_at  : { type: Number, default: +new Date() }
});

const Users = mongoose.model('users', UsersSchema);
export default Users