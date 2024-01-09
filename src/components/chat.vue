<template>
  <div id="chatbox" class="chat-window">
    <div class="chat-messages">
<div v-for="(msg,k) in messages" :key="k">
    <div class="message from-agent"   v-if="msg.role=='assistant'">
        <div class="avatar">
            <img src="static/img/icons/avatar.png" alt="">

        </div>
        <div v-html="msg.content" class="content"></div>


    </div>
    <div class="message from-user" v-if="msg.role=='user'">
        <div class="avatar">
            <img src="static/img/icons/avatar-cs.png" alt="">
        </div>

        <div v-html="msg.content" class="content"></div>
    </div>


</div>
    </div>
    <div class="chat-input">
        <textarea v-model="inputtext" @keyup.enter="sendMessage" />
      <button @click="sendMessage" :disabled="thinking">发送</button>
    </div>




  </div>
</template>

<script>
import {chat} from './chat'
export default {
  name: 'chat',
  data () {
    return {
      thinking: false, // 是否正在思考
      connecting: false, // 是否正在连接
      appname: '大模型小助手', // app名称

      messages: [{
        role: 'system',
        content: '你是深度计算机工作室训练的大模型,你精通各个领域的法律知识，能够提供专业且贴心的法律咨询服务。'
      }, {
        role: 'assistant',
        content: '你好，我是大模型小助手，你可以问我任何问题，我会尽力帮你解答。'
      }

      ], // 消息列表
      inputtext: '', // 输入框内容
      timer: null
    }
  },
  mounted () {
    // this.chat('国内有什么企业合规相关的法律法规？')
  },
  methods: {
    chat (message) {
      chat(message, this.messages)
    },
    sendMessage () {
      if (this.inputtext.trim() === '') {
        return
      }

      this.chat(this.inputtext)
      this.scrollToBottom()
      this.inputtext = ''
    },
    scrollToBottom () {
      clearInterval(this.timer)
      let tm = 20
      this.timer = setInterval(() => {
        const chatMessages = document
          .getElementById('chatbox')
          .getElementsByClassName('chat-messages')[0]
        chatMessages.scrollTop = chatMessages.scrollHeight
        tm--
        if (tm < 0) {
          clearInterval(this.timer)
        }
      }, 500)
    }
  }

}
</script>

<style scoped>
.chat-window {
  width: 100%;
  height:100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-messages {
  bottom: 7rem;
  overflow-y: auto;

  position: absolute;
  top: 0;
  width: 100%;
}

.message {
  display: flex;
  margin-bottom: 10px;
}

.from-user {
  flex-direction: row-reverse;
}

.from-user .avatar {
  margin-right: 10px;
  align-self: flex-end;
}

.from-agent .avatar {
  margin-left: 10px;
  align-self: flex-start;
}

.from-user .content {
  background-color: #007bff;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  align-self: flex-end;
}

.from-agent .content {
  background-color: #f2f2f2;
  color: #333;
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  align-self: flex-start;
}

.chat-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  position: absolute;
  width: 100%;
  height: 3rem;
  bottom: 2rem;
  border-width: 1rem;
  border-color: #f2f2f2;
  border-style: solid;
}

.chat-input textarea {
  flex: 1;
  resize: none;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  background-color: #fff;
  height: 2rem;
}

.chat-input button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 2rem;
}

.chat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  text-align: center;
  background-color: #f2f2f2;
  position: absolute;
  bottom: 0rem;
  width: 100%;
}
.chat-footer-item {
  cursor: pointer;
  /* flex: 1; */
}

.extquestion {
  font-size: 0.75rem;
  font-weight: 100;
  margin: 1rem;
  color: #007bff;
}
.extquestion .message {
  display: inline-block;
  color: #333;

  margin: 0.2rem;
}
</style>