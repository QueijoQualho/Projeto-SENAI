const express = require('express');
const ApiSteam = require('../controller/apiController.js');

const router = express.Router();
const apiSteam = new ApiSteam(); 

router.get('/', async (req, res) => {
  const nomeJogo = req.body.nomeJogo; 
  try {
    const idJogo = await apiSteam.getNameGame(nomeJogo); 

    if (idJogo == null) {
      res.status(404).json({ error: 'Jogo não encontrado' });
      return;
    }

    const achievements = await apiSteam.getAchievements(idJogo);
    const imgGame = await apiSteam.getImageAchievements(idJogo);

    res.json({
      idJogo,
      achievements,
      imgGame,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Um erro foi encontrado');
  }
});

module.exports = router;
