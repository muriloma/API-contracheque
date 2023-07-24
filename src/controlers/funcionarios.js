const pool = require('../../connection');

const listarFuncionarios = async (req, res) => {
    const { id } = req.params;

    const query = {
        text: `SELECT * FROM funcionarios WHERE id = $1`,
        values: [id]
    };

    try {
        const { rows } = await pool.query(query);

        if (!rows[0]) {
            return res.status(404).json({ mensagem: 'Funcionário não localizado' })
        };

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

const cadastrarFuncionario = async (req, res) => {
    const funcionario = req.body;
    const chaves = Object.keys(funcionario)
    const parametros = chaves.map((chave, indice) => `$${indice + 1}`).join(', ');

    try {
        const query = `INSERT INTO funcionarios (${chaves.join(', ')})
        VALUES (${parametros}) RETURNING *`;

        const { rows } = await pool.query(query, Object.values(funcionario));

        return res.status(200).json(rows[0])
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { listarFuncionarios, cadastrarFuncionario };