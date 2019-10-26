import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "boot",
      component: () => import("./views/Boot/Boot.vue"),
      meta: {
        title: "引导页"
      }
    },
    {
      path: "/success",
      name: "success",
      component: () => import("./views/success/success.vue"),
      meta: {
        title: "验证邮箱"
      }
    },
    {
      path: "/sign",
      name: "sign",
      component: () => import("./views/sign/sign.vue"),
      meta: {
        title: "注册"
      }
    },
    {
      path: "/loginList",
      name: "loginList",
      component: () => import("./views/sign/loginList.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/forgetPass",
      name: "forgetPass",
      component: () => import("./views/sign/forgetPass.vue"),
      meta: {
        title: "修改密码"
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register/Forregister.vue"),
      meta: {
        title: "未注册用户"
      }
    },
    {
      path: "/Authentication",
      name: "Authentication",
      component: () => import("./views/success/Authentication.vue"),
      meta: {
        title: "申请认证"
      }
    },
    {
      path: "/infoOne",
      name: "infoOne",
      component: () => import("./views/sign/infoOne.vue"),
      meta: {
        title: "基础信息"
      }
    },
    {
      path: "/info",
      name: "info",
      component: () => import("./views/sign/info.vue"),
      meta: {
        title: "简易信息"
      }
    },
    {
      path: "/infoTwo",
      name: "infoTwo",
      component: () => import("./views/sign/infoTwo.vue"),
      meta: {
        title: "行业及商业伙伴"
      }
    },
    {
      path: "/infoThree",
      name: "infoThree",
      component: () => import("./views/sign/infoThree.vue"),
      meta: {
        title: "其他信息"
      }
    },
    {
      path: "/infoFour",
      name: "infoFour",
      component: () => import("./views/sign/infoFour.vue"),
      meta: {
        title: "形象展示"
      }
    },
    {
      path: "/infoFive",
      name: "infoFive",
      component: () => import("./views/sign/infoFive.vue"),
      meta: {
        title: "信息核对"
      }
    },
    {
      path: "/Nav",
      component: () => import("./views/all.vue"),
      redirect: "/Nav",
      children: [
        {
          path: "/home",
          component: () => import("./views/home/home.vue"),
          name: "home",
          meta: {
            title: "首页"
          }
        },
        {
          path: "/search",
          component: () => import("./views/search/search.vue"),
          name: "search",
          meta: {
            title: "搜索结果"
          }
        },
        {
          path: "/searchExhibition",
          component: () => import("./views/search/searchExhibition.vue"),
          name: "searchExhibition",
          meta: {
            title: "展会搜索结果"
          }
        },
        {
          path: "/searchBrochure",
          component: () => import("./views/search/searchBrochure.vue"),
          name: "searchBrochure",
          meta: {
            title: "产品搜索结果"
          }
        },
        {
          path: "/searchCompaby",
          component: () => import("./views/search/searchCompaby.vue"),
          name: "searchCompaby",
          meta: {
            title: "企业搜索结果"
          }
        },
        {
          path: "/searchImages",
          component: () => import("./views/search/searhImages.vue"),
          name: "searchImages",
          meta: {
            title: "图片搜索结果"
          }
        },
        {
          path: "/searchEvent",
          component: () => import("./views/search/searchEvent.vue"),
          name: "searchEvent",
          meta: {
            title: "动态搜索结果"
          }
        },
        {
          path: "/News",
          component: () => import("./views/news/news.vue"),
          name: "News",
          meta: {
            title: "消息列表页"
          }
        },
        {
          path: "/enterprise",
          component: () => import("./views/enterprise/enterprise.vue"),
          name: "enterprise",
          meta: {
            title: "企业发现"
          }
        },
        {
          path: "/history",
          component: () => import("./views/enterprise/history.vue"),
          name: "history",
          meta: {
            title: "历史纪录"
          }
        },
        {
          path: "/collection",
          component: () => import("./views/enterprise/collection.vue"),
          name: "collection",
          meta: {
            title: "收藏记录"
          }
        },
        {
          path: "/core",
          component: () => import("./views/core/core.vue"),
          name: "core",
          meta: {
            title: "企业主页"
          }
        },
        {
          path: "/othercore",
          component: () => import("./views/core/othercore.vue"),
          name: "othercore",
          meta: {
            title: "企业主页"
          }
        },
        {
          path: "/productList",
          component: () => import("./views/core/productList.vue"),
          name: "productList",
          meta: {
            title: "企业手册"
          }
        },
        {
          path: "/exhibition",
          component: () => import("./views/exhibition/exhibition.vue"),
          name: "exhibition",
          meta: {
            title: "展会列表"
          }
        },
        {
          path: "/exhibitionDetails",
          component: () => import("./views/exhibition/exhibitionDetails.vue"),
          name: "exhibitionDetails",
          meta: {
            title: "展会详情"
          }
        },
      ]
    }
  ]
});
