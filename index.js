const Discord = require("discord.js")
const config = require("./config.json")
const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const ytsr = require('ytsr')
const { getInfo } = require("ytdl-core")
const jobC = require('./player')

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const client = new Discord.Client()

const prefix = "$"

var info = 1
var globalConnection = {}
var globalPlaylist = []
var ultTime = 0
var songData = {}
var resetPlayer = 0
var chatAnws = 0
var searchResultsList = []


client.on("message", async message => {
    if (message.author.bot) return;
    if (chatAnws === 1){
        if(Number.isInteger(parseInt(message.content))){
            globalPlaylist.push(searchResultsList[parseInt(message.content)-1][2])
            console.log(globalPlaylist)
            if(!jobC.job.running){
                globalConnection = Object.assign({}, message.member.voice.channel)
                const connection = await message.member.voice.channel.join()
                songData = await ytdl.getInfo(globalPlaylist[0])
                ultTime = Date.now() + (parseInt(songData.videoDetails.lengthSeconds) * 1000) + 1
                module.exports.connection = connection
                module.exports.songData = songData
                module.exports.globalPlaylist = globalPlaylist
                module.exports.ultTime = ultTime
                module.exports.resetPlayer = resetPlayer
                jobC.job.start()
                info++
                message.reply(`**${searchResultsList[parseInt(message.content)-1][1]}** irá tocar agora!`)
            }else{
                message.reply(`**${searchResultsList[parseInt(message.content)-1][1]}** adicionado à playlist!!!`)
            }
        }else{
            message.reply(`**${message.content}** não é uma opção válida para a pesquisa apresentada. Tente novamente da próxima vez, digitando um número entre 1 a 5!`)
        }
        console.log(message.content)
        searchResultsList = []
        chatAnws = 0
    }

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length)
    const args = commandBody.split(' ')
    const argument = commandBody.replace('play ', '')
    const command = args.shift().toLowerCase()



    if (command === "souk") {
        const sRes = randInt(1, 30)
        if (sRes < 9) {
            message.reply(`Nouth`)
        } else if (sRes < 20) {
            message.reply(`Chinês`)
        } else {
            message.reply(`Nub 10 hora de treino`)
        }
    } else if (command === "play") {
        if (message.member.voice.channel) {
            if (ytdl.validateURL(args) || ytpl.validateID(argument)) {
                const connection = await message.member.voice.channel.join()
                if (info === 1) {
                    globalConnection = Object.assign({}, message.member.voice.channel)
                    if (ytpl.validateID(argument)) {
                        const ytPlaylist = await ytpl(argument, { pages: Infinity })
                        for (i = 0; i < ytPlaylist.items.length; i++) {
                            globalPlaylist.push(ytPlaylist.items[i]['url'])
                        }
                        message.channel.send(`Foram adicionadas **${ytPlaylist.items.length}** músicas da playlist **${ytPlaylist.title}** na fila!`)
                    }else {
                       globalPlaylist.push(argument)
                       songData = await ytdl.getInfo(args)
                       ultTime = Date.now() + (parseInt(songData.videoDetails.lengthSeconds) * 1000) + 1

                       message.reply(`Tocando **${songData.videoDetails.title}**!`)
                    }
                    module.exports.connection = connection
                    module.exports.songData = songData
                    module.exports.globalPlaylist = globalPlaylist
                    module.exports.ultTime = ultTime
                    module.exports.resetPlayer = resetPlayer
                    jobC.job.start()
                    info++
                }
                else{
                    resetPlayer = 0
                    if (ytpl.validateID(argument)) {
                        const ytPlaylist = await ytpl(argument, { pages: Infinity })
                        for (i = 0; i < ytPlaylist.items.length; i++) {
                            globalPlaylist.push(ytPlaylist.items[i]['url'])
                        }
                        message.channel.send(`Foram adicionadas **${ytPlaylist.items.length}** músicas da playlist **${ytPlaylist.title}** na fila!`)
                    } else {
                        globalPlaylist.push(args)
                        message.channel.send(`>>**${(await ytdl.getInfo(args)).videoDetails.title}**<< adicionado à playlist!`)
                    }
                }
            } else {
                // message.reply('a URL inserida não faz parte dos formatados suportados pelo nouth touk bot **;-;**')
                const filters1 = await ytsr.getFilters(argument);
                const filter1 = filters1.get('Type').get('Video');
                const filters2 = await ytsr.getFilters(filter1.url);
                const filter2 = filters2.get('Features').get('Live');
                const searchResults = await ytsr(filter1.url, {limit: 5});
                for(x=0;x<searchResults.items.length;x++){
                    searchResultsList.push([x, searchResults.items[x].title, searchResults.items[x].url])
                }
                message.channel.send(`**Resultados da pesquisa do bot solk:**\n **1** - ${searchResultsList[0][1]}\n **2** - ${searchResultsList[1][1]} \n **3** - ${searchResultsList[2][1]} \n **4** - ${searchResultsList[3][1]} \n **5** - ${searchResultsList[4][1]}`)
                chatAnws = 1
                console.log(searchResultsList)
            }

        } else {
            message.reply(`tá fudendo? Tu não tá em call!`)
        }
    } else if (command === "skip") {
        if (message.member.voice.channel.id == globalConnection.id) {
            jobC.dispatcher.end()
            ultTime = 0
            module.exports.ultTime = ultTime
            message.reply("Pulei")
        }else{
            message.reply("Ta querendo sacanear o bot alheio?")
        }
    } else if (command === "stop") {
        if (message.member.voice.channel.id == globalConnection.id) {
            const connection = await message.member.voice.channel.join()
            connection.disconnect()
            message.reply("Parei")
            info = 1
            resetPlayer = 1
            globalPlaylist = []
            jobC.job.stop()
        } else {
            message.reply("Ta querendo sacanear o bot alheio?")
        }
    } else if (command === "clear"){
        if (message.member.voice.channel.id == globalConnection.id) {
            globalPlaylist = []
            message.reply("A **playlist** de músicas do bot foi limpada!")
        }
    } else if (command === "pesq"){
        const argument = commandBody.replace('pesq ', '')
    }
    else if (command === "info") {
        console.log(globalConnection)
    } else if (command === "kirao") {
        message.reply('Gilberto Drummond Pereira Junior, vulgo **Kirão**')
    } else if (command === "help"){
        message.reply('**Comandos BOT DOPETOUK** \n \n **$play** >link do youtube< - Toca uma braba \n **$stop** - Encerra o player de música e desconecta o bot \n **$skip** - Pula para a próxima música, caso haja alguma presente na playlist \n \n **$souk** - Faz o souktouch soltar uma daquelas \n **$kirao** - Descubra quem é o kira')
    } else {
        message.reply("Comando inválido, o touch aqui só fala **mandarim** :(")
    }
})

// $skip
// $playlist
// $kirao
// $diga
// $help


client.login(config.BOT_TOKEN)

