
import {config} from '@/config'

// 聊天接口 , message: 聊天内容, history: 聊天历史记录 , prompt: 机器人提示
export const chat = (message, history = []

) => {
  history.push({content: message || '您好', role: 'user'})
  let messages = Object.assign([], history)
  // messages 保留前两条,及最后5条数据
  messages = [ ...messages.slice(0, 2), ...messages.slice(-5) ]

  let data = {
    model: 'openai',
    messages,
    stream: true,
    max_tokens: 1000,
    temperature: 0.8,
    top_p: 0.8
  }
  let ws = new WebSocket(config.wsurl)
  let chat = {
    role: 'assistant',
    content: ''
  }
  ws.onopen = function () {
    ws.send(JSON.stringify(data))
    history.push(chat)
  }

  ws.onmessage = function (evt) {
    let data = JSON.parse(evt.data)
    let chatmsg = data.choices[0]
    chat.content = chat.content + chatmsg.delta.content
    if (chatmsg.finish_reason === 'stop') {
      console.log(chat.content)
      console.log(history)
      console.log('close')
      ws.close()
    }
  }
}
