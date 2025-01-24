import express from "express";
import 'dotenv/config'
import db from "./config/dbConection.js";
import routes from "./routes/routes.js";
import logger from "./log/logger.js";


db.on("error",console.log.bind(console,'Erro de conexáo'));
db.once("open", () =>{
    console.log('Conexão com o banco feita com sucesso');
});
logger.info('Aplicação iniciada com sucesso.');

const app = express();

app.use(express.json());
routes(app)

export default app;
