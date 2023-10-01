const axios = require('axios');
require("dotenv").config();

const apiKey = process.env.STEAMTOKEN;

class ApiSteam {
    constructor() { }

    async getNameGame(jogoNome) {
        const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;

        try {
            const response = await axios.get(url);
            const appList = response.data.applist.apps;
            const jogo = appList.find(app => app.name === jogoNome);

            if (jogo) {
                const id = jogo.appid;
                return id;
            } else {
                return null;
            }
        } catch (err) {
            console.error(err);
            throw new Error('Um erro foi encontrado ao pegar o id do jogo');
        }
    }

    async getAchievements(idJogo) {
        const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${idJogo}`;

        try {
            const response = await axios.get(url);

            if (response.status !== 200) {
                throw new Error('Erro na solicitação');
            }

            return response.data.achievementpercentages.achievements;
        } catch (err) {
            console.error(err);
            throw new Error('Um erro ao pegar as conquistas');
        }
    }

    async getImageAchievements(idJogo) {
        const url = `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${idJogo}`;

        try {
            const response = await axios.get(url);
            const achievementData = response.data.game.availableGameStats.achievements;

            const achievementImages = achievementData.map(achievement => {
                return {
                    name: achievement.name,
                    displayName: achievement.displayName,
                    descricao: achievement.description,
                    image: achievement.icon
                };
            });

            return achievementImages;
        } catch (err) {
            console.error(err);
            throw new Error('Um erro ao pegar informações das conquistas');
        }
    }
}

module.exports = ApiSteam; 