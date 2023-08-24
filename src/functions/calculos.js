function calcularINSS(salario) {
    const faixas = [
        { limite: 132000, aliquota: 0.075 },
        { limite: 257129, aliquota: 0.09 },
        { limite: 385694, aliquota: 0.12 },
        { limite: 750749, aliquota: 0.14 }
    ];

    let contribuicaoINSS = 0;
    let i = 0

    if (salario <= faixas[0].limite) {
        return contribuicaoINSS += faixas[0].limite * faixas[0].aliquota;
    }
    for (const faixa of faixas) {

        if (salario >= faixa.limite && i === 0) {
            contribuicaoINSS += faixa.limite * faixa.aliquota;
            i++
        } else if (salario >= faixa.limite) {
            contribuicaoINSS += (faixa.limite - faixas[i - 1].limite) * faixa.aliquota
            i++
        } else if (salario < faixa.limite) {
            contribuicaoINSS += (salario - faixas[i - 1].limite) * faixa.aliquota
            break;
        }
    }
    return Math.round(contribuicaoINSS);
};

function calcularIRRF(salarioDescontadoINSS) {
    faixas = [
        { limite: 282665, aliquota: 0.075, deducao: 14280 },
        { limite: 375105, aliquota: 0.15, deducao: 35480 },
        { limite: 466468, aliquota: 0.225, deducao: 63613 },
        { limite: Infinity, aliquota: 0.275, deducao: 86936 }
    ];

    if (salarioDescontadoINSS <= 211200) {
        return 0
    };

    let descontoIRRF = 0

    for (let faixa of faixas) {
        if (salarioDescontadoINSS <= faixa.limite) {
            descontoIRRF = salarioDescontadoINSS * faixa.aliquota

            if (descontoIRRF < faixa.deducao) {
                descontoIRRF = faixa.deducao
            } else {
                descontoIRRF -= faixa.deducao
            }
            break
        }
    }
    return Math.round(descontoIRRF)
}

module.exports = {
    calcularINSS,
    calcularIRRF
}