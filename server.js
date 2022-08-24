
import express from 'express';
import { config } from 'dotenv';
config();
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect_to_db } from './src/config/index.config.js';
import user_routes from './src/user/user.routes.js';
import swagger_ui from 'swagger-ui-express';
import openapi_docs from './openapi.json' assert {type: "json"};

const app = express();
const { ENVIRONMENT, LOCAL_PORT, PROD_PORT } = process.env;
const PORT = ENVIRONMENT == 'LOCAL' ? LOCAL_PORT : PROD_PORT;


app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// connect mongodb
connect_to_db();

app.get('/', (req, res) => { res.send('Hello World!') })
app.use("/App", user_routes)

// make swagger documentation
let openapi_options = { customSiteTitle: "Machine Test Api Documentation" };
app.use('/docs', swagger_ui.serve, swagger_ui.setup(openapi_docs, openapi_options));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})