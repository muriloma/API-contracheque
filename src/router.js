const { Router } = require('express');
const { listarFuncionarios, detalharFuncionarios, cadastrarFuncionario, atualizarFuncionario } = require('./controlers/funcionarios');
const detalharExtrato = require('./controlers/extrato')

const routes = Router();

routes.get('/funcionario', listarFuncionarios);
routes.get('/funcionario/:id', detalharFuncionarios);
routes.post('/funcionario', cadastrarFuncionario);
routes.post('/funcionario/:id', atualizarFuncionario);

routes.get('/extrato/:id', detalharExtrato)

module.exports = routes;