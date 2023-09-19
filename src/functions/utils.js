const { knex } = require('../connection');

async function buscarFuncionario(id) {
    try {
        const funcionario = await knex('funcionarios').where('id', id)
        return funcionario[0]
    } catch (error) {
        return
    }
}

function validarDadosFuncionario(dadosFuncionario) {
    const camposFuncionario = [
        'nome',
        'sobrenome',
        'cpf',
        'setor',
        'salario_bruto',
        'data_admissao',
        'plano_saude',
        'plano_dental',
        'vale_transporte'
    ];

    for (let chave of Object.keys(dadosFuncionario)) {
        if (!camposFuncionario.includes(chave)) {
            return false
        };
    };

    return true
}
module.exports = { buscarFuncionario, validarDadosFuncionario }