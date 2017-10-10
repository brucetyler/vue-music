import Vue from 'vue'
import Router from 'vue-router'
import Mymusic from './../components/mymusic'
import Findmusic from './../components/findmusic'
import Community from './../components/community'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/mymusic'
    },
    {
      path: '/mymusic',
      name: 'mymusic',
      component: Mymusic
    },
    {
      path: '/findmusic',
      name: 'findmusic',
      component: Findmusic
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    }
  ]
})
