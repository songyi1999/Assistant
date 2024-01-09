// 使用websocket 和客户端交付，并把客户端数据发送给openai 服务器端
// 服务名称为 openai.xinpanmen.com
const openaiurl = 'http://openai.sz-hgy.com:9002/v1'
const OpenAI = require('openai')
// ws 服务器
const WebSocket = require('ws')

const wss = new WebSocket.Server({port: 9026}) // 监听端口

wss.on('connection', function connection (ws) {
  ws.on('message', async function incoming (message) {
    // console.log('received: %s', message)
    let data = JSON.parse(message)
    // let url = openaiurl + '/chat/completions'
    let openai = new OpenAI({

      apiKey: 'sk-9b2a7e7d-1d3b-4b1f-9e1e-6a0d7b9f7a2d',
      baseURL: openaiurl
    })
    const stream = await openai.chat.completions.create(data)
    for await (const message of stream) {
      // console.log(message)
      ws.send(JSON.stringify(message))
    }
  })
}
)
wss.on('error', function error (err) {
  console.log(err)
}
)
