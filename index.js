const Eris = require("eris");
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var bot = new Eris(DISCORD_TOKEN);

bot.on("messageDelete", (message) => { // When a message is created
    bot.createMessage(message.channel.id, `${message.author.username}: ${message.content}`);
});

bot.connect(); // Get the bot to connect to Discord
