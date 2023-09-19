const { Router } = require('express');
const funcionarios = require('./controlers/funcionarios');
const detalharExtrato = require('./controlers/extrato')

const routes = Router();

routes.get('/funcionario', funcionarios.listar);
routes.get('/funcionario/:id', funcionarios.detalhar);
routes.post('/funcionario', funcionarios.cadastrar);
routes.post('/funcionario/:id', funcionarios.atualizar);

routes.get('/extrato/:id', detalharExtrato)

module.exports = routes;