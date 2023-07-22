const express = require('express');
const { listarFuncionarios } = require('./controlers/contracheque');

const routes = express();

routes.get('funcionario/:id', listarFuncionarios)

module.exports = routes