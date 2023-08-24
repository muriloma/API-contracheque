const { calcularINSS, calcularIRRF } = require('../functions/calculos');
const { buscarFuncionario } = require('../functions/utils')

const detalharExtrato = async (req, res) => {
    const { id } = req.params;
    const { mes } = req.query;

    try {
        const {
            plano_saude,
            plano_dental,
            vale_transporte,
            salario_bruto,
            ...funcionario
        } = await buscarFuncionario(id);

        if (!funcionario) {
            return res.status(404).json({ mensagem: 'Funcionário não localizado' })
        }

        const desconto_inss = calcularINSS(salario_bruto);
        const desconto_irrf = calcularIRRF((salario_bruto - desconto_inss));

        const lancamentos = [
            { tipo: 'desconto', valor: ((Math.round(salario_bruto * 0.08)) / 100), descricao: 'FGTS' },
            { tipo: 'desconto', valor: (desconto_inss / 100), descricao: 'INSS' },
            { tipo: 'desconto', valor: (desconto_irrf / 100), descricao: 'IRRF' }
        ];

        if (plano_saude) {
            lancamentos.push({ tipo: 'desconto', valor: 10, descricao: 'plano de saude' })
        };

        if (plano_dental) {
            lancamentos.push({ tipo: 'desconto', valor: 5, descricao: 'plano dental' })
        };

        if (vale_transporte && salario_bruto >= 150000) {

            lancamentos.push({
                tipo: 'desconto',
                valor: ((Math.round(salario_bruto * 0.06)) / 100),
                descricao: 'vale transporte'
            });
        };

        let totalDescontos = 0;
        let totalRemuneracao = 0;
        for (const lancamento of lancamentos) {
            if (lancamento.tipo === 'desconto') {
                totalDescontos += lancamento.valor
            };

            if (lancamento.tipo === 'remuneracao') {
                totalRemuneracao += lancamento.valor
            };
        };

        const extrato = {
            mes,
            lancamentos: lancamentos,
            salario_bruto: (salario_bruto / 100),
            descontos: Number(totalDescontos.toFixed(2)),
            salario_liquido: ((salario_bruto / 100) - totalDescontos)
        }

        return res.status(200).json(extrato)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = detalharExtrato