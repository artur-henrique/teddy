# Teddy Project

Este é um projeto desenvolvido em Angular com suporte para execução local, deploy via Vercel e configuração para execução em Docker.

### 🛠 Tecnologias Utilizadas<br>
- Angular 🅰
- TypeScript 📜
- Node.js
- Vercel ⚡ 

<br>

## 🚀 Executando Localmente

Para rodar o projeto em sua máquina local, siga os passos abaixo:

### 1. Clone o repositório:
  
```
git clone git@github.com:artur-henrique/teddy.git
cd teddy
```
### 2. Instale as dependências:
```
npm install
```
### 3. Inicie o servidor:
```
npm start
```
### 4. Acesse a aplicação no seu navegador:

http://localhost:4200/


OBS: O projeto será iniciado localmente com um `proxy` configurado para evitar problemas de `CORS`.
  
<br>

## 📦 Executando com Docker

O projeto possui um arquivo Dockerfile para execução em um container. Para rodá-lo, utilize os seguintes comandos:
```
docker build -t teddy .
docker run -p 8080:80 teddy
```
⚠ Atenção: Para que o projeto funcione corretamente em produção via Docker, o backend precisa estar configurado para permitir CORS.

<br>

## ⚡  Acesso via Vercel

O projeto também está disponível online através da Vercel:

https://teddy-ruddy-five.vercel.app/
