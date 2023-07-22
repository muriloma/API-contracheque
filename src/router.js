const { Router } = require('express');
const { listarFuncionarios, cadastrarFuncionario } = require('./controlers/funcionarios');

const routes = Router();

routes.get('/funcionario/:id', listarFuncionarios)


module.exports = routes;