const axios = require('axios');
require("dotenv").config();

const apiKey = process.env.STEAMTOKEN;

class ApiSteam {
    constructor() { }

    async getIdGame(jogoNome) {
        const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;

        try {
            const response = await axios.get(url);
            const appList = response.data.applist.apps;
            const jogo = appList.find(app => app.name.toLowerCase() === jogoNome.toLowerCase());

            if (jogo) {
                const id = jogo.appid;
                return [id, jogo.name]
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

            const achievement = response.data.achievementpercentages.achievements;
            if (achievement.length > 0) {
                return achievement;
            } else {
                return [];
            }
            

        } catch (err) {
            console.error(err);
            return [];
        }
    }

    async getInfoGame(idJogo) {
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

    mapAchievementsWithInfo(Achievements, InfoGame) {
        try {
            const newArray = Achievements.map(e => {
                const matchedAchievement = InfoGame.find(imageAchievement => imageAchievement.name === e.name);

                if (matchedAchievement) {
                    return {
                        ...matchedAchievement,
                        percent: e.percent
                    }

                } else {
                    return e
                }
            });

            return newArray;
        } catch (error) {
            console.error("Erro ao ordenar conquistas:", error);
            throw error;
        }
    }

    async getGameNames(value) {
        const url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/`;

        try {
            const response = await axios.get(url);
            const appList = response.data.applist.apps;
            const filter = appList.filter(app => app.name.toLowerCase().includes(value.toLowerCase()))
            const gameNames = filter.map(app => app.name);
            return gameNames;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

}

module.exports = ApiSteam; 