module.exports = (client) => {
    client.user.setPresence({
        activity: {
            name: `Serveurs : ${client.guilds.size} | Utilisateurs : ${client.users.size.toLocaleString()} | !!help`,
            type: 'PLAYING'
        },
        status: 'online',
    });
};

const discord = require("discord.js");
const client = new discord.Client();

