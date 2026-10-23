# Caracol Web

## Deploy na Vercel

O projeto usa Node.js 22.x. A Vercel instala as dependências com `npm ci`, gera a aplicação com `npm run build` e publica a pasta `dist`. As rotas do React são encaminhadas para `index.html` pela configuração em `vercel.json`.
