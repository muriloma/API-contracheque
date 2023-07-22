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

}

module.exports = { listarFuncionarios, cadastrarFuncionario };