const express = require('express');
const bodyParser = require('body-parser')
const router = require('./router/api.js')
require("dotenv").config();

const app = express();
const porta = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router)
app.listen(porta, () => {
    console.log(`Servidor aberto na porta ${porta}`);
});