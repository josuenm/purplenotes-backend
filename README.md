# Purple Notes - back-end

Essa é uma aplicação back-end para suprir o front-end com autenticação e manipulação das anotações.

# Linguagens, plataformas, banco de dados, bibliotecas e deploy 😎

- NodeJS
- Express
- Javascript
- CORS
- Mongoose
- bcrypt
- jotenv
- jsonwebtoken
- Deploy pela <a href="heroku.com" target="_blank">Heroku</a>

# Como instalar o projeto na sua máquina 🛸

Primeiramente dê um fork no projeto, depois clone ele para um repositório local.

Agora instale todas dependências, para isso utilize `npm install` ou `yarn`.

Para o banco de dados MongoDB funcionar localmente você precisa ter ele instalado, então <a href="https://www.youtube.com/watch?v=r6QM1NTzkTI" target="_blank">clique aqui</a> para assitir um vídeo de como instalar.

Para funcionar tudo certo você precisa criar um arquivo `.env` na raíz do projeto e colocar algumas variaveis de ambiente.

<strong>Cole essas variaveis de ambiente dentro do arquivo `.env`</strong>

<blockquote>

    JWT_TOKEN=çãipkdnasdsÂSMasdasdnsadadçasd
    MONGO_URL=mongodb://localhost/purplenotes
    PORT=8080
    CORS_URL=*

</blockquote>

Você pode fazer requisições utilizando <a href="https://insomnia.rest" target="_blank">Insomnia</a> ou <a href="https://www.postman.com" target="_blank">Postman</a> ou outra plataforma de sua escolha.
