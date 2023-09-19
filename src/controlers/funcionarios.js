const { knex } = require('../connection');
const { buscarFuncionario, validarDadosFuncionario } = require('../functions/utils');


const listar = async (req, res) => {
    try {
        const funcionarios = await knex('funcionarios')

        if (funcionarios.length === 0) {
            return res.status(404).json({ mensagem: 'Não existem funcionários cadastrados.' })
        }

        return res.status(200).json(funcionarios)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const detalhar = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await buscarFuncionario(id);

        if (!funcionario) {
            return res.status(404).json({ mensagem: 'Funcionário não localizado' })
        }

        return res.status(200).json(funcionario);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const cadastrar = async (req, res) => {
    const funcionario = req.body;

    if (!validarDadosFuncionario(funcionario)) {
        return res.status(400).json({ mensagem: "Informar somente campos válidos" })
    }

    try {
        const buscarFuncionario = await knex('funcionarios').where('cpf', funcionario.cpf)

        if (buscarFuncionario.length !== 0) {
            return res.status(400).json({ mensagem: 'Funcionário já cadastrado' })
        };

        const cadastrar = await knex('funcionarios').insert(funcionario).returning('*')

        return res.status(200).json(cadastrar)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const atualizar = async (req, res) => {
    const novosDados = req.body
    const { id } = req.params

    if (!validarDadosFuncionario(novosDados)) {
        return res.status(400).json({ mensagem: "Informar somente campos válidos" })
    }

    try {
        const funcionario = await buscarFuncionario(id);

        if (!funcionario) {
            return res.status(404).json({ mensagem: 'Funcionário não localizado' })
        }

        const atualizarCadastro = await knex('funcionarios').update(novosDados).where('id', id).returning('*')

        return res.status(200).json(atualizarCadastro[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { listar, detalhar, cadastrar, atualizar };