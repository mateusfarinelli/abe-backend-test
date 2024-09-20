FROM node:20

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]