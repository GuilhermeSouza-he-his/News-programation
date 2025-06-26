const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// Conexão com banco de dados
connectDB();

// Middlewares globais
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp')
}));

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 600000 }
}));

// Configurações de view
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

// Rotas
app.use('/', routes);

// Inicia o servidor
app.listen(3000, () => {
  console.log('✅ Servidor rodando em http://localhost:3000');
});
