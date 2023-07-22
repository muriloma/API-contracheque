CREATE DATABASE dp;

CREATE TABLE funcionarios (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    sobrenome text,
    cpf integer NOT NULL,
    setor text,
    salario_bruto integer,
    data_admissao date,
    plano_saude boolean,
    plano_dental boolean,
    vale_transporte boolean
);
