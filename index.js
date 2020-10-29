const Eris = require("eris");
const axios = require('axios');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var bot = new Eris(DISCORD_TOKEN);
var user = '347128357122736128';
var messages = {};

bot.on("messageCreate", async function(message){
  if(message.author.id == user){
    if(message.attachments.length != 0){
      let response = await axios.get(message.attachments[0].url,  { responseType: 'arraybuffer' })
      let buffer = Buffer.from(response.data, "utf-8")
      let attachment = {
        file: buffer,
        name: message.attachments[0].filename
      };
      messages[message.id] = {content: [message.cleanContent], file: attachment};
    }
  }
})

bot.on("messageDelete", (message) => { // When a message is created
  if(message.author.id == user)
    if(message.id in messages){
      let allMessages = "";
      for(let i = 0; i < messages[message.id].content.length; i++)
        allMessages += messages[message.id].content[i] + "\n";
      bot.createMessage(message.channel.id, `julianne: ${allMessages}`, messages[message.id].file);
    } else {
      bot.createMessage(message.channel.id, `julianne: ${message.cleanContent}`);
    }
});

bot.on("messageUpdate", (message, oldMessage) => { // When a message is created
  if(message.author.id == user){
    if (message.id in messages)
      messages[message.id].content.push(message.cleanContent);
    else {
      messages[message.id] = {content: [oldMessage.content]};
      messages[message.id].content.push(message.cleanContent);
    }
  }
});

bot.connect(); // Get the bot to connect to Discord
