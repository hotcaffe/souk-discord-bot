const Discord = require("discord.js")
const config = require("./config.json")
const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const { getInfo } = require("ytdl-core")
const CronJob = require('cron').CronJob
const { job } = require("cron")

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const client = new Discord.Client()

const prefix = "$"

var info = 1
var globalConnection = {}
var globalPlaylist = []
var ultTime = 0


client.on("message", async message => {
    if (message.author.bot) return;
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
                if (info === 1) {
                    globalConnection = Object.assign({}, message.member.voice.channel)
                    if (ytpl.validateID(argument)) {
                        const ytPlaylist = await ytpl(argument, { pages: Infinity })
                        for (i = 0; i < ytPlaylist.items.length; i++) {
                            globalPlaylist.push(ytPlaylist.items[i]['url'])
                        }
                        message.channel.send(`Foram adicionadas **${ytPlaylist.items.length}** músicas da playlist **${ytPlaylist.title}** na fila!`)
                    } else {
                        const connection = await message.member.voice.channel.join()
                        const dispatcher = connection.play(ytdl(args, {
                            filter: 'audioonly',
                            quality: 'highestaudio',
                        }));
                        let songData = await ytdl.getInfo(args)
                        message.reply(`Tocando **${songData.videoDetails.title}**!`)
                        ultTime = Date.now() + (parseInt(songData.videoDetails.lengthSeconds) * 1000) + 1
                        const job = new CronJob(`*/5 * * * * *`, async () => {
                            if (Date.now() > ultTime && globalPlaylist.length > 0) {
                                console.log('tocando')
                                connection.play(ytdl(globalPlaylist[0], {
                                    filter: 'audioonly',
                                    quality: 'highestaudio',
                                }))
                                songData = await ytdl.getInfo(globalPlaylist[0])
                                ultTime = Date.now() + (parseInt(songData.videoDetails.lengthSeconds) * 1000) + 1
                                globalPlaylist.shift()
                                console.log('tocou')
                            }else{
                                console.log('executado', Date.now() - ultTime, globalPlaylist.length)
                            }
                        })
                        job.start()
                    }
                    info++
                }
                else{
                    if (ytpl.validateID(argument)) {
                        const ytPlaylist = await ytpl(argument, { pages: Infinity })
                        for (i = 0; i < ytPlaylist.items.length; i++) {
                            globalPlaylist.push(ytPlaylist.items[i]['url'])
                        }
                        message.channel.send(`Foram adicionadas **${ytPlaylist.items.length}** músicas da playlist **${ytPlaylist.title}** na fila!`)
                    } else {
                        if (ytdl.validateURL(args)) {
                            globalPlaylist.push(args)
                            message.channel.send(`>>**${(await ytdl.getInfo(args)).videoDetails.title}**<< adicionado à playlist!`)
                        } else {
                            message.reply('a URL inserida não faz parte dos formatados suportados pelo nouth touk bot **;-;**')
                        }
                    }
                }
            } else {
                message.reply('a URL inserida não faz parte dos formatados suportados pelo nouth touk bot **;-;**')
            }

        } else {
            message.reply(`tá fudendo? Tu não tá em call!`)
        }
    } else if (command === "skip") {
        globalPlaylist.shift()
    } else if (command === "stop") {
        if (message.member.voice.channel.id == globalConnection.id) {
            const connection = await message.member.voice.channel.join()
            connection.disconnect()
            message.reply("Parei")
            info = 1
            globalPlaylist = []
        } else {
            message.reply("Ta querendo sacanear o bot alheio?")
        }
    }
    else if (command === "info") {
        console.log(globalConnection)
    } else if (command === "kirao") {
        message.reply('Gilberto Drummond Pereira Junior, vulgo **Kirão**')
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

