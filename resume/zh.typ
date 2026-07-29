#let ink = rgb("#172033")
#let muted = rgb("#5f6b7a")
#let subtle = rgb("#7d8998")
#let accent = rgb("#2563a8")
#let accent-strong = rgb("#174f8d")
#let divider = rgb("#cdd7e3")
#let panel = rgb("#f5f8fb")
#let white = rgb("#ffffff")

#set page(
  paper: "a4",
  margin: (x: 13mm, y: 12mm),
  fill: white,
  footer: context [
    #set text(size: 7.5pt, fill: subtle)
    #align(center)[千秋 · 中文简历 · #counter(page).display("1 / 1", both: true)]
  ],
)
#set text(
  font: "Sarasa Gothic SC",
  size: 8.6pt,
  fill: ink,
  lang: "zh",
  region: "CN",
)
#set par(justify: true, leading: 0.46em)
#set list(indent: 1em, body-indent: 0.42em, spacing: 0.3em)
#show link: set text(fill: accent-strong)

#let mono(body, size: 7.6pt, fill: muted) = text(
  font: "Sarasa Mono SC",
  size: size,
  fill: fill,
  body,
)

#let section-title(title) = block(
  width: 100%,
  above: 8pt,
  below: 4.5pt,
  breakable: false,
)[
  #grid(
    columns: (auto, 1fr),
    column-gutter: 7pt,
    align: horizon,
    text(size: 12.5pt, weight: "bold", fill: accent)[#title],
    line(length: 100%, stroke: 0.8pt + divider),
  )
]

#let bullet-list(items) = list(
  marker: text(fill: accent, weight: "bold")[›],
  ..items.map(item => [#item]),
)

#let tag(body) = box(
  inset: (x: 4pt, y: 2pt),
  radius: 2pt,
  stroke: 0.5pt + divider,
  fill: white,
  mono(body, size: 7pt, fill: ink),
)

#let card(body, fill-color: panel, breakable: false) = block(
  width: 100%,
  inset: 7pt,
  radius: 3pt,
  stroke: 0.6pt + divider,
  fill: fill-color,
  breakable: breakable,
  body,
)

#let project(name, url, meta, summary, points) = card([
  #link(url)[#text(size: 10pt, weight: "bold", fill: ink)[#name]]
  #h(4pt)#mono(meta, size: 7.1pt, fill: subtle)
  #v(2pt)
  #text(fill: muted)[#summary]
  #v(2pt)
  #bullet-list(points)
])

#let experience(period, title, company, meta, points) = block(
  width: 100%,
  breakable: false,
  above: 2pt,
  below: 4pt,
)[
  #grid(
    columns: (28mm, 1fr),
    column-gutter: 8pt,
    mono(period, size: 7.4pt, fill: subtle),
    [
      #text(size: 9.8pt, weight: "bold")[#title]
      #linebreak()
      #mono([#company · #meta], size: 7.2pt, fill: subtle)
      #v(2pt)
      #bullet-list(points)
    ],
  )
]

// Header
#grid(
  columns: (1.25fr, 0.75fr),
  column-gutter: 8pt,
  align: top,
  card(fill-color: white, [
    #mono([CURRICULUM VITAE], size: 7.4pt, fill: subtle)
    #v(2pt)
    #text(size: 25pt, weight: "bold", fill: ink)[千秋]
    #v(1pt)
    #mono([独立开发者 · 图形系统 · 形式化验证], size: 8.4pt, fill: accent-strong)
  ]),
  card([
    #grid(
      columns: (10mm, 1fr),
      row-gutter: 2.7pt,
      mono([邮箱], size: 6.8pt, fill: subtle),
      link("mailto:breakingleadqwq@gmail.com")[#text("breakingleadqwq@gmail.com")],
      mono([GitHub], size: 6.8pt, fill: subtle),
      link("https://github.com/BreakingLead")[github.com/BreakingLead],
      mono([博客], size: 6.8pt, fill: subtle),
      link("https://breakinglead.github.io/shattered_memories_blog/blog/")[个人技术博客],
      mono([地点], size: 6.8pt, fill: subtle),
      [上海 / 远程],
    )
  ]),
)

#section-title([个人总结])
#card(fill-color: white, breakable: true)[
  #bullet-list((
    [独立开发者，长期关注图形学、Rust、Lisp、开发工具与编程语言。],
    [使用 Rust + WebGPU 从零实现类 Minecraft 体素游戏引擎，提供具有一致性的 API 接口，并应用多种优化算法与工程技巧。],
    [基于 Lean 对 IMO 数学题进行形式化与验证，熟悉函数式编程和定理证明形式化。],
    [完成多个毕业设计、大作业等端到端构建，负责从需求沟通到交付的全流程。],
    [建立 Vibe Coding 与人工审核相结合的工作流，完成一系列工具开发。],
  ))
]

#section-title([工作经历])
#experience(
  [2025.01—2025.03],
  [形式化验证数据标注],
  [整数智能信息技术（杭州）有限责任公司],
  [500¥/h · Lean · IMO · 函数式编程],
  ([使用 Lean 证明助手对数学竞赛题目进行定理形式化与验证。],),
)
#line(length: 100%, stroke: 0.5pt + divider)
#v(3pt)
#experience(
  [2025.03—至今],
  [自由职业 / 接单开发],
  [Independent],
  [远程 · Python · OpenCV · pandas · 自动化],
  (
    [独立开发表格处理、图像识别、数据清洗和任务自动化脚本。],
    [负责需求澄清、方案设计、代码实现、交付与后续沟通。],
  ),
)

#section-title([主要项目])
#grid(
  columns: (1fr, 1fr),
  column-gutter: 7pt,
  row-gutter: 7pt,
  project(
    [Blockworld],
    "https://github.com/BreakingLead/blockworld",
    [Rust · WebGPU · ECS · 体素渲染 · 89 stars],
    [类 Minecraft 游戏引擎，致力于源码级兼容 Minecraft 客户端/服务端。],
    (
      [使用内存池、RAII、静态 Lazy 加载等多种方式进行高性能内存管理。],
      [实现视锥剔除、相邻面剔除等渲染优化算法。],
      [使用 Channel/mpsc 在多线程上并发生成游戏地图，提升地形生成速度。],
    ),
  ),
  project(
    [Moonbite],
    "https://github.com/BreakingLead/moonbite",
    [MoonBit · 编译器],
    [2024 年 MoonBit 全球编程创新挑战赛参赛项目。],
    (
      [探索 Hindley–Milner 风格类型系统和语言实现中的工程取舍。],
      [实现 tokenizer / lexer / SSA IR / CPS IR 多级 pass。],
    ),
  ),
  project(
    [Bee Agent],
    "https://github.com/BreakingLead/bee_agent",
    [Go · LLM Agent · TUI · Workflow DAG],
    [基于 Anthropic Go SDK 实现的编码 Agent，包含终端会话、权限控制、技能、记忆和可视化 Agent / Workflow 配置。],
    (
      [实现 Bubble Tea TUI、会话持久化与恢复、模式切换和工具权限确认流程。],
      [构建 Agent Builder 与 Workflow DAG，支持 typed node graph、blueprint、dry-run、compiled plan 和 run history。],
      [实现记忆、后台任务、cron、subagent、消息平台适配、Telegram 接入和 CoC 跑团工具等模块。],
    ),
  ),
  project(
    [技术写作与笔记],
    "https://breakinglead.github.io/shattered_memories_blog/blog/",
    [图形学 · 编程语言 · Rust · 数学],
    [长期在知乎等网站发布技术内容。],
    ([涵盖计算机图形学、数学、函数式编程等方向。],),
  ),
)

#section-title([专业技能])
#grid(
  columns: (1fr, 1fr),
  column-gutter: 7pt,
  row-gutter: 6pt,
  card([
    #text(weight: "bold")[编程语言] #h(4pt)
    #tag([Rust]) #tag([Python]) #tag([TypeScript]) #tag([Lean4]) #tag([C/C++]) #tag([Go]) #tag([Zig]) #tag([Haskell]) #tag([Scheme Lisp])
  ]),
  card([
    #text(weight: "bold")[图形学和项目管理] #h(4pt)
    #tag([WebGPU]) #tag([ECS]) #tag([Ray Tracing]) #tag([Linux]) #tag([Docker]) #tag([Git])
  ]),
  card([
    #text(weight: "bold")[Web 与后端] #h(4pt)
    #tag([WebAssembly]) #tag([React]) #tag([Astro]) #tag([Vite]) #tag([Node.js]) #tag([Bun]) #tag([FastAPI]) #tag([Spring Boot])
  ]),
  card([
    #text(weight: "bold")[理论方向] #h(4pt)
    #tag([形式化验证]) #tag([类型系统]) #tag([依赖类型]) #tag([System F]) #tag([范畴论])
  ]),
)

#section-title([教育经历与公开主页])
#grid(
  columns: (1fr, 1fr),
  column-gutter: 7pt,
  card([
    #text(size: 9.5pt, weight: "bold")[西北工业大学附属中学]
    #linebreak()
    #mono([2023.09—2026.06 · 高中 · 理科], size: 7.2pt, fill: subtle)
    #linebreak()
    2021 年取得 NOIP 入门组二等奖
  ]),
  card([
    #link("https://github.com/BreakingLead")[#text(size: 9.5pt, weight: "bold")[GitHub: BreakingLead]]
    #linebreak()
    #mono([Computer Graphics · Rustacean · Lisp User], size: 7.2pt, fill: subtle)
  ]),
)
