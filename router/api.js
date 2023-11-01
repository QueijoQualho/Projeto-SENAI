const express = require('express');
const ApiSteam = require('../controller/apiController.js');

const router = express.Router();
const apiSteam = new ApiSteam();

router.get('/api/test/:value', async (req, res) => {
  const value = req.params.value;

  if (!value || value.trim() === '') {
    res.status(400).json({ error: 'O parâmetro "value" está vazio ou ausente' });
    return;
  }

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

  if (!nomeJogo || nomeJogo.trim() === '') {
    res.status(400).json({ error: 'O parâmetro "index" está vazio ou ausente' });
    return;
  }

  try {
    const [idJogo, nome] = await apiSteam.getIdGame(nomeJogo);

    if (idJogo == null) {
      res.status(404).json({ error: 'Jogo não encontrado' });
      return;
    }

    const achievements = await apiSteam.getAchievements(idJogo);

    if(achievements.length == 0){
      res.status(404).json({ error: 'O jogo não tem conquistas' });
      return
    }

    const infoGame = await apiSteam.getInfoGame(idJogo);
    const achievementsWithInfo = apiSteam.mapAchievementsWithInfo(achievements, infoGame)

    const imageGame = `https://steamcdn-a.akamaihd.net/steam/apps/${idJogo}/header.jpg`

    res.json({ name: nome, image: imageGame, achievements: achievementsWithInfo });
  } catch (err) {
    console.error(err);
    res.status(500).send('Um erro foi encontrado');
  }
});


/* Usar isso na hora de ordenar a lista ordem de arquivo */
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
/* newArray.sort((a, b) => b.percent - a.percent) */

module.exports = router;
