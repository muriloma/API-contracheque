const pool = require('../../connection');

async function buscarFuncionario(id) {
    try {
        const { rows } = await pool.query({
            text: `SELECT * FROM funcionarios WHERE id = $1`,
            values: [id]
        });

        return rows[0]

    } catch (error) {
        return
    }
}

module.exports = { buscarFuncionario }