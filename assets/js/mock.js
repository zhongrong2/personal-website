/* ============================================================
   仿真项目截图生成器
   按业务形态生成风格化 SVG「截图」，作为内网项目截图的占位展示。
   若 assets/screenshots/<projectId>-<n>.webp 存在真实截图，
   main.js 会优先加载真实图片，加载失败时回退到本文件生成的仿真图。
   ============================================================ */

(function () {
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function toURI(svg) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  // ---------- 通用绘制 ----------

  function chrome(w, h, accent, addr, inner) {
    return '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="10" fill="#0b1220"/>' +
      '<rect x="0" y="0" width="' + w + '" height="34" rx="10" fill="#101a2e"/>' +
      '<rect x="0" y="24" width="' + w + '" height="10" fill="#101a2e"/>' +
      '<circle cx="18" cy="17" r="5" fill="#ff5f57"/><circle cx="34" cy="17" r="5" fill="#febc2e"/><circle cx="50" cy="17" r="5" fill="#28c840"/>' +
      '<rect x="72" y="9" width="' + (w - 90) + '" height="16" rx="8" fill="#0b1220" stroke="#1e2c47"/>' +
      '<circle cx="84" cy="17" r="3.4" fill="' + accent + '" opacity="0.9"/>' +
      '<text x="94" y="21" font-family="Consolas,monospace" font-size="9" fill="#5b6b8c">' + esc(addr) + '</text>' +
      '<g>' + inner + '</g>';
  }

  function sidebar(x, y, w, h, accent, labels, active) {
    let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#0e1729"/>';
    labels.forEach(function (t, i) {
      const yy = y + 22 + i * 26;
      const on = i === active;
      if (on) s += '<rect x="' + (x + 6) + '" y="' + (yy - 12) + '" width="' + (w - 12) + '" height="20" rx="5" fill="' + accent + '" opacity="0.14"/>';
      s += '<rect x="' + (x + 16) + '" y="' + (yy - 5) + '" width="10" height="10" rx="3" fill="' + (on ? accent : "#31415f") + '"/>' +
        '<text x="' + (x + 34) + '" y="' + (yy + 4) + '" font-size="10.5" fill="' + (on ? "#e7eefc" : "#5b6b8c") + '" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(t) + '</text>';
    });
    return s;
  }

  function lineChart(x, y, w, h, accent, rand, opt) {
    opt = opt || {};
    let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + (opt.bg || "#0e1729") + '" stroke="#1c2a45"/>';
    for (let i = 1; i < 4; i++) {
      const gy = y + (h * i) / 4;
      s += '<line x1="' + (x + 10) + '" y1="' + gy + '" x2="' + (x + w - 10) + '" y2="' + gy + '" stroke="#1c2a45" stroke-dasharray="3 4"/>';
    }
    const n = opt.n || 9;
    let pts = [];
    for (let i = 0; i < n; i++) {
      const px = x + 12 + (i * (w - 24)) / (n - 1);
      const py = y + h - 14 - rand() * (h - 34);
      pts.push([px, py]);
    }
    const pl = pts.map(function (p) { return p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(" ");
    s += '<polyline points="' + pl + '" fill="none" stroke="' + accent + '" stroke-width="2.2" stroke-linejoin="round"/>';
    if (opt.area !== false) {
      s += '<polygon points="' + (x + 12) + "," + (y + h - 14) + " " + pl + " " + (x + w - 12) + "," + (y + h - 14) + '" fill="' + accent + '" opacity="0.10"/>';
    }
    pts.forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="' + accent + '"/>'; });
    if (opt.title) s += '<text x="' + (x + 14) + '" y="' + (y + 18) + '" font-size="11" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(opt.title) + '</text>';
    return s;
  }

  function barChart(x, y, w, h, accent, rand, opt) {
    opt = opt || {};
    let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + (opt.bg || "#0e1729") + '" stroke="#1c2a45"/>';
    const n = opt.n || 7, bw = (w - 24) / n;
    const colors = opt.colors || [accent];
    for (let i = 0; i < n; i++) {
      const bh = 12 + rand() * (h - 34);
      const c = colors[i % colors.length];
      s += '<rect x="' + (x + 12 + i * bw + bw * 0.18) + '" y="' + (y + h - 14 - bh) + '" width="' + (bw * 0.64) + '" height="' + bh + '" rx="3" fill="' + c + '" opacity="' + (0.55 + rand() * 0.45).toFixed(2) + '"/>';
    }
    if (opt.title) s += '<text x="' + (x + 14) + '" y="' + (y + 18) + '" font-size="11" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(opt.title) + '</text>';
    return s;
  }

  function donut(x, y, r, accent, rand, label) {
    const C = 2 * Math.PI * r;
    let segs = "", acc = 0;
    const palette = [accent, "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"];
    for (let i = 0; i < 5; i++) {
      const frac = 0.12 + rand() * 0.18;
      segs += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="none" stroke="' + palette[i % palette.length] + '" stroke-width="10" stroke-dasharray="' + (C * frac).toFixed(1) + " " + C.toFixed(1) + '" stroke-dashoffset="' + (-C * acc).toFixed(1) + '" transform="rotate(-90 ' + x + " " + y + ')"/>';
      acc += frac;
    }
    segs += '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="13" fill="#e7eefc" font-family="Consolas,monospace">' + esc(label || "64%") + '</text>';
    return segs;
  }

  function statCards(x, y, w, accent, labels, rand) {
    const n = labels.length, gap = 12, cw = (w - gap * (n - 1)) / n;
    let s = "";
    labels.forEach(function (t, i) {
      const cx = x + i * (cw + gap);
      s += '<rect x="' + cx + '" y="' + y + '" width="' + cw + '" height="56" rx="8" fill="#0e1729" stroke="#1c2a45"/>' +
        '<rect x="' + cx + '" y="' + y + '" width="3" height="56" rx="1.5" fill="' + accent + '" opacity="0.8"/>' +
        '<text x="' + (cx + 12) + '" y="' + (y + 20) + '" font-size="9.5" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(t) + '</text>' +
        '<text x="' + (cx + 12) + '" y="' + (y + 42) + '" font-size="18" font-weight="bold" fill="#e7eefc" font-family="Consolas,monospace">' + (100 + Math.floor(rand() * 8900)).toLocaleString() + '</text>';
    });
    return s;
  }

  function tableRows(x, y, w, rows, accent, rand) {
    let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (rows * 26 + 30) + '" rx="8" fill="#0e1729" stroke="#1c2a45"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="26" rx="8" fill="#12203a"/>';
    const cols = 4;
    for (let c = 0; c < cols; c++) {
      s += '<rect x="' + (x + 14 + c * (w - 28) / cols) + '" y="' + (y + 10) + '" width="' + ((w - 28) / cols - 12) + '" height="7" rx="3.5" fill="#3d5078"/>';
    }
    for (let r = 0; r < rows; r++) {
      const yy = y + 30 + r * 26;
      for (let c = 0; c < cols; c++) {
        const cw = (w - 28) / cols - 12;
        if (c === cols - 1 && r % 2 === 0) {
          s += '<rect x="' + (x + 14 + c * (w - 28) / cols) + '" y="' + (yy - 3) + '" width="34" height="12" rx="6" fill="' + accent + '" opacity="0.25"/>' +
            '<rect x="' + (x + 14 + c * (w - 28) / cols + 40) + '" y="' + (yy - 3) + '" width="34" height="12" rx="6" fill="#22c55e" opacity="0.25"/>';
        } else {
          s += '<rect x="' + (x + 14 + c * (w - 28) / cols) + '" y="' + yy + '" width="' + (cw * (0.45 + rand() * 0.5)) + '" height="7" rx="3.5" fill="#26375c"/>';
        }
      }
      if (r < rows - 1) s += '<line x1="' + (x + 10) + '" y1="' + (yy + 13) + '" x2="' + (x + w - 10) + '" y2="' + (yy + 13) + '" stroke="#14213a"/>';
    }
    return s;
  }

  function hudCorners(x, y, w, h, accent) {
    const L = 16;
    let s = "";
    [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach(function (c) {
      s += '<path d="M' + c[0] + " " + (c[1] + c[3] * L) + " L" + c[0] + " " + c[1] + " L" + (c[0] + c[2] * L) + " " + c[1] + '" fill="none" stroke="' + accent + '" stroke-width="2" opacity="0.85"/>';
    });
    return s;
  }

  // ---------- 各业务形态 ----------

  function shotAdmin(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    let inner = sidebar(0, 34, 128, H - 34, accent, ["工作台", "项目管理", "过程模板", "动态表单", "流程编排", "专家评审", "统计报表"], 1) +
      statCards(142, 50, 404, accent, ["申报总数", "进行中", "已认定", "待审核"], rand) +
      lineChart(142, 118, 240, 110, accent, rand, { title: "申报趋势" }) +
      donut(455, 172, 34, accent, rand, "72%") +
      tableRows(142, 238, 404, 4, accent, rand);
    return chrome(W, H, accent, "admin.system.example.cn", inner);
  }

  function shotDashboard(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    let inner = statCards(16, 48, 528, accent, ["访问总量", "知识条目", "今日检索", "活跃用户"], rand) +
      lineChart(16, 118, 268, 122, accent, rand, { title: "知识使用趋势", n: 11 }) +
      barChart(296, 118, 248, 122, accent, rand, { title: "模块访问分布", colors: [accent, "#3b82f6", "#8b5cf6"] }) +
      tableRows(16, 252, 528, 3, accent, rand);
    return chrome(W, H, accent, "portal.system.example.cn", inner);
  }

  function shotChat(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    let inner = sidebar(0, 34, 132, H - 34, accent, ["新会话", "装备知识问答", "报告摘要生成", "术语翻译", "图谱分析"], 1) +
      '<rect x="146" y="46" width="400" height="290" rx="10" fill="#0e1729" stroke="#1c2a45"/>' +
      '<rect x="162" y="62" width="60" height="60" rx="30" fill="#13233f"/>' +
      '<circle cx="192" cy="82" r="9" fill="none" stroke="' + accent + '" stroke-width="2"/>' +
      '<circle cx="192" cy="82" r="3.5" fill="' + accent + '"/>' +
      '<rect x="162" y="132" width="330" height="52" rx="8" fill="#12203a"/>' +
      '<text x="176" y="152" font-size="11" fill="#c9d6ee" font-family="PingFang SC,Microsoft YaHei,sans-serif">请分析该型装备的技术演进路线，</text>' +
      '<text x="176" y="170" font-size="11" fill="#c9d6ee" font-family="PingFang SC,Microsoft YaHei,sans-serif">并给出关键里程碑事件。</text>' +
      '<rect x="176" y="200" width="356" height="86" rx="8" fill="' + accent + '" opacity="0.10"/>' +
      '<rect x="176" y="200" width="3" height="86" rx="1.5" fill="' + accent + '"/>' +
      '<text x="192" y="222" font-size="11" fill="#e7eefc" font-family="PingFang SC,Microsoft YaHei,sans-serif">根据知识库检索结果，该装备演进分为三</text>' +
      '<text x="192" y="240" font-size="11" fill="#e7eefc" font-family="PingFang SC,Microsoft YaHei,sans-serif">个阶段：早期试验、批量列装、体系融合，</text>' +
      '<text x="192" y="258" font-size="11" fill="#e7eefc" font-family="PingFang SC,Microsoft YaHei,sans-serif">其中引用来源 [1][3] 显示……</text>' +
      '<rect x="192" y="266" width="4" height="12" fill="' + accent + '"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></rect>' +
      '<rect x="176" y="296" width="120" height="26" rx="6" fill="#13233f" stroke="#1e2c47"/>' +
      '<text x="188" y="313" font-size="9.5" fill="' + accent + '" font-family="PingFang SC,Microsoft YaHei,sans-serif">RAG 引用 · 来源 1/3</text>' +
      '<rect x="404" y="316" width="128" height="14" rx="7" fill="#12203a" stroke="#1e2c47"/>' +
      '<text x="414" y="327" font-size="8.5" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">输入你的问题…</text>';
    return chrome(W, H, accent, "ai-portal.example.cn/chat", inner);
  }

  function shotGraph(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    const cx = 300, cy = 200;
    let inner = '<rect x="0" y="34" width="' + W + '" height="' + (H - 34) + '" fill="#070d18"/>' +
      '<g opacity="0.15">' + (function () {
        let g = "";
        for (let i = 0; i < 12; i++) g += '<line x1="' + (i * 50) + '" y1="34" x2="' + (i * 50) + '" y2="' + H + '" stroke="#1c2a45"/>';
        for (let j = 0; j < 8; j++) g += '<line x1="0" y1="' + (34 + j * 44) + '" x2="' + W + '" y2="' + (34 + j * 44) + '" stroke="#1c2a45"/>';
        return g;
      })() + '</g>';
    const nodes = [];
    for (let i = 0; i < 14; i++) {
      const ang = rand() * Math.PI * 2, dist = 60 + rand() * 130;
      nodes.push([cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist * 0.72, 5 + rand() * 9]);
    }
    nodes.forEach(function (n) {
      inner += '<line x1="' + cx + '" y1="' + cy + '" x2="' + n[0] + '" y2="' + n[1] + '" stroke="' + accent + '" opacity="0.25"/>';
      if (rand() > 0.6) {
        const o = nodes[Math.floor(rand() * nodes.length)];
        inner += '<line x1="' + n[0] + '" y1="' + n[1] + '" x2="' + o[0] + '" y2="' + o[1] + '" stroke="#3d5078" opacity="0.4" stroke-dasharray="4 4"/>';
      }
    });
    nodes.forEach(function (n, i) {
      inner += '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + n[2] + '" fill="' + (i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : accent) + '" opacity="0.9"/>';
    });
    inner += '<circle cx="' + cx + '" cy="' + cy + '" r="26" fill="' + accent + '" opacity="0.18"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="18" fill="' + accent + '" opacity="0.35"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="' + accent + '"/>' +
      '<text x="' + cx + '" y="' + (cy + 46) + '" text-anchor="middle" font-size="12" fill="#e7eefc" font-family="PingFang SC,Microsoft YaHei,sans-serif">核心实体</text>' +
      hudCorners(12, 46, W - 24, H - 58, accent) +
      '<rect x="' + (W - 108) + '" y="46" width="92" height="120" rx="8" fill="#0e1729" opacity="0.9" stroke="#1c2a45"/>' +
      '<text x="' + (W - 96) + '" y="66" font-size="9.5" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">图例</text>';
    ["装备", "机构", "人物", "事件", "政策"].forEach(function (t, i) {
      inner += '<circle cx="' + (W - 94) + '" cy="' + (82 + i * 16) + '" r="4" fill="' + [accent, "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"][i] + '"/>' +
        '<text x="' + (W - 84) + '" y="' + (86 + i * 16) + '" font-size="9.5" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(t) + '</text>';
    });
    return chrome(W, H, accent, "graph.example.cn/analysis", inner);
  }

  function shotGlobe(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    const cx = 280, cy = 210, R = 118;
    let inner = '<rect x="0" y="34" width="' + W + '" height="' + (H - 34) + '" fill="#050a14"/>';
    inner += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="210" ry="58" fill="none" stroke="' + accent + '" stroke-width="1.2" opacity="0.5" transform="rotate(-16 ' + cx + " " + cy + ')"/>';
    inner += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="#0a1a33" stroke="#1e3a5f" stroke-width="1.5"/>';
    [-90, -60, -30, 0, 30, 60, 90].forEach(function (dx) {
      const rx = R * Math.abs(Math.cos(dx * Math.PI / 180));
      inner += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx.toFixed(1) + '" ry="' + R + '" fill="none" stroke="#16305a" opacity="0.8"/>';
    });
    [-60, -30, 0, 30, 60].forEach(function (dy) {
      const yy = cy + dy * 1.6;
      inner += '<ellipse cx="' + cx + '" cy="' + yy + '" rx="' + (R * Math.cos(Math.asin(dy * 1.6 / R))).toFixed(1) + '" ry="14" fill="none" stroke="#16305a" opacity="0.7"/>';
    });
    for (let i = 0; i < 9; i++) {
      const ang = rand() * Math.PI * 2, d = rand() * R * 0.85;
      const px = cx + Math.cos(ang) * d, py = cy + Math.sin(ang) * d * 0.9;
      inner += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="3.2" fill="' + accent + '"/>' +
        '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="7" fill="' + accent + '" opacity="0.25"><animate attributeName="r" values="4;9;4" dur="' + (1.6 + i * 0.2).toFixed(1) + 's" repeatCount="indefinite"/></circle>';
    }
    const sat = cx + 165, saty = cy - 62;
    inner += '<circle cx="' + sat + '" cy="' + saty + '" r="4.5" fill="#fbbf24"/>' +
      '<rect x="' + (sat - 13) + '" y="' + (saty - 3) + '" width="8" height="6" fill="#fbbf24" opacity="0.8"/>' +
      '<rect x="' + (sat + 6) + '" y="' + (saty - 3) + '" width="8" height="6" fill="#fbbf24" opacity="0.8"/>' +
      hudCorners(12, 46, W - 24, H - 58, accent) +
      '<rect x="20" y="52" width="150" height="108" rx="8" fill="#0e1729" opacity="0.85" stroke="#1c2a45"/>' +
      '<text x="34" y="74" font-size="10.5" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">卫星轨道参数</text>' +
      '<text x="34" y="96" font-size="9.5" fill="#5b6b8c" font-family="Consolas,monospace">ALT  512.4 km</text>' +
      '<text x="34" y="114" font-size="9.5" fill="#5b6b8c" font-family="Consolas,monospace">INC  97.6 deg</text>' +
      '<text x="34" y="132" font-size="9.5" fill="#5b6b8c" font-family="Consolas,monospace">TLE  1 25544U …</text>' +
      '<rect x="24" y="146" width="90" height="10" rx="5" fill="' + accent + '" opacity="0.3"/>';
    return chrome(W, H, accent, "gis.example.cn/cesium", inner);
  }

  function shotAnnotate(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    let inner = '<rect x="0" y="34" width="150" height="' + (H - 34) + '" fill="#0e1729"/>' +
      '<text x="16" y="60" font-size="10.5" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">标签体系</text>';
    ["武器装备", "军事机构", "关键人物", "军事事件", "政策文件"].forEach(function (t, i) {
      inner += '<rect x="12" y="' + (72 + i * 30) + '" width="126" height="20" rx="6" fill="#12203a" stroke="#1c2a45"/>' +
        '<circle cx="24" cy="' + (82 + i * 30) + '" r="4" fill="' + [accent, "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"][i] + '"/>' +
        '<text x="34" y="' + (86 + i * 30) + '" font-size="9.5" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(t) + '</text>';
    });
    inner += '<rect x="164" y="46" width="382" height="180" rx="10" fill="#0e1729" stroke="#1c2a45"/>' +
      '<text x="182" y="76" font-size="11" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">标注文本 · doc_0427.txt</text>';
    // 模拟划词高亮
    const spans = [[182, 96, 96, accent], [296, 96, 62, "#3b82f6"], [182, 120, 70, "#f59e0b"], [356, 120, 92, "#8b5cf6"], [182, 144, 110, "#10b981"], [318, 168, 88, accent], [182, 192, 60, "#8b5cf6"]];
    spans.forEach(function (sp) {
      inner += '<rect x="' + sp[0] + '" y="' + sp[1] + '" width="' + sp[2] + '" height="14" rx="4" fill="' + sp[3] + '" opacity="0.28"/>' +
        '<rect x="' + (sp[0] + 6) + '" y="' + (sp[1] + 3) + '" width="' + (sp[2] - 12) + '" height="6" rx="3" fill="#26375c"/>';
    });
    inner += '<line x1="240" y1="103" x2="416" y2="127" stroke="' + accent + '" stroke-width="1.5" opacity="0.7"/>' +
      '<line x1="448" y1="134" x2="266" y2="151" stroke="#8b5cf6" stroke-width="1.5" opacity="0.7" stroke-dasharray="5 4"/>' +
      '<rect x="164" y="238" width="382" height="98" rx="10" fill="#0e1729" stroke="#1c2a45"/>' +
      '<text x="182" y="262" font-size="10.5" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">实体关系 · 已标注 12 / 自动预标 5</text>';
    const rel = [["装备 — 隶属 — 机构", accent], ["人物 — 参与 — 事件", "#3b82f6"], ["事件 — 依据 — 政策", "#8b5cf6"]];
    rel.forEach(function (r, i) {
      inner += '<rect x="182" y="' + (276 + i * 20) + '" width="348" height="15" rx="5" fill="#12203a"/>' +
        '<circle cx="196" cy="' + (283 + i * 20) + '" r="3.5" fill="' + r[1] + '"/>' +
        '<text x="208" y="' + (288 + i * 20) + '" font-size="9" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(r[0]) + '</text>';
    });
    return chrome(W, H, accent, "annotate.system.example.cn", inner);
  }

  function shotFlow(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    let inner = '<rect x="0" y="34" width="' + W + '" height="28" fill="#0e1729"/>' +
      '<rect x="12" y="40" width="58" height="16" rx="5" fill="' + accent + '" opacity="0.2"/>' +
      '<text x="22" y="52" font-size="9" fill="#c9d6ee" font-family="PingFang SC,Microsoft YaHei,sans-serif">开始</text>' +
      '<rect x="78" y="40" width="58" height="16" rx="5" fill="#12203a" stroke="#1c2a45"/><text x="88" y="52" font-size="9" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">网关</text>' +
      '<rect x="144" y="40" width="58" height="16" rx="5" fill="#12203a" stroke="#1c2a45"/><text x="154" y="52" font-size="9" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">用户任务</text>' +
      '<rect x="210" y="40" width="58" height="16" rx="5" fill="#12203a" stroke="#1c2a45"/><text x="220" y="52" font-size="9" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">服务任务</text>' +
      '<rect x="0" y="62" width="' + W + '" height="' + (H - 62) + '" fill="#070d18"/>' +
      '<g opacity="0.12">' + (function () { let g = ""; for (let i = 0; i < 14; i++) g += '<line x1="' + (i * 42) + '" y1="62" x2="' + (i * 42) + '" y2="' + H + '" stroke="#1c2a45"/>'; for (let j = 0; j < 10; j++) g += '<line x1="0" y1="' + (62 + j * 32) + '" x2="' + W + '" y2="' + (62 + j * 32) + '" stroke="#1c2a45"/>'; return g; })() + '</g>';
    const nodes = [
      [60, 130, "里程碑 M1", "start"], [210, 96, "申报提交", "task"], [210, 176, "形式审查", "task"],
      [370, 130, "并行网关", "gateway"], [480, 96, "专家评审", "task"], [480, 176, "AI 抽取", "task"],
      [300, 268, "归档发布", "end"]
    ];
    const pos = {};
    nodes.forEach(function (n) { pos[n[0] + "_" + n[1]] = n; });
    function nodeShape(x, y, label, kind) {
      const w = 92, h = 40, x0 = x - w / 2, y0 = y - h / 2;
      let c = "#12203a", st = "#1e2c47", tc = "#c9d6ee";
      if (kind === "start") { c = accent; st = accent; c2 = accent; }
      if (kind === "gateway") { st = "#f59e0b"; }
      if (kind === "task") { st = "#2b3d63"; }
      if (kind === "end") { st = "#22c55e"; }
      if (kind === "start") {
        return '<circle cx="' + x + '" cy="' + y + '" r="22" fill="' + accent + '" opacity="0.18"/><circle cx="' + x + '" cy="' + y + '" r="15" fill="' + accent + '" opacity="0.4"/><text x="' + x + '" y="' + (y + 40) + '" text-anchor="middle" font-size="10" fill="#c9d6ee" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(label) + '</text>';
      }
      const rx = kind === "gateway" ? 6 : 8;
      let s = '<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="' + c + '" stroke="' + st + '" stroke-width="1.5"/>';
      if (kind === "gateway") s += '<path d="M' + (x - 7) + " " + y + " L" + x + " " + (y - 7) + " L" + (x + 7) + " " + y + " L" + x + " " + (y + 7) + ' Z" fill="none" stroke="#fbbf24"/>';
      s += '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="10.5" fill="' + tc + '" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(label) + '</text>';
      return s;
    }
    const edges = [[60, 130, 210, 96], [60, 130, 210, 176], [210, 96, 370, 130], [210, 176, 370, 130], [370, 130, 480, 96], [370, 130, 480, 176], [480, 96, 300, 268], [480, 176, 300, 268]];
    edges.forEach(function (e) {
      const mx = (e[0] + e[2]) / 2, my = (e[1] + e[3]) / 2;
      inner += '<path d="M' + e[0] + " " + e[1] + " C" + mx + " " + e[1] + " " + mx + " " + e[3] + " " + e[2] + " " + e[3] + '" fill="none" stroke="#3d5078" stroke-width="1.6"/>' +
        '<circle r="3" fill="' + accent + '"><animateMotion dur="' + (1.8 + rand()).toFixed(1) + 's" repeatCount="indefinite" path="M' + e[0] + " " + e[1] + " C" + mx + " " + e[1] + " " + mx + " " + e[3] + " " + e[2] + " " + e[3] + '"/></circle>';
    });
    nodes.forEach(function (n) { inner += nodeShape(n[0], n[1], n[2], n[3]); });
    inner += '<rect x="12" y="' + (H - 40) + '" width="140" height="24" rx="6" fill="#0e1729" stroke="#1c2a45"/>' +
      '<text x="24" y="' + (H - 23) + '" font-size="9" fill="#8fa3c8" font-family="PingFang SC,Microsoft YaHei,sans-serif">MiniMap · 流程预览</text>';
    return chrome(W, H, accent, "flow.example.cn/designer", inner);
  }

  function shotBigscreen(accent, seed, variant) {
    const W = 560, H = 360, rand = mulberry32(seed);
    const ac2 = variant === 2 ? "#fbbf24" : accent;
    let inner = '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="10" fill="#070d1f"/>' +
      '<rect x="0" y="0" width="' + W + '" height="40" fill="#0a1330"/>' +
      '<path d="M0 40 L120 40 L150 30 L410 30 L440 40 L560 40" fill="#0a1330"/>' +
      '<text x="280" y="24" text-anchor="middle" font-size="14" fill="#e7eefc" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(variant === 2 ? "医用耗材价值评价大屏" : "区域医疗数据总览") + '</text>' +
      hudCorners(8, 8, W - 16, 38, ac2);
    inner += statCards(16, 52, 528, ac2, variant === 2 ? ["耗材品类", "评价批次", "入组率", "次均费用"] : ["住院总人次", "住院总费用", "DRG 组数", "入组率"], rand);
    inner += '<rect x="16" y="120" width="160" height="150" rx="8" fill="#0e1729" stroke="#1c2a45"/>' + donut(96, 190, 40, ac2, rand, variant === 2 ? "63%" : "58%") +
      '<text x="96" y="256" text-anchor="middle" font-size="9.5" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">DRG 入组构成</text>' +
      barChart(188, 120, 176, 150, ac2, rand, { title: "TOP10 榜单", n: 8 }) +
      lineChart(376, 120, 168, 150, ac2, rand, { title: "费用趋势", n: 8 });
    // 中心地图意象
    let map = '<rect x="16" y="282" width="528" height="64" rx="8" fill="#0e1729" stroke="#1c2a45"/>';
    for (let i = 0; i < 10; i++) {
      const px = 36 + i * 52, py = 300 + rand() * 26;
      map += '<circle cx="' + px + '" cy="' + py + '" r="3" fill="' + ac2 + '"/>' +
        '<circle cx="' + px + '" cy="' + py + '" r="7" fill="' + ac2 + '" opacity="0.22"><animate attributeName="r" values="4;10;4" dur="' + (1.4 + i * 0.15).toFixed(1) + 's" repeatCount="indefinite"/></circle>';
    }
    map += '<text x="36" y="338" font-size="9" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">省 — 市 — 院 三级联动 · GeoJSON 区域地图</text>';
    inner += map;
    return inner;
  }

  function shotMobile(accent, seed) {
    const W = 560, H = 360, rand = mulberry32(seed);
    function phone(px, variant) {
      const pw = 120, ph = 244, x0 = px, y0 = 58;
      let s = '<rect x="' + x0 + '" y="' + y0 + '" width="' + pw + '" height="' + ph + '" rx="16" fill="#0b1220" stroke="#22314f" stroke-width="2"/>' +
        '<rect x="' + (x0 + 44) + '" y="' + (y0 + 6) + '" width="32" height="8" rx="4" fill="#16223c"/>' +
        '<rect x="' + (x0 + 6) + '" y="' + (y0 + 20) + '" width="' + (pw - 12) + '" height="40" rx="8" fill="' + accent + '" opacity="0.9"/>' +
        '<text x="' + (x0 + 16) + '" y="' + (y0 + 44) + '" font-size="10" fill="#0b1220" font-weight="bold" font-family="PingFang SC,Microsoft YaHei,sans-serif">' + esc(variant === 0 ? "首页 · 油站" : variant === 1 ? "订单服务" : "会员中心") + '</text>';
      // 列表卡片
      for (let i = 0; i < 4; i++) {
        const yy = y0 + 70 + i * 40;
        s += '<rect x="' + (x0 + 6) + '" y="' + yy + '" width="' + (pw - 12) + '" height="32" rx="6" fill="#12203a"/>' +
          '<rect x="' + (x0 + 12) + '" y="' + (yy + 6) + '" width="20" height="20" rx="5" fill="' + accent + '" opacity="' + (0.5 - i * 0.08).toFixed(2) + '"/>' +
          '<rect x="' + (x0 + 38) + '" y="' + (yy + 8) + '" width="' + (pw - 58) + '" height="6" rx="3" fill="#3d5078"/>' +
          '<rect x="' + (x0 + 38) + '" y="' + (yy + 18) + '" width="' + ((pw - 58) * 0.6) + '" height="6" rx="3" fill="#26375c"/>';
      }
      s += '<rect x="' + (x0 + 20) + '" y="' + (y0 + ph - 30) + '" width="' + (pw - 40) + '" height="18" rx="9" fill="#0e1729" stroke="#1e2c47"/>' +
        '<circle cx="' + (x0 + 36) + '" cy="' + (y0 + ph - 21) + '" r="2.5" fill="' + accent + '"/>' +
        '<circle cx="' + (x0 + 58) + '" cy="' + (y0 + ph - 21) + '" r="2.5" fill="#31415f"/>' +
        '<circle cx="' + (x0 + 80) + '" cy="' + (y0 + ph - 21) + '" r="2.5" fill="#31415f"/>';
      return s;
    }
    let inner = '<rect x="0" y="34" width="' + W + '" height="' + (H - 34) + '" fill="#070d18"/>' +
      phone(100, 0) + phone(240, 1) + phone(380, 2) +
      '<text x="280" y="330" text-anchor="middle" font-size="10.5" fill="#5b6b8c" font-family="PingFang SC,Microsoft YaHei,sans-serif">H5 / 微信小程序 / uni-app 多端适配</text>';
    return chrome(W, H, accent, "h5.example.cn", inner);
  }

  // ---------- 对外接口 ----------

  const GENERATORS = {
    admin: function (a, s) { return shotAdmin(a, s); },
    dashboard: function (a, s) { return shotDashboard(a, s); },
    chat: function (a, s) { return shotChat(a, s); },
    graph: function (a, s) { return shotGraph(a, s); },
    globe: function (a, s) { return shotGlobe(a, s); },
    annotate: function (a, s) { return shotAnnotate(a, s); },
    flow: function (a, s) { return shotFlow(a, s); },
    bigscreen: function (a, s) { return shotBigscreen(a, s, 1); },
    bigscreen2: function (a, s) { return shotBigscreen(a, s, 2); },
    mobile: function (a, s) { return shotMobile(a, s); },
  };

  window.MockShot = {
    /**
     * 生成某项目某张仿真截图的 data URI
     * @param {object} project 项目对象
     * @param {number} index 截图序号（从 0 开始）
     */
    get: function (project, index) {
      const shot = project.shots[index];
      const gen = GENERATORS[shot.type] || GENERATORS.dashboard;
      const seed = 1000 * project.id.length + index * 97 + shot.type.length * 31;
      return toURI('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 360">' + gen(project.accent, seed) + "</svg>");
    },
  };
})();
