'use strict'
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connect_to_db = () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(URI, options);
    mongoose.connection.on("connected", () => {
        console.log("SERVER LOAD")
        console.log("connected to MongoDb");
    });
    mongoose.connection.on("error", (error) => {
        console.log(error);
    });
}
export default connect_to_db
