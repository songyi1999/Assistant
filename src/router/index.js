import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/components/mainpage'
import chat from '@/components/chat.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: mainpage,
      children: [
        {
          path: '',
          component: chat
        }

      ]

    }
  ]
})
