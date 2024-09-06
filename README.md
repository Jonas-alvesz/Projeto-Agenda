Descrição:

Este projeto é uma aplicação web simples que permite a criação, visualização, filtragem e exclusão de compromissos. Desenvolvido usando Node.js com Express para o servidor e PostgreSQL como banco de dados, esta aplicação oferece uma interface básica para gerenciar compromissos diários.

Funcionalidades:

Cadastro de Compromissos: Adicione novos compromissos com detalhes de data.

Visualização de Compromissos: Veja todos os compromissos cadastrados em uma tabela.

Filtragem: Filtre compromissos por compromisso, dia, mês ou ano.

Exclusão: Remova compromissos existentes.

Tecnologias Utilizadas:

Node.js: Ambiente de execução para JavaScript do lado do servidor.

Express: Framework web para Node.js.

PostgreSQL: Sistema de gerenciamento de banco de dados relacional.

EJS: Template engine para renderizar páginas HTML dinâmicas.

CSS: Estilização da interface do usuário.

Instalar Dependências:

Certifique-se de ter o Node.js e o npm instalados. Execute:

npm install

npm install express ejs pg

Configurar Banco de Dados:

Atualize o arquivo index.js com suas credenciais de banco de dados:

const pool = new Pool({
    user: 'User_database_name',
    host: 'localhost',
    database: 'database_name',
    password: 'password_database',
    port: '5432'
});

Crie a tabela info no seu banco de dados PostgreSQL com o seguinte comando SQL:

CREATE TABLE info (
    compromisso VARCHAR(255),
    dia INT,
    mes INT,
    ano INT
);

