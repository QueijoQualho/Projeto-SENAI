const express = require('express');
const { getNameGame, getAchievements, getImageAchivements } = require('./api.js');

const app = express();
const porta = 3001;

app.get('/', async (req, res) => { 
    try {
        const idJogo = await getNameGame('Hollow Knight');
        const achievements = await getAchievements(idJogo);
        const imgGame = await getImageAchivements(idJogo)
        
        res.json(imgGame)
    } catch (err) {
        console.error(err);
        res.status(500).send('Um erro foi encontrado');
    }
});

app.listen(porta, () => {
    console.log(`Servidor aberto na porta ${porta}`);
});