import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:"layout",
      component: ()=>import('@/views/Layout.vue'),
      children:[
        {
          path:'/',
          name:'knows',
          component: ()=>import('@/views/Knows.vue')
        },
        {
          path:'/search',
          name:'搜索',
          component: ()=>import('@/views/Search.vue'),
          children:[{
            path:'/:pBoardId',
            name:'分类板块',
            component: ()=>import('@/views/Search.vue')
          }] 
        },
        {
          path:'/publish',
          name:'发布文章',
          component: ()=>import('@/views/Publish.vue')
        },
        {
          path:'/rePublish/:articleId',
          name:'修改文章',
          component: ()=>import('@/views/Publish.vue')
        },
        {
          path:'/Message',
          name:'消息',
          component: ()=>import('@/views/Message.vue')
        },
        {
          path:'/user/:userId',
          name:'个人中心',
          component: ()=>import('@/views/User.vue')
        },
        {
          path:'/post/:articleId',
          name:'文章详情',
          component: ()=>import('@/views/Article.vue')
        },
        {
          path:'/forum/search/:word',
          name:'搜索关键字',
          component: ()=>import('@/views/forumSearch.vue')
        }
      ]
    },

  ]

})

export default router
