CREATE DATABASE dp;

CREATE TABLE funcionarios (
    id serial PRIMARY KEY,
    nome text NOT NULL,
    sobrenome text,
    cpf bigint NOT NULL UNIQUE,
    setor text NOT NULL,
    salario_bruto integer NOT NULL,
    data_admissao date,
    plano_saude boolean DEFAULT true,
    plano_dental boolean DEFAULT true,
    vale_transporte boolean DEFAULT true
);

-- CREATE TABLE lancamentos (
--     id serial PRIMARY KEY,
--     tipo text NOT NULL,
--     valor integer NOT NULL,
--     descricao text NOT NULL
-- );