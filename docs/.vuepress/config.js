// 配置文件的入口文件
// 文档：https://vuepress.vuejs.org/zh/config/

module.exports = {
  title: "JeremyJone 的文档站",
  description: "jeremyjone document web",

  base: "/docs/",

  themeConfig: {
    // 网站logo
    logo: "/assets/img/logo.png",

    // 页面滚动效果
    smoothScroll: true,

    // 导航链接
    nav: [
      { text: "首页", link: "/" },
      { text: "代码编写规范", link: "/standard/" },
      { text: "文档手册", link: "/document/" },
      { text: "代码库", link: "/codes/" },

      // 外部链接
      { text: "我的博客站", link: "https://jeremyjone.com", target: "_blank" },
      { text: "Google", link: "https://google.com", target: "_blank" }

      // 配置下拉菜单导航，可以深层嵌套
      // {
      //     text: "Languages",
      //     ariaLabel: "Language Menu",
      //     items: [
      //         {text: "Chinese", link: "/"},
      //         {text: "English", link: "/"}
      //     ]
      // }
    ],

    // 侧边栏，自动生成
    // sidebar: "auto",

    // 侧边栏标题深度，最大就是2，也就是可以提取 h2 和 h3
    sidebarDepth: 2,

    // 侧边栏显示所有当前活动页面的标题链接，默认为false
    // displayAllHeaders: true,

    // 当用户滚动页面时，实时更新激活的标题
    // activeHeaderLinks: true,

    // 侧边栏，手动配置，根据目录结构，生成不同的配置
    sidebar: {
      "/standard/": getStandardSideBar(),
      "/document/": getDocumentSideBar(),
      "/codes/": GetCodesSideBar()
    },

    // 禁用搜索
    // search: false,

    // 设置最大显示数量
    searchMaxSuggertions: 10,

    // 最后更新时间
    lastUpdated: "最后更新时间",

    // 上/下 一篇，默认值就是true
    nextLinks: true,
    prevLinks: true,

    // 编辑链接
    repo: "jeremyjone/docs-admin",
    repoLabel: "GitHub",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "修改此页面"
  },

  // 更多配置markdown的内容，参看 https://github.com/markdown-it/markdown-it
  markdown: {
    lineNumbers: true,
    html: true,
    xhtmlOut: true,
    // markdown-it-anchor 的选项
    // anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3, 4, 5] },
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-mark")),
        md.use(require("markdown-it-footnote")),
        md.use(require("markdown-it-mathjax")());
    }
  }
};

function getStandardSideBar() {
  return [
    {
      title: "代码编写规范",
      collapsable: false,
      children: ["", "csharp", "css", "html", "javascript", "python", "vue"]
    }
  ];
}

function getDocumentSideBar() {
  return [
    {
      title: "Git 使用文档",
      collapsable: true,
      children: ["git"]
    },
    {
      title: "Markdown 使用文档",
      collapsable: true,
      children: ["markdown"]
    },
    {
      title: "Vim 使用文档",
      collapsable: true,
      children: ["vim"]
    },
    {
      title: "JzGantt 组件使用文档",
      collapsable: true,
      children: [
        "gantt/",
        "gantt/root",
        "gantt/column",
        "gantt/slider",
        "gantt/common"
      ]
    }
  ];
}

function GetCodesSideBar() {
  return [
    // {
    //   title: "代码库",
    //   collapsable: true,
    //   children: [""]
    // },
    {
      title: "JavaScript方法",
      collapsable: true,
      children: [
        "js/",
        "js/array",
        "js/create",
        "js/judge",
        "js/date",
        "js/colors",
        "js/html"
      ]
    }
  ];
}
