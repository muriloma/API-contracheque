const pool = require('../../connection');
const { buscarFuncionario } = require('../functions/utils');

const listarFuncionarios = async (req, res) => {
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

const cadastrarFuncionario = async (req, res) => {
    const funcionario = req.body;
    const chaves = Object.keys(funcionario)
    const parametros = chaves.map((chave, indice) => `$${indice + 1}`).join(', ');

    try {
        const buscarFuncionario = await pool.query({
            text: `SELECT * FROM funcionarios WHERE cpf = $1`,
            values: [funcionario.cpf]
        });

        if (buscarFuncionario.rowCount !== 0) {
            return res.status(400).json({ mensagem: 'Funcionário já cadastrado' })
        };

        const query = `INSERT INTO funcionarios (${chaves.toString()})
        VALUES (${parametros}) RETURNING *`;

        const { rows } = await pool.query(query, Object.values(funcionario));

        return res.status(200).json(rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { listarFuncionarios, cadastrarFuncionario };