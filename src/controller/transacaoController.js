import conta from "../model/Conta.js";

async function verificaSaldo(id) {
    const saldoConta = await conta.findById(id).select('saldo');

    if (!saldoConta) {
        return 'usuario não encontrado';
    }

    return saldoConta?.saldo || 0;
}

async function transferencia(idPagador, idRecebedor, valor) {

    let saldoPagador = await verificaSaldo(idPagador);
    let saldoRecebedor = await verificaSaldo(idRecebedor);

    try {

        if (saldoPagador < valor) throw new Error('Pagador não possui saldo suficiente para transferir');
        saldoPagador = saldoPagador - valor;
        saldoRecebedor = saldoRecebedor + valor;

        const atualizaSaldoPagador = await conta.findByIdAndUpdate(idPagador, { saldo: saldoPagador });
        const atualizaSaldoRecebedor = await conta.findByIdAndUpdate(idRecebedor, { saldo: saldoRecebedor });

        return { msg: 'Transferencia atualizado' }
    } catch (error) {
        return { msg: 'Erro ao atualizar saldo', error: error.message };
    }



}

async function deposito(idRecebedor, valor) {
    let saldoRecebedor = await verificaSaldo(idRecebedor);

    saldoRecebedor = saldoRecebedor + valor;

    try {

        const atualizaSaldoRecebedor = await conta.findByIdAndUpdate(idRecebedor, { saldo: saldoRecebedor });

        return { msg: 'Saldo atualizado' }
    } catch (error) {
        return { msg: 'Erro ao atualizar saldo', error };
    }

}

async function saque(idPagador, valor) {
    let saldoPagador = await verificaSaldo(idPagador);


    try {
        
        if (saldoPagador < valor) throw new Error('Pagador não possui o valor para transferir');
        saldoPagador = saldoPagador - valor;

        const atualizaSaldoPagador = await conta.findByIdAndUpdate(idPagador, { saldo: saldoPagador });

        return { msg: 'Saque realizado' }
    } catch (error) {
        return { msg: 'Erro ao atualizar saldo', error: error.message };
    }

}
export default function transacao(idPagador, idRecebedor, tipoTransacao, valor) {

    switch (tipoTransacao) {
        case 'transferencia':
            return transferencia(idPagador, idRecebedor, valor);
        case 'deposito':
            return deposito(idRecebedor, valor);
        case 'saque':
            return saque(idPagador, valor);
        default:
            return 'tipo de transação invalida';
    }
}