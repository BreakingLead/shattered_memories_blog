#import "@preview/golixp-resume-zh-cn:0.1.2": *

#let ink = rgb("#172033")
#let accent = rgb("#2563a8")
#let accent-strong = rgb("#174f8d")
#let muted = rgb("#5f6b7a")
#let subtle = rgb("#7d8998")
#let divider = rgb("#cdd7e3")
#let panel = rgb("#f5f8fb")

#show: resume-doc.with(
	overrides: (
		fonts: (
			main: "Sarasa Gothic SC",
			mono: "Sarasa Mono SC",
			sc: "Sarasa Gothic SC",
		),
		colors: (
			primary: accent,
			secondary: muted,
			light: subtle,
			background: panel,
			border: divider,
			black: ink,
		),
		font-sizes: (
			base: 8pt,
			h1: 2.7em,
			h2: 1.42em,
			h3: 1.08em,
			small: 0.82em,
			xsmall: 0.75em,
		),
		spacing: (
			paragraph: 0.4em,
			section: 0.52em,
			subsection: 0.3em,
			list-item: 0.2em,
			component-inner: 0.35em,
			component-outer: 0.45em,
		),
		page-margins: (
			top: 10mm,
			bottom: 10mm,
			left: 12mm,
			right: 12mm,
		),
		style-features: (
			paragraph-justify: true,
			list-marker: [›],
			heading-line-stroke: 0.55pt,
		),
		layout-defaults: (
			sidebar-width: 18%,
			two-col-ratio: (1fr, 1fr),
			timeline-stroke: 0.55pt,
			card-radius: 2pt,
			card-padding: 4pt,
		),
	),
)

#set text(fill: ink)
#show link: set text(fill: accent-strong)

#personal-header(
	"千秋",
	(
		(icon: "email", content: "breakingleadqwq@gmail.com", link: "mailto:breakingleadqwq@gmail.com"),
		(icon: "github", content: "BreakingLead", link: "https://github.com/BreakingLead"),
		(icon: "blog", content: "个人技术博客", link: "https://breakinglead.github.io/shattered_memories_blog/blog/"),
		(icon: "location", content: "上海 / 远程"),
	),
)
#text(size: 0.95em, weight: "medium", fill: accent-strong)[独立开发者 · 图形系统 · 形式化验证]

#section-header("个人总结", icon-name: "lightbulb")
#summary-list((
	[独立开发者，长期关注图形学、Rust、Lisp、开发工具与编程语言。],
	[使用 Rust + WebGPU 从零实现类 Minecraft 体素游戏引擎，提供具有一致性的 API 接口，并应用多种优化算法与工程技巧。],
	[基于 Lean 对 IMO 数学题进行形式化与验证，熟悉函数式编程和定理证明形式化。],
	[完成多个毕业设计、大作业等端到端构建，负责从需求沟通到交付的全流程。],
	[建立 Vibe Coding 与人工审核相结合的工作流，完成一系列工具开发。],
))

#section-header("工作经历", icon-name: "work")
#work-item(
	"2025.01—2025.03",
	"整数智能信息技术（杭州）有限责任公司",
	position: "形式化验证数据标注 · 500¥/h",
	location: "远程",
	tech-stack: ("Lean", "IMO", "函数式编程"),
	responsibilities: (
		[使用 Lean 证明助手对数学竞赛题目进行定理形式化与验证。],
	),
)
#work-item(
	"2025.03—至今",
	"Independent",
	position: "自由职业 / 接单开发",
	location: "远程",
	tech-stack: ("Python", "OpenCV", "pandas", "自动化"),
	responsibilities: (
		[独立开发表格处理、图像识别、数据清洗和任务自动化脚本。],
		[负责需求澄清、方案设计、代码实现、交付与后续沟通。],
	),
)

#section-header("主要项目", icon-name: "project")
#two-col(
	[
		#project-item(
			"Blockworld",
			[类 Minecraft 游戏引擎，致力于源码级兼容 Minecraft 客户端/服务端。],
			tech-stack: ("Rust", "WebGPU", "ECS", "体素渲染", "89 stars"),
			responsibilities: (
				[使用内存池、RAII、静态 Lazy 加载等多种方式进行高性能内存管理。],
				[实现视锥剔除、相邻面剔除等渲染优化算法。],
				[使用 Channel/mpsc 在多线程上并发生成游戏地图，提升地形生成速度。],
			),
			link: "https://github.com/BreakingLead/blockworld",
		)
	],
	[
		#project-item(
			"Moonbite",
			[2024 年 MoonBit 全球编程创新挑战赛参赛项目。],
			tech-stack: ("MoonBit", "编译器"),
			responsibilities: (
				[探索 Hindley–Milner 风格类型系统和语言实现中的工程取舍。],
				[实现 tokenizer / lexer / SSA IR / CPS IR 多级 pass。],
			),
			link: "https://github.com/BreakingLead/moonbite",
		)
	],
	gutter: 0.9em,
)
#two-col(
	[
		#project-item(
			"Bee Agent",
			[基于 Anthropic Go SDK 实现的编码 Agent，包含终端会话、权限控制、技能、记忆和可视化 Agent / Workflow 配置。],
			tech-stack: ("Go", "LLM Agent", "TUI", "Workflow DAG"),
			responsibilities: (
				[实现 Bubble Tea TUI、会话持久化与恢复、模式切换和工具权限确认流程。],
				[构建 Agent Builder 与 Workflow DAG，支持 typed node graph、blueprint、dry-run、compiled plan 和 run history。],
				[实现记忆、后台任务、cron、subagent、消息平台适配、Telegram 接入和 CoC 跑团工具等模块。],
			),
			link: "https://github.com/BreakingLead/bee_agent",
		)
	],
	[
		#project-item(
			"技术写作与笔记",
			[长期在知乎等网站发布技术内容。],
			tech-stack: ("图形学", "编程语言", "Rust", "数学"),
			responsibilities: (
				[涵盖计算机图形学、数学、函数式编程等方向。],
			),
			link: "https://breakinglead.github.io/shattered_memories_blog/blog/",
		)
	],
	gutter: 0.9em,
)

#section-header("专业技能", icon-name: "code")
#two-col(
	[
		#skill-category(
			"编程语言",
			("Rust", "Python", "TypeScript", "Lean4", "C/C++", "Go", "Zig", "Haskell", "Scheme Lisp"),
			icon-names: ("rust", "python", "typescript"),
		)
		#v(0.35em)
		#skill-category(
			"图形学和项目管理",
			("WebGPU", "ECS", "Ray Tracing", "Linux", "Docker", "Git"),
			icon-names: (none, none, none, "linux", "docker", "git"),
		)
	],
	[
		#skill-category(
			"Web 与后端",
			("WebAssembly", "React", "Astro", "Vite", "Node.js", "Bun", "FastAPI", "Spring Boot"),
			icon-names: (none, "react"),
		)
		#v(0.35em)
		#skill-category(
			"理论方向",
			("形式化验证", "类型系统", "依赖类型", "System F", "范畴论"),
		)
	],
	gutter: 1em,
)

#section-header("教育经历", icon-name: "graduation")
#education-item(
	"2023.09—2026.06",
	"西北工业大学附属中学",
	"高中",
	"理科",
	honors: ("2021 年 NOIP 入门组二等奖",),
)
