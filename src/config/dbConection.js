import mongoose from "mongoose"

mongoose.connect(`mongodb+srv://${process.env.DBUSUARIO}:${process.env.DBSENHA}@estudo.jn79rhc.mongodb.net/transacoesFinanceiras`)

let db = mongoose.connection;

export default db;