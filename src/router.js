const { Router } = require('express');
const { listarFuncionarios, cadastrarFuncionario } = require('./controlers/funcionarios');
const detalharExtrato = require('./controlers/extrato')

const routes = Router();

routes.get('/funcionario/:id', listarFuncionarios);
routes.post('/funcionario', cadastrarFuncionario);

routes.get('/extrato/:id', detalharExtrato)

module.exports = routes;