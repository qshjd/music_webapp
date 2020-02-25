import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//异步加载组件
//我的页面
const Mine = resolve => {
  import("../views/Mine.vue").then(module => {
    resolve(module);
  });
};
//发现页
const Find = resolve => {
  import("../views/Find.vue").then(module => {
    resolve(module);
  });
};
//搜索页
const Search = resolve => {
  import("../views/Search.vue").then(module => {
    resolve(module);
  });
};
//歌曲列表页
const MusicList = resolve => {
  import("../views/MusicList.vue").then(module => {
    resolve(module)
  })
}
const routes = [{
    //默认跳转到我的
    path: "/",
    redirect: "/find"
  },
  {
    path: "/mine",
    component: Mine
  },
  {
    path: "/find",
    component: Find,
    children: [{
      path: ':id',
      component: MusicList
    }]
  },
  {
    path: "/search",
    name: "search",
    component: Search
  }
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;