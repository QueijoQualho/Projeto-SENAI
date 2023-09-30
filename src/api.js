const axios = require('axios');

const apiKey = 'A9A5F18EC3DEFA2ECB8703AA8F86DF02';

async function getNameGame(jogoNome) {
    const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;

    try {
        const response = await axios.get(url);
        const appList = response.data.applist.apps;
        const jogo = appList.find(app => app.name === jogoNome);

        if (jogo) {
            const id = jogo.appid
            return id;
        } else {
            throw new Error('Jogo não encontrado.');
        }
    } catch (err) {
        console.error(err);
        throw new Error('Um erro foi encontrado ao pegar o id do jogo');
    }
}

async function getAchievements(idJogo) {
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${idJogo}`;

    try {
        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error('Erro na solicitação');
        }

        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Um erro ao pega as conquistas');
    }
}

async function getImageAchivements(idJogo) {
    const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${idJogo}`;

    try {
        const response = await axios.get(url);
        const achievementData = response.data.game.availableGameStats.achievements;

        // Mapear as imagens de conquistas a partir de achievementData
        const achievementImages = achievementData.map(achievement => {
            return {
                name: achievement.displayName,
                image: achievement.icon
            };
        });

        return achievementImages;
    } catch (err) {
        console.error(err);
        throw new Error('Um erro ao pegar informações das conquistas');
    }
}


module.exports = { getNameGame, getAchievements, getImageAchivements };
