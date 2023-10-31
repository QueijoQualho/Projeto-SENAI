const express = require('express');
const ApiSteam = require('../controller/apiController.js');

const router = express.Router();
const apiSteam = new ApiSteam();

router.get('/api/test/:value', async (req, res) => {
  const value = req.params.value;

  try {
    const gameNames = await apiSteam.getGameNames(value);

    res.json(gameNames);
  } catch (error) {
    console.error('Erro ao buscar nomes de jogos:', error);
    res.status(500).json({ error: 'Um erro interno ocorreu ao buscar nomes de jogos' });
  }
});

router.get('/api/:index', async (req, res) => {
  const nomeJogo = req.params.index;
  try {
    const idJogo = await apiSteam.getIdGame(nomeJogo);

    if (idJogo == null) {
      res.status(404).json({ error: 'Jogo não encontrado' });
      return;
    }

    const achievements = await apiSteam.getAchievements(idJogo);
    const infoGame = await apiSteam.getInfoGame(idJogo);
    const achievementsWithInfo = apiSteam.mapAchievementsWithInfo(achievements, infoGame)

    const imageGame = `https://steamcdn-a.akamaihd.net/steam/apps/${idJogo}/header.jpg`
    
    res.json({ achievements: achievementsWithInfo, image: imageGame });
  } catch (err) {
    console.error(err);
    res.status(500).send('Um erro foi encontrado');
  }
});


/* Usar isso na hora de ordenar a lista ordem de arquivo */
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
/* newArray.sort((a, b) => b.percent - a.percent) */

module.exports = router;
