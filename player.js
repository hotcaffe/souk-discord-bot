const CronJob = require('cron').CronJob
const mainInfo = require('./index')

const ytdl = require('ytdl-core')
const ytpl = require('ytpl')

var info = 1

const job = new CronJob(`*/5 * * * * *`, async () => {
    // console.log(Date.now(), mainInfo.ultTime)
    // console.log(mainInfo.globalPlaylist.length)
    if(info === 1){
        info++
        const dispatcher = mainInfo.connection.play(ytdl(mainInfo.globalPlaylist[0], {
            filter: 'audioonly',
            quality: 'highestaudio',
        }))
        module.exports.dispatcher = dispatcher
        mainInfo.songData = await ytdl.getInfo(mainInfo.globalPlaylist[0])
        mainInfo.ultTime = Date.now() + (parseInt(mainInfo.songData.videoDetails.lengthSeconds) * 1000) + 1
        mainInfo.globalPlaylist.shift()
        console.log('tocou a primeira')
    }
    else if(Date.now() > mainInfo.ultTime && mainInfo.globalPlaylist.length > 0) {
        const dispatcher = mainInfo.connection.play(ytdl(mainInfo.globalPlaylist[0], {
            filter: 'audioonly',
            quality: 'highestaudio',
        }))
        module.exports.dispatcher = dispatcher
        mainInfo.songData = await ytdl.getInfo(mainInfo.globalPlaylist[0])
        mainInfo.ultTime = Date.now() + (parseInt(mainInfo.songData.videoDetails.lengthSeconds) * 1000) + 1
        mainInfo.globalPlaylist.shift()
        console.log('tocou')
    }else{
        if(mainInfo.resetPlayer === 1 && mainInfo.globalPlaylist.length > 0){
            info = 1
        } else{
            console.log('good')
        }
    }
})

module.exports.job = job