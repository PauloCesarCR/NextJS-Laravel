## Como executar a aplicação

    - Crie o banco de dados manualmente no seu SGBD.

    - Ajustar no .env os dados para a conexão com banco de dados postgreSQL.

    - Rode o comando php artisan migrate, para realizar as migrações para o BDD.

    - Inicie o Servidor com php -S localhost:8000 -t public

    OBS: Você pode verificar as rotas com o comando: php artisan route:list

## Libs utilizadas

    - Eloquent | OBject Relational Map

## Banco de Dados

    - PostgreSQL
