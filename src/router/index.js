import list from '@/pages/list/list'
import index from '@/pages/index'
import login from '@/pages/login'
export default[
    {
      path: '/',
      redirect: '/index'   // 当访问根目录的时候默认跳转到主页
    },

    {
      path: '/index',
      component: index
    },
    {
      path: '/list',
      component: list
    },
    {
      path: '/login',
      component: login
    },
  ]

