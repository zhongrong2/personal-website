/* ============================================================
   钟荣 · 个人简历项目网站 — 项目数据
   所有内容提取自《钟荣简历详细版.docx》
   ============================================================ */

const PROFILE = {
  name: "钟 荣",
  title: "前端开发工程师",
  years: 7,
  intro: "7 年前端开发经验，北京交通大学 · 计算机科学与技术。多次完成从需求调研、技术选型、框架搭建、组件封装到上线运维的 0→1 完整项目实战；主导 50+ 模块、400+ 页面的平台型项目，具备大模型问答、知识图谱、AI 摘要与翻译的完整 AI 落地经验，以及知识图谱、统计大屏与 Cesium 三维地球的可视化积累。",
  phone: "18501297827",
  email: "z18501297827@163.com",
  status: "可立即到岗",
  school: "北京交通大学",
  major: "计算机科学与技术",
};

const HERO_STATS = [
  { num: "7年+", label: "前端开发经验" },
  { num: "50+", label: "业务模块" },
  { num: "400+", label: "页面交付" },
  { num: "11+", label: "完整项目" },
];

const SKILL_GROUPS = [
  {
    icon: "M8 6l-6 6 6 6M16 6l6 6-6 6",
    name: "前端核心技术",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "Vue2 / Vue3", "Vue Router", "Pinia", "Element Plus", "React", "Angular", "Sass / Less", "Canvas", "Tailwind CSS", "Bootstrap", "Vant"],
    desc: "精通 HTML5 / CSS3 / JavaScript，熟练 TypeScript 与 Vue 全家桶，掌握 W3C 标准、复杂布局、CSS3 动画与浏览器渲染原理。",
  },
  {
    icon: "M4 6h16M4 12h10M4 18h7",
    name: "工程化与构建",
    items: ["Vite", "Webpack", "Git", "SVN", "ESLint", "Stylelint", "commitlint", "gzip / 分包优化", "按需引入", "依赖预构建", "HTTP/HTTPS", "跨域方案", "性能优化"],
    desc: "熟练 Vite / Webpack 构建配置与体积优化，主导代码规范落地，熟悉性能优化与跨域解决方案。",
  },
  {
    icon: "M3 3v18h18M7 14l4-6 4 3 5-8",
    name: "可视化与三维 GIS",
    items: ["ECharts", "echarts-gl", "D3.js", "AntV G6", "AntV G2", "Cytoscape", "LogicFlow", "Cesium", "天地图对接", "html2canvas", "jsPDF"],
    desc: "可完成图表、知识图谱、关系图谱与统计大屏可视化；熟练 Cesium 三维地球、卫星轨道与第三方地图对接。",
  },
  {
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    name: "多端开发",
    items: ["微信公众号 H5", "微信小程序", "uni-app", "钉钉小程序", "第三方平台小程序", "微信 SDK", "微信支付", "上传 / 定位 / 分享"],
    desc: "精通公众号 H5、微信小程序、uni-app 多端开发，可集成支付、上传、定位等第三方能力。",
  },
  {
    icon: "M20 7l-8-4-8 4v6c0 5.25 3.4 9.74 8 11 4.6-1.26 8-5.75 8-11V7z",
    name: "后端协同",
    items: ["Node.js", "SQL", "Java 代码阅读", "PHP 代码阅读", "CRUD 接口开发", "接口规范对齐", "RuoYi 二次开发"],
    desc: "可读懂 Java / PHP 后端代码，具备 Node.js 开发经验与 SQL 基础，能独立完成简单业务接口开发调试。",
  },
  {
    icon: "M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zM9 21h6",
    name: "AI & 大模型",
    items: ["SSE 流式问答", "RAG 引用溯源", "AI 摘要生成", "AI 机器翻译", "智能搜索", "知识图谱抽取", "文本/图像识别", "fetch-event-source", "markdown-it 增量渲染"],
    desc: "有完整 AI 模块落地经验：SSE 流式问答、RAG 引用溯源、AI 摘要与翻译、知识图谱抽取，打通模型调用到结果可视化全链路。",
  },
];

const EXPERIENCE = [
  {
    company: "西安触星科技有限公司",
    role: "前端开发工程师",
    period: "2022.05 — 至今",
    points: [
      { t: "架构与交付", d: "独立负责多个业务系统从 0 到 1 的前端架构搭建、技术选型与公共组件封装，主导项目全生命周期落地；核心平台覆盖 50+ 业务模块、400+ 页面。" },
      { t: "技术攻坚", d: "作为前端技术核心，攻克性能优化、浏览器兼容、三维可视化与大模型前端集成等难点；完成千级节点知识图谱性能治理。" },
      { t: "AI 集成", d: "对接 AI、大数据团队完成大模型模块前端集成与数据可视化落地，实现 SSE 流式问答、RAG 引用溯源、AI 摘要与机器翻译等能力。" },
      { t: "需求与团队", d: "直接对接客户梳理业务诉求并输出可落地技术方案；负责代码评审、性能调优与版本迭代，沉淀团队通用组件与工具库。" },
    ],
  },
  {
    company: "西安佰思达科技有限公司",
    role: "前端开发工程师",
    period: "2020.04 — 2022.05",
    points: [
      { t: "多端交付", d: "基于 Vue 技术栈完成 PC 端、H5、小程序多端项目开发，负责页面布局、复杂数据交互与动画效果实现。" },
      { t: "联调排障", d: "对接 UI、后端完成页面实现与接口联调，独立处理跨域、兼容性与页面渲染性能问题，缩短联调周期。" },
      { t: "业务迭代", d: "参与需求分析与业务方对接，完成功能迭代、bug 修复与版本发布，支撑业务快速上线。" },
      { t: "后端协同", d: "参与简单后端业务逻辑开发调试，配合后端完成接口联调与问题定位，降低跨端沟通成本。" },
    ],
  },
  {
    company: "北京投创铭鼎科技有限公司",
    role: "前端开发工程师",
    period: "2018.07 — 2020.03",
    points: [
      { t: "页面开发", d: "负责 Web 页面开发，熟练运用 HTML/CSS/JavaScript 完成业务页面，使用 Git 进行版本管理。" },
      { t: "组件复用", d: "配合团队完成模块开发与联调测试，快速学习第三方组件、插件并完成二次封装，支撑业务快速迭代。" },
    ],
  },
];

const CATEGORIES = [
  { key: "all", name: "全部项目" },
  { key: "ai", name: "AI · 大模型" },
  { key: "platform", name: "平台系统" },
  { key: "visual", name: "可视化 · GIS" },
  { key: "medical", name: "医疗数据大屏" },
  { key: "mobile", name: "多端 · 小程序" },
];

const PROJECTS = [
  {
    id: "aero-knowledge",
    name: "航天装备知识库系统",
    cat: ["ai", "platform"],
    accent: "#22d3ee",
    period: "2023 — 至今",
    role: "前端负责人（双端同仓架构）",
    summary: "面向航天情报领域的 AI 知识平台，「管理后台 + 用户门户」双端同仓架构，覆盖情报采集、知识管理、AI 分析、可视化监控全链路。",
    description: [
      "采用「管理后台 + 用户门户」双端同仓架构（Vue3 + TS），后台含 6 大内容模块（舆情 / 报告 / 装备 / 术语库 / 态势告警 / 翻译任务）的 CRUD、权限与字典体系；门户含 7 个业务模块 + 3 个详情页，独立鉴权与深空风格大屏视觉体系。",
      "AI 能力深度嵌入业务流：SSE 流式智能问答（RAG 引用溯源）、报告 AI 摘要自动生成、AI 机器翻译（术语库约束）、AI 知识图谱 / 结构导图自动解析。",
    ],
    highlights: [
      { t: "双端请求层基础设施", d: "Axios 统一封装，后台 / 门户 Token 独立存储 + 按入口自动分流，两端登录、退出、失效互不影响。" },
      { t: "AI 智能问答", d: "基于 SSE 流式传输实现打字机式输出、多轮上下文与会话历史，游客 / 登录双通道鉴权自动切换；RAG 引用标记悬停弹出来源卡片（编号 + 原文摘要），让 AI 结论可验证。" },
      { t: "全域搜索", d: "跨 5 类资源统一检索，关键词 / 分类 / 分页同步 URL query（可分享、可回退）+ 300ms 防抖 + requestVersion 版本号竞态控制；结果按类型直达详情页并携带来源标记，返回时完整保留搜索状态；关键词高亮采用正则分段 + HTML 转义防 XSS。" },
      { t: "报告中心 + AI 摘要 + 思维导图", d: "保存成功后自动触发 AI 摘要生成，失败降级不阻断主流程；详情页集成 PDF 阅读器 + ECharts tree 结构导图，核心主题按字数动态撑高胶囊并自动换行、分层连线着色。" },
      { t: "舆情详情知识图谱", d: "ECharts 力导向三层实体网络 + 跨类别虚线关联，focus adjacency 悬停高亮相邻关系，分类图例筛选，支持拖拽 / 缩放。" },
      { t: "态势感知大屏", d: "ECharts effectScatter 全球轨道散点（涟漪动效、按轨道色分、经纬度 tooltip）；纯 CSS HUD：四角取景框、三层异速旋转雷达扫描、脉冲中心卡、分级告警面板 + 24 小时事件流时间轴，全部数据驱动。" },
      { t: "视觉体系与工程化", d: "提炼 glass-panel 深空玻璃拟态设计系统，统一定制 Element Plus 深色主题；全模块 loading / empty / error 三态兜底；vue-tsc 严格类型检查脚本化。" },
    ],
    tech: ["Vue 3", "TypeScript", "Element Plus", "SCSS", "ECharts", "SSE (EventSource / fetch stream)", "Axios", "vue-tsc"],
    shots: [
      { type: "chat", title: "AI 智能问答 · SSE 流式输出 + RAG 引用溯源" },
      { type: "dashboard", title: "用户门户 · 数据总览" },
      { type: "graph", title: "舆情详情 · 三层实体知识图谱" },
      { type: "admin", title: "管理后台 · 内容模块与权限字典" },
      { type: "bigscreen", title: "态势感知大屏 · 全球轨道散点 + HUD" },
      { type: "globe", title: "情报可视化监控 · 轨道态势" },
    ],
  },
  {
    id: "course-textbook",
    name: "课程教材建设管理系统（PC 端）",
    cat: ["platform", "ai"],
    accent: "#818cf8",
    period: "2023 — 2025",
    role: "前端架构师 · 从 0 主导技术选型与架构分层",
    summary: "面向军队院校与教育主管单位的多层级课程与教材建设项目管理平台，覆盖 50+ 业务子模块、400+ 页面，支撑多单位、多角色的在线申报与审批协同。",
    description: [
      "多层级（部级 / 省级 / 校级）课程与教材建设项目管理平台，打通「立项申报 → 培育 → 认定 → 发布」四阶段全生命周期闭环，横向承载专家评审与 AI 知识图谱两大子系统，替代原有线下填报与人工汇总流程。",
      "以「计划下达 + 过程模板 + 动态表单 + 里程碑流程」为架构底座，自研配置化表单引擎与 LogicFlow 流程编排解决业务高频变更问题；用 AntV G6 深度定制图谱可视化；用 SSE 流式方案支撑 AI 交互——三者构成本项目的技术壁垒，也是本人主导设计与落地的部分。",
      "从 0 主导前端技术选型与架构分层，负责三大核心方案的设计与攻坚，并制定目录规范、组件复用协议与 Code Review 机制。",
    ],
    highlights: [
      { t: "配置化架构 · 业务零代码扩展", d: "抽象「过程配置 → 阶段 → Tab → 表单模板 / 附件清单」四层元数据模型，一份配置同时驱动课程、教材两条业务线全部申报页，新增申报阶段由原 3 人日开发降为纯配置 0.5 人日；攻克「百字段级大表单」性能与耦合问题，每个 Tab 独立挂载 form-create 实例，拆分校验、回显与提交聚合链路。" },
      { t: "LogicFlow 流程编排设计器", d: "扩展 8 类自定义节点 + 自定义贝塞尔连线，集成 Menu / MiniMap / Snapshot 插件与节点属性面板；节点与里程碑强绑定校验，并行网关自动做出入度合法性校验，图数据序列化为 configJson 存储，支持保存、回显与多业务复用。" },
      { t: "知识图谱可视化（项目最高难度模块）", d: "自定义 ROOT 节点三重呼吸波纹、沿边流动小球动画、平行边自动偏移、邻居高亮 / 暗淡状态机；force2 + concentric + 聚类力多级布局，千级节点图谱保持可交互；将 40KB+ 画布逻辑抽象为参数化图谱组件，一套实现覆盖 4 类业务，实现画布 ↔ 过滤面板 ↔ 路径查询三联动。" },
      { t: "AI 流式交互体系", d: "统一 SSE 接入层：对话 / 写作 / 思维导图基于 fetch-event-source 实现 POST + Bearer 流式传输，AbortController 统一中止；markdown-it + highlight.js 输出即渲染，思维导图采用「流式先渲染文本 → 结束再成图」策略，支持 SVG → PNG 导出。" },
      { t: "专家评审子系统", d: "多轮次评审、评分项树形权重表、专家分组与任务切分（行拖拽排序）、打分 / 投票 / 排名三种评审模式与电子签名闭环；bignumber.js 定点运算实现 Σ(分值 × 权重) 高精度累加，从底层消除浮点误差导致的成绩公示争议。" },
      { t: "工程化底座", d: "terser + drop_console、echarts 独立分包、依赖预构建、gzip、按需引入；主导 ESLint / Stylelint / commitlint 规范落地；ECharts 8 图联动 + echarts-gl 3D 曲面饼图统计大屏。" },
    ],
    tech: ["Vue3", "TypeScript", "Vite", "Element Plus", "Pinia", "AntV G6", "Cytoscape", "D3", "echarts-gl", "LogicFlow", "form-create 3.x", "TinyMCE / WangEditor", "pdfjs / jsPDF", "bignumber.js"],
    shots: [
      { type: "admin", title: "申报管理后台 · 多层级项目申报" },
      { type: "flow", title: "LogicFlow 流程编排设计器 · 里程碑绑定" },
      { type: "graph", title: "AI 知识图谱 · 千级节点力导向布局" },
      { type: "dashboard", title: "建设进展综合态势 · 8 图联动大屏" },
      { type: "chat", title: "AI 对话 / 写作 · 流式渲染 + 思维导图" },
      { type: "admin", title: "专家评审子系统 · 多轮次权重打分" },
    ],
  },
  {
    id: "data-annotation",
    name: "数据标注管理系统",
    cat: ["platform"],
    accent: "#2dd4bf",
    period: "2024",
    role: "前端核心开发 · 标注工作台独立设计",
    summary: "面向 NLP / 文本数据生产场景的数据标注管理平台（B 端后台），支持标注项目全生命周期管理：创建项目 → 分配人员 → 上传数据集 → 配置标签 → 在线标注 → 审核 → 导出。",
    description: [
      "基于 RuoYi-Vue 开源框架二次开发，保留完整权限体系（用户 / 角色 / 菜单 / 部门 / 字典等），并扩展标注业务域：项目管理、项目成员管理、数据集管理、标签管理、在线标注工作台、审核与导出。",
      "支持多种标注类型：文本实体 / 关系标注（NER + 关系抽取）、文本分类、图片、视频标注，并提供「自动标注」（调用后端模型预标注，人工修正）；标注工作台通过 WebSocket 长连接以指令码（operaType）实时下发实体 / 关系的增删改操作，支持多人协同标注与结果实时刷新。",
    ],
    highlights: [
      { t: "标注业务模块开发（核心）", d: "项目列表 CRUD 与搜索、详情页 splitpanes 分栏布局（Tab + 动态组件切换三个子模块）；基于 v-annotator 二次封装 Annotator 通用标注组件：文本划词选区、实体打标、实体间关系连线、标签浮层定位、右键删除 / 点击修改、点 / 边双模式侧边栏，支持侧边栏拖拽移动与缩放。" },
      { t: "多类型标注工作台", d: "按项目类型动态渲染文本 / 图片 / 视频标注区，支持分类标签多选高亮、自动标注一键预标及结果回填；审核按钮权限控制、标注结果 blob 流式导出（file-saver 保存）。" },
      { t: "WebSocket 实时协同", d: "基于原生 WebSocket 封装标注页通信层，连接地址按 userId + datasetId 隔离会话；设计指令码消息协议，onmessage 统一分发驱动页面增量渲染；处理连接生命周期与页面销毁时关闭连接，防止内存泄漏与重复连接。" },
    ],
    tech: ["Vue3", "TypeScript", "Element Plus", "SCSS", "原生 WebSocket", "v-annotator 二次封装", "RuoYi-Vue 二次开发", "file-saver", "ECharts"],
    shots: [
      { type: "annotate", title: "在线标注工作台 · 实体关系划词标注" },
      { type: "admin", title: "标注项目管理 · 成员 / 数据集 / 标签" },
      { type: "dashboard", title: "首页数据看板 · 标注趋势统计" },
      { type: "chat", title: "自动标注 · 模型预标注 + 人工修正" },
    ],
  },
  {
    id: "space-graph",
    name: "太空力量知识图谱",
    cat: ["visual", "ai"],
    accent: "#a78bfa",
    period: "2023 — 2024",
    role: "前端核心开发 · 图谱与三维模块主导",
    summary: "面向航天与太空力量情报分析场景的 Web 可视化平台，以「实体 + 关系」为核心数据模型，将分散的情报资料组织成可检索、可下钻、可关联分析的知识网络，共 20+ 路由页面。",
    description: [
      "以实体（装备、机构、人物、事件、政策）+ 关系为核心数据模型，包含全文检索与实体详情、多层级关系图谱、组织体系树图、作训演训关系网络、多维度统计图表、Cesium 三维地球部署标注与卫星星历轨道、SSE 流式 AI 智能问答，以及新闻、政策、案例库等 8 大业务模块。",
      "作为前端核心开发，负责前台业务整体搭建与交付；主导知识图谱可视化体系（封装 G6 图谱组件，自研 d3、cytoscape 力导向图与树图）、Cesium 三维地球模块、AI 问答流式交互；统一 axios 请求层（无感刷新令牌）、权限控制与多环境构建体系。",
    ],
    highlights: [
      { t: "知识图谱可视化体系（核心）", d: "封装高复用 G6 图谱组件被 4 个页面复用；force2 力导向 + clustering 聚类 + preventOverlap 防重叠；自定义根节点与「流光」动画边，processParallelEdges 处理平行边重叠；右键菜单（设为中心点、过滤、展开、收起）、聚焦式高亮；节点按需增量请求、resize 防抖、多浏览器全屏兼容。" },
      { t: "自研图形引擎", d: "维护基于 d3 + cytoscape + SVG 的力导向图与双向树图，修复「切换浏览器标签页再回来时力导向布局坍缩」的经典问题（监听 visibilitychange 重新计算布局）。" },
      { t: "三维地球与空间态势", d: "Cesium 初始化 Viewer + 天地图影像与国界图层，完成装备部署点位三维标注；wgs84ToWindowCoordinates 实现三维坐标到屏幕坐标实时换算，把 Vue HTML 标签绑定到地球表面；JulianDate 插值时间轴 + camera.lookAt 实现卫星轨道相机漫游，动态绘制经纬网格与星历参数展示。" },
      { t: "统计大屏与图表沉淀", d: "沉淀 11 类 ECharts 业务图表组件 + resize mixin 统一复用；AntV G2 + DataSet + slider 实现带时间滑块的时序折线图；html2canvas + jsPDF 一键导出 PNG / JPEG / PDF / SVG / CSV；echarts-wordcloud 词云。" },
      { t: "AI 智能问答", d: "EventSource 逐字流式输出 + 停止生成 + 会话历史；解决 EventSource 无法自定义请求头问题（withCredentials + onerror 刷新 Token 重建连接）；回答关联图谱实体标签，点击跳转实体详情，实现「问答—图谱」联动。" },
    ],
    tech: ["Vue3", "TypeScript", "Element Plus", "G6", "cytoscape", "d3", "ECharts", "Cesium", "AntV G2", "EventSource (SSE)", "jsPDF", "jszip"],
    shots: [
      { type: "graph", title: "多层级关系图谱 · 右键菜单 / 聚焦高亮" },
      { type: "globe", title: "Cesium 三维地球 · 部署标注与卫星轨道" },
      { type: "dashboard", title: "多维度统计看板 · 11 类图表组件" },
      { type: "admin", title: "全文检索 · 实体详情关联图谱" },
      { type: "chat", title: "AI 智能问答 · 问答—图谱联动" },
    ],
  },
  {
    id: "medical-screen",
    name: "高值医用耗材综合价值评价平台",
    cat: ["medical", "visual"],
    accent: "#fb7185",
    period: "2025",
    role: "独立负责 5 个大屏的架构搭建与交付",
    summary: "面向省—市—院三级的医保支付改革（DRG/DIP）与高值耗材价值评价数据大屏，30+ 核心指标的可视化分析，1920 设计稿 rem 自适应纯前端数据大屏。",
    description: [
      "围绕 DRG/DIP 医保支付方式改革，构建覆盖「区域医疗数据总览、省级大屏、地市大屏、疾病术式分析评价、医用耗材价值评价」5 个大屏页面，指标包含住院总人次 / 总费用、次均费用、DRG 组数与入组率、并发症发生率、90/180 天随访结局等。",
      "基于 IPTW（逆概率加权）完成患者基线匹配，再用 GLM 广义线性回归检验术式 / 耗材组间指标的统计学差异，以「平衡前后基线表 + SMD + P 值提示」呈现，支持省 / 市 / 院 / 年份 / 病种多级联动及 TOP10 榜单。",
      "全流程 mock 驱动：自研 Vite 中间件 + Node 内存数据模型，接口契约与真实后端一一对应，可直接切换联调。",
    ],
    highlights: [
      { t: "图表组件体系化建设（MyChart 体系）", d: "统一 ECharts 按需注册并封装 MyChart 基础组件，provide/inject 注入实例；BaseBar 声明式柱状图支持 4 种形态组合控制；玫瑰占比图、仪表盘等专用图表，5 个页面 30+ 图表零重复代码。" },
      { t: "核心业务页面", d: "独立完成疾病术式分析评价页（1300+ 行逻辑），五段式布局与 20+ 指标卡片；平衡前后基线对比、SMD 均衡性判断、GLM 组间检验 P 值文案与配色渲染；单术式 / 多术式双分支布局。" },
      { t: "数据层与接口对齐", d: "梳理 20+ 指标字段语义并修正数据结构错位；自研 Vite mock 服务（configureServer 中间件 + 30+ 接口路由表），内存数据模型支持种子伪随机、三类聚合口径，支撑 20 家医院 × 20 病种数据规模。" },
      { t: "渲染性能与疑难攻坚", d: "定位 vue-echarts 8 宿主元素百分比高度断裂导致 canvas 0 高、图表空白的问题；修复 yAxis.max 强制截断大量级数据等隐患；17~19 个图表实例稳定渲染，rem 弹性布局与 ResizeObserver 自适应协同。" },
    ],
    tech: ["Vue3.5", "TypeScript", "Vite 6", "Element Plus", "Pinia", "ECharts 5", "vue-echarts 8", "echarts-gl", "echarts-liquidfill", "Vite mock 中间件", "rem 自适应"],
    shots: [
      { type: "bigscreen", title: "区域医疗数据总览大屏 · 省—市—院三级" },
      { type: "dashboard", title: "疾病术式分析评价 · 基线表 / SMD / P 值" },
      { type: "bigscreen2", title: "医用耗材价值评价大屏 · TOP10 榜单" },
      { type: "bigscreen", title: "省级 DRG/DIP 支付改革大屏" },
    ],
  },
  {
    id: "whale-car",
    name: "鲸车惠",
    sub: "微信公众号 H5 / 微信小程序",
    cat: ["mobile"],
    accent: "#f59e0b",
    period: "2020 — 2022",
    role: "独立负责项目设计与整体架构",
    summary: "加油站综合服务平台，覆盖油站查询、下单加油、车牌绑定、在线充值、优惠券营销与订单管理，并配套后台管理系统。",
    points: [
      "独立负责项目设计与整体架构，Vue2 + uni-app 搭建 H5 与小程序双端框架，完成页面实现与接口联调。",
      "Node.js 实现后台基础 CRUD 接口、对接第三方营销能力，支撑业务完整闭环。",
    ],
    tech: ["Vue2", "uni-app", "H5", "微信小程序", "Node.js"],
    shots: [
      { type: "mobile", title: "H5 / 小程序双端 · 油站与订单" },
      { type: "mobile", title: "会员中心 · 充值与优惠券" },
    ],
  },
  {
    id: "cmb-mini",
    name: "招行小程序",
    sub: "第三方平台小程序",
    cat: ["mobile"],
    accent: "#f87171",
    period: "2021",
    role: "独立负责项目设计与前端架构",
    summary: "对接招行平台的加油服务小程序，为招行用户提供充值、下单与优惠券服务。",
    points: [
      "基于 Vue + Vant 搭建小程序框架，完成业务页面实现与后端接口联调。",
      "独立完成招行第三方平台鉴权、能力对接与集成适配，保障跨平台业务正常流转。",
    ],
    tech: ["Vue", "Vant", "微信小程序", "第三方平台接入"],
    shots: [
      { type: "mobile", title: "加油服务主流程页面" },
      { type: "mobile", title: "充值与优惠券服务" },
    ],
  },
  {
    id: "distribution",
    name: "商户分销公众号平台",
    sub: "微信公众号",
    cat: ["mobile"],
    accent: "#34d399",
    period: "2021",
    role: "独立负责前端方案设计与全部页面实现",
    summary: "加油卡二级分销平台，分为 C 端用户端与 B 端分销商户端，覆盖购卡充值、加油下单、团队管理、分销收益核算与钱包账单。",
    points: [
      "独立负责前端方案设计、框架搭建与两端全部页面实现，完成前后端数据交互。",
      "重点处理分销收益核算等复杂业务逻辑，持续迭代优化。",
    ],
    tech: ["Vue", "微信公众号 H5", "微信 SDK"],
    shots: [
      { type: "mobile", title: "C 端用户端 · 购卡充值" },
      { type: "mobile", title: "B 端商户端 · 分销收益" },
    ],
  },
  {
    id: "member-center",
    name: "会员中心公众号应用",
    sub: "微信公众号",
    cat: ["mobile"],
    accent: "#60a5fa",
    period: "2020",
    role: "独立负责项目设计与前端框架搭建",
    summary: "加油会员商城类公众号应用，提供充值消费、优惠券、积分、会员认证、营销活动与投诉反馈等会员能力。",
    points: [
      "完成公众号全部业务页面实现与接口数据处理。",
      "重点集成微信 SDK 的定位、上传与分享能力，并对接第三方支付实现微信支付唤起。",
    ],
    tech: ["Vue", "微信公众号", "微信 SDK", "微信支付"],
    shots: [
      { type: "mobile", title: "会员商城 · 积分与营销活动" },
      { type: "mobile", title: "会员认证与投诉反馈" },
    ],
  },
  {
    id: "ding-approval",
    name: "财务审批",
    sub: "钉钉小程序",
    cat: ["mobile"],
    accent: "#38bdf8",
    period: "2020",
    role: "独立负责需求对接、原型设计与小程序开发",
    summary: "企业内部钉钉小程序，覆盖费用报销、采购管理、财务审批与投诉处理流程。",
    points: [
      "独立负责需求对接、原型设计与小程序前端框架搭建，完成全部页面实现与后端接口对接。",
      "基于钉钉开放接口落地文件上传存储、定位、分享等企业能力。",
    ],
    tech: ["钉钉小程序", "钉钉开放接口", "Vue"],
    shots: [
      { type: "mobile", title: "费用报销审批流" },
      { type: "mobile", title: "采购管理与投诉处理" },
    ],
  },
];

const STRENGTHS = [
  { t: "0→1 架构能力", d: "多次完成从需求调研、技术选型、框架搭建、组件封装到上线运维的完整项目实战；既能独立交付单项目，也能协同团队把控整体开发节奏。" },
  { t: "复杂项目把控", d: "主导 50+ 模块、400+ 页面的平台型项目，沉淀配置化表单、流程编排与知识图谱组件，把重复开发转化为可复用方案。" },
  { t: "AI 业务落地", d: "具备大模型问答、知识图谱、AI 摘要与翻译的完整实战，熟悉模型接入到交互呈现的全链路。" },
  { t: "可视化与三维 GIS", d: "知识图谱、统计大屏与 Cesium 三维地球项目积累，处理过千级节点图谱与复杂大数据渲染场景。" },
  { t: "业务沟通与协同", d: "可直接对接客户挖掘业务痛点，主动输出交互与体验优化方案；可读 Java/PHP 代码并与后端高效对齐接口。" },
];
