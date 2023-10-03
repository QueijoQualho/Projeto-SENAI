const express = require('express');
const ApiSteam = require('../controller/apiController.js');

const router = express.Router();
const apiSteam = new ApiSteam(); 

router.get('/api/:index', async (req, res) => {
  const nomeJogo = req.params.index; 
  try {
    const idJogo = await apiSteam.getNameGame(nomeJogo); 

    if (idJogo == null) {
      res.status(404).json({ error: 'Jogo não encontrado' });
      return;
    }

    const achievements = await apiSteam.getAchievements(idJogo);
    const infoGame = await apiSteam.getInfoGame(idJogo);
    const ordem = apiSteam.mapAchievementsWithInfo(achievements,infoGame)


    res.json(ordem)
  } catch (err) {
    console.error(err);
    res.status(500).send('Um erro foi encontrado');
  }
});

/* Usar isso na hora de ordenar a lista ordem de arquivo */
/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
/* newArray.sort((a, b) => b.percent - a.percent) */

module.exports = router;
