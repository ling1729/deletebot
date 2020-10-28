const Eris = require("eris");
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var bot = new Eris(DISCORD_TOKEN);

bot.on("messageDelete", (message) => { // When a message is created
  if(message.author.id == '346219582983372800')
    bot.createMessage(message.channel.id, `julianne: ${message.content}`);
});

bot.connect(); // Get the bot to connect to Discord
