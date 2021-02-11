AudioPlayer {
    _events: [Object: null prototype] {
      debug: [Function (anonymous)],
      error: [Function (anonymous)]
    },
    _eventsCount: 2,
    _maxListeners: undefined,
    dispatcher: StreamDispatcher {
      _writableState: WritableState {
        objectMode: false,
        highWaterMark: 12,
        finalCalled: false,
        needDrain: false,
        ending: false,
        ended: false,
        finished: false,
        destroyed: false,
        decodeStrings: true,
        defaultEncoding: 'utf8',
        length: 0,
        writing: false,
        corked: 0,
        sync: true,
        bufferProcessing: false,
        onwrite: [Function: bound onwrite],
        writecb: null,
        writelen: 0,
        afterWriteTickInfo: null,
        buffered: [],
        bufferedIndex: 0,
        allBuffers: true,
        allNoop: true,
        pendingcb: 0,
        prefinished: false,
        errorEmitted: false,
        emitClose: true,
        autoDestroy: true,
        errored: null,
        closed: false
      },
      _events: [Object: null prototype] {
        finish: [Array],
        error: [Array],
        unpipe: [Function: onunpipe],
        close: [Function]
      },
      _eventsCount: 4,
      _maxListeners: undefined,
      player: [Circular *1],
      streamOptions: {
        seek: 0,
        volume: 1,
        fec: undefined,
        plp: undefined,
        bitrate: 96,
        highWaterMark: 12
      },
      streams: {
        ffmpeg: [FFmpeg],
        input: [PassThrough],
        opus: [Encoder],
        volume: [VolumeTransformer],
        silence: [Silence]
      },
      _nonce: 0,
      _nonceBuffer: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>,
      pausedSince: null,
      _writeCallback: null,
      broadcast: null,
      _pausedTime: 0,
      _silentPausedTime: 0,
      count: 0,
      [Symbol(kCapture)]: false
    },
    streamingData: { channels: 2, sequence: 1, timestamp: 960 },
    voiceConnection: <ref *2> VoiceConnection {
      _events: [Object: null prototype] {
        closing: [Array],
        debug: [Function (anonymous)],
        failed: [Function],
        disconnect: [Function]
      },
      _eventsCount: 4,
      _maxListeners: undefined,
      voiceManager: ClientVoiceManager {
        connections: [Collection [Map]],
        broadcasts: []
      },
      channel: VoiceChannel {
        type: 'voice',
        deleted: false,
        id: '755166945078280277',
        name: 'Geral',
        rawPosition: 0,
        parentID: '755166945078280275',
        permissionOverwrites: Collection(0) [Map] {},
        bitrate: 64000,
        userLimit: 0,
        guild: [Guild]
      },
      status: 0,
      speaking: Speaking { bitfield: 0 },
      authentication: {
        sessionID: '3a9f56c94ef4d3da3856f30dcd48eaf9',
        token: '6f0173d3ad5431c2',
        endpoint: 'brazil1236.discord.media',
        ssrc: 250657,
        port: 50001,
        modes: [Array],
        ip: '185.41.140.50',
        experiments: [Array],
        mode: 'xsalsa20_poly1305_lite',
        video_codec: 'H264',
        secret_key: [Uint8Array],
        media_session_id: '71209e443e339f301092a4e01135eb47',
        encodings: [Array],
        audio_codec: 'opus'
      },
      player: [Circular *1],
      ssrcMap: Map(0) {},
      _speaking: Map(0) {},
      sockets: { ws: [VoiceWebSocket], udp: [VoiceConnectionUDPClient] },
      receiver: VoiceReceiver {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        connection: [Circular *2],
        packets: [PacketHandler],
        [Symbol(kCapture)]: false
      },
      connectTimeout: Timeout {
        _idleTimeout: -1,
        _idlePrev: null,
        _idleNext: null,
        _idleStart: 8736,
        _onTimeout: null,
        _timerArgs: undefined,
        _repeat: null,
        _destroyed: true,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 67,
        [Symbol(triggerId)]: 40
      },
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false
  }