const { Router } = require('express');
const { listarFuncionarios, cadastrarFuncionario } = require('./controlers/funcionarios');

const routes = Router();

routes.get('/funcionario/:id', listarFuncionarios)

routes.post('/funcionario', cadastrarFuncionario)

module.exports = routes;