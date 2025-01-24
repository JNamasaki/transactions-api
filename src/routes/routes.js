import e from "express"
import transaction from "../model/Transacao.js"
import logger from "../log/logger.js"
import conta from "../model/Conta.js"
import transacao from "../controller/transacaoController.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Teste no ar!')
    })

    app

        .get('/transactions', async (req, res) => {
            try {
                const transacoes = await transaction.find();

                if (transacoes) res.status(200).send({ transacoes: transacoes })
            } catch (error) {

                res.status(404).send({ msg: 'registros não localizados' });
            }

        })

        .post('/transactions', async (req, res) => {
            const { idContaPagador,
                nomePagador, idContaRecebedor, nomeRecebedor,
                tipoContaRecebedor, tipoTransacao,
                valor
            } = req.body;

            if (tipoTransacao == null) return res.status(400).send({ msg: 'Dados cruciais faltando!' })
            else {
                if (tipoTransacao == 'transferencia') {
                    if (idContaPagador == null || idContaRecebedor == null
                        || tipoTransacao == null || valor == null
                    ) {
                        return res.status(400).send({ msg: 'Dados cruciais faltando!' })
                    }
                }
                else if (tipoTransacao == 'deposito') {
                    if (idContaRecebedor == null
                        || tipoTransacao == null || valor == null
                    ) {
                        return res.status(400).send({ msg: 'Dados cruciais faltando!' })
                    }
                }
                else if (tipoTransacao == 'saque') {
                    if (idContaPagador == null
                        || tipoTransacao == null || valor == null
                    ) {
                        return res.status(400).send({ msg: 'Dados cruciais faltando!' })
                    }
                } else return res.status(400).send({ msg: 'Tipo de Transação invalida!' })


            }



            try {
                const verificaTransacao = await transacao(idContaPagador, idContaRecebedor, tipoTransacao, valor);

                if (verificaTransacao?.error) return res.status(405).send({ msg: verificaTransacao });

                const registro = new transaction({
                    idContaPagador,
                    nomePagador,
                    idContaRecebedor,
                    nomeRecebedor,
                    tipoContaRecebedor,
                    tipoTransacao,
                    valor
                });

                await registro.save();
                logger.info({ msg: `Transacao ${registro.id} feita com sucesso` })
                res.status(201).send({ msg: `Transacao ${registro.id} feita com sucesso` })
            } catch (error) {
                logger.error(`Erro ao registrar transacao:${error}`);
                res.status(500).send({ msg: 'náo foi possivel registrar', error })
            }

        })

        .put('/transactions/:id', async (req, res) => {
            const updateData = req.body;
            try {
                const registro = await transaction.findByIdAndUpdate(req.params.id, updateData);
                if (!registro) {
                    return res.status(404).send({ msg: 'Conta não encontrada!' });
                }
                registro.save();
                logger.info({ msg: ` Conta atualizada ${Date.now()}`, registro });
                res.status(200).send({ msg: 'Conta atualizada', registro })
            } catch (error) {
                logger.error(`Erro ao atualizar transacao ${req.params.id}: ${error}`);
                res.status(500).send({ msg: 'Erro ao atualizar transacao.', error })
            }


        })

        .delete('/transactions/:id', async (req, res) => {

            try {
                const registroDelete = await transaction.findByIdAndDelete(req.params.id);
                if (!registroDelete) {
                    return res.status(404).send({ msg: 'Transação não encontrada!' });
                }

                res.status(200).send({ msg: `Transação excluida com sucesso!` });
            } catch (error) {
                logger.error(`Erro ao deletar transacao ${req.params.id} :${error}`);
                res.status(500).send({ msg: 'Erro ao deletar transacao.', error })
            }

        })

        .get('/balance', async (req, res) => {
            try {
                const accounts = await conta.find({}, '_id nome saldo');
                res.status(200).json(accounts);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Erro ao buscar saldos das contas' });
            }
        })

        .post('/accounts', async (req, res) => {
            const { nome, cpf, tipoConta, saldo } = req.body;

            if (nome == null || cpf == null) {
                return res.status(505).send({ msf: 'Dados cruciais faltando!' })
            }

            try {
                const registro = new conta({
                    nome, cpf, tipoConta, saldo
                });

                await registro.save();
                logger.info({ msg: `Conta ${registro.id} feita com sucesso, ${Date.now()}` })
                res.status(200).send({ msg: `Conta ${registro.id} feita com sucesso` })
            } catch (error) {
                logger.error(`Erro ao registrar conta:${error}`);
                res.status(500).send({ msg: 'náo foi possivel registrar', error })
            }
        })
        .put('/accounts/:id', async (req, res) => {
            const updateData = req.body;
            try {
                const registro = await conta.findByIdAndUpdate(req.params.id, updateData);
                if (!registro) {
                    return res.status(404).send({ msg: 'Conta não encontrada!' });
                }
                registro.save();
                logger.info({ msg: ` Conta atualizada ${Date.now()}`, registro });
                res.status(200).send({ msg: 'Conta atualizada', registro })
            } catch (error) {
                logger.error(`Erro ao atualizar conta ${req.params.id}: ${error}`);
                res.status(500).send({ msg: 'Erro ao atualizar conta.', error })
            }

        })
        .delete('/accounts/:id', async (req, res) => {
            try {
                const registroDelete = await conta.findByIdAndDelete(req.params.id);
                if (!registroDelete) {
                    return res.status(404).send({ msg: 'Conta não encontrada!' });
                }

                res.status(200).send({ msg: `Conta excluida com sucesso!` });
            } catch (error) {
                logger.error(`Erro ao deletar conta ${req.params.id} :${error}`);
                res.status(500).send({ msg: 'Erro ao deletar conta.', error })
            }

        })
    app.use(e.json())
}

export default routes;