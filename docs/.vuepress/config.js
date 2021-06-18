// 配置文件的入口文件
// 文档：https://vuepress.vuejs.org/zh/config/

module.exports = {
  title: "JeremyJone 的文档站",
  description: "jeremyjone document web",

  base: "/docs/",

  head: [
    ["link", { rel: "icon", href: "/assets/img/logo.png" }],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/darkreader@4.9.32/darkreader.min.js"
      }
    ],
    [
      "script",
      {
        src: "/js/base.js"
      }
    ]
  ],

  themeConfig: {
    // 网站logo
    logo: "/assets/img/logo.png",

    // 页面滚动效果
    smoothScroll: true,

    // 导航链接
    nav: [
      { text: "首页", link: "/" },
      {
        text: "代码相关",
        ariaLabel: "代码相关菜单",
        items: [
          { text: "代码编写规范", link: "/standard/" },
          { text: "代码库", link: "/codes/" }
        ]
      },
      { text: "文档手册", ariaLabel: "文档手册菜单", link: "/document/" },

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
      "/codes/": getCodesSideBar()
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
    // {
    //   title: "代码编写规范",
    //   collapsable: false,
    //   children: ["", "csharp", "css", "html", "javascript", "python", "vue"]
    // }
    _GetSubSideBar(
      "代码编写规范",
      "",
      ["", "csharp", "css", "html", "javascript", "python", "vue"],
      false
    )
  ];
}

function getDocumentSideBar() {
  return [
    _GetSubSideBar("Git 使用文档", "", ["git"]),
    _GetSubSideBar("Markdown 使用文档", "", ["markdown"]),
    _GetSubSideBar("Vim 使用文档", "", ["vim"]),
    _GetSubSideBar("持续学习路线", "", [
      "roadmap/",
      {
        title: ".NET 学习之路",
        collapsable: true,
        children: [
          "roadmap/dotnetcore/",
          "roadmap/dotnetcore/basic",
          _GetSubSideBar("依赖注入", "roadmap/dotnetcore/di", [
            "",
            "lifetimes",
            "collections"
          ]),
          _GetSubSideBar("数据库", "roadmap/dotnetcore/db", [
            "",
            _GetSubSideBar(
              "Entity Framework Core",
              "roadmap/dotnetcore/db/efcore",
              ["", "context", "model", "manage", "use"]
            ),
            "other"
          ]),
          _GetSubSideBar("对象映射", "roadmap/dotnetcore/mapper", [
            "",
            "automapper"
          ]),
          _GetSubSideBar("认证与授权", "roadmap/dotnetcore/auth", [
            "",
            "example",
            "jwt",
            _GetSubSideBar("IdentityServer4", "roadmap/dotnetcore/auth/is4", [
              "",
              "useef",
              "external-account",
              "intro-config"
            ])
          ]),
          _GetSubSideBar("缓存", "roadmap/dotnetcore/cache", [
            "",
            "memory",
            "distributed"
          ]),
          _GetSubSideBar("日志", "roadmap/dotnetcore/log", ["Serilog", "APM"]),
          _GetSubSideBar("Swagger 文档", "roadmap/dotnetcore/swagger", [""])
        ]
      },
      "roadmap/java",
      "roadmap/react",
      "roadmap/flutter",
      "roadmap/android"
    ]),
    _GetSubSideBar("JzGantt 组件使用文档", "gantt", [
      "",
      "root",
      "column",
      "slider",
      "common"
    ])
  ];
}

function getCodesSideBar() {
  return [
    // {
    //   title: "代码库",
    //   collapsable: true,
    //   children: [""]
    // },
    _GetSubSideBar("JavaScript方法", "js", [
      "",
      "array",
      "create",
      "judge",
      "date",
      "colors",
      "html"
    ])
  ];
}

function _GetSubSideBar(title, path, name, collapsable = true) {
  if (path === "") path = ".";

  return {
    title,
    collapsable: collapsable,
    children: name.map(n => (typeof n === "string" ? `${path}/${n}` : n))
  };
}
