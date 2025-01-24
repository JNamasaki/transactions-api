import mongoose from "mongoose";
import shortid from "shortid";

const contaSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate },
    nome:{type: String,required: true},
    cpf:{type: String,required: true},
    tipoConta:{type: String , default: 'Conta Corrente'},
    saldo:{type:Number, default: 100}
})

const conta = mongoose.model('conta',contaSchema);

export default conta;