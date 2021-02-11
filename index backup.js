const Discord = require("discord.js")
const config = require("./config.json")

function randInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}

const client = new Discord.Client()

const prefix = "!"

client.on("message", function(message){
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const command = args.shift().toLowerCase()
    const sRes = randInt(1, 30)


    if(command === "souk"){
        const timeTaken = Date.now() - message.createdTimestamp
        if(sRes < 9){
            message.reply(`Nouth`)
        } else if(sRes < 20){
            message.reply(`Chinês`)
        } else{
            message.reply(`Nub 10 hora de treino`)
        }
    }
})

client.login(config.BOT_TOKEN)

