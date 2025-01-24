import mongoose from "mongoose";
import shortid from "shortid";

const transacaoSchema = new mongoose.Schema({
    _id:{type: String, default: shortid.generate },
    idContaPagador:{type: String , required:true},
    nomePagador:{type: String},
    idContaRecebedor:{type: String , required:true},
    nomeRecebedor:{type: String},
    tipoContaRecebedor: {type: String , required:true},
    tipoTransacao:{type:String , required:true},
    valor:{type: Number, required: true},
    data:{type: Date, default: Date.now()}
});

const transaction = mongoose.model('transacoesFinanceiras',transacaoSchema)

export default transaction;