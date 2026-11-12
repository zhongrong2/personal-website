/* ============================================================
   页面渲染与交互
   ============================================================ */

(function () {
  const $ = function (sel, el) { return (el || document).querySelector(sel); };
  const $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };

  /* ---------- 通用 ---------- */

  function svgIcon(path) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="' + path + '"/></svg>';
  }

  function shotImg(project, index, cls) {
    // 一律先加载 600 宽缩略图（卡片封面与弹窗网格共用）：<id>-<n>-thumb.webp
    // 缺失回退完整图（data-full），再回退仿真图；完整图只在灯箱里按需加载
    const full = "assets/screenshots/" + project.id + "-" + (index + 1) + ".webp";
    const thumb = "assets/screenshots/" + project.id + "-" + (index + 1) + "-thumb.webp";
    const mock = MockShot.get(project, index);
    return '<img class="' + (cls || "") + '" loading="lazy" decoding="async" alt="' + project.name + '" src="' + thumb + '" data-full="' + full + '" data-mock="' + mock + '" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src=this.dataset.full;}else{this.onerror=null;this.src=this.dataset.mock;}"/>';
  }

  /* ---------- 导航 ---------- */

  function renderNav() {
    const links = [
      ["hero", "首页"], ["projects", "项目作品"], ["about", "关于我"],
      ["skills", "专业技能"], ["exp", "工作经历"], ["contact", "联系我"],
    ];
    $("#navLinks").innerHTML = links.map(function (l) {
      return '<a href="#' + l[0] + '" data-target="' + l[0] + '">' + l[1] + "</a>";
    }).join("");
    const burger = $("#navBurger"), nav = $("#navLinks");
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
      burger.classList.toggle("active");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.classList.remove("active");
      });
    });
    // 滚动高亮
    const secs = links.map(function (l) { return document.getElementById(l[0]); });
    window.addEventListener("scroll", function () {
      $("#nav").classList.toggle("scrolled", window.scrollY > 24);
      let cur = links[0][0];
      secs.forEach(function (s) { if (s && window.scrollY >= s.offsetTop - 140) cur = s.id; });
      $$("a", nav).forEach(function (a) { a.classList.toggle("active", a.dataset.target === cur); });
    }, { passive: true });
  }

  /* ---------- Hero ---------- */

  function renderHero() {
    $("#heroName").textContent = PROFILE.name;
    $("#heroTitle").innerHTML = '<span class="grad-text">' + PROFILE.title + '</span>';
    $("#heroIntro").textContent = PROFILE.intro.split("；").slice(0, 2).join("；") + "。";
    $("#heroMeta").innerHTML =
      '<span class="meta-chip">' + svgIcon("M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z") + PROFILE.school + " · " + PROFILE.major + "</span>" +
      '<span class="meta-chip">' + svgIcon("M22 6L12 13 2 6M2 6h20v12H2z") + PROFILE.email + "</span>" +
      '<span class="meta-chip">' + svgIcon("M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z") + PROFILE.phone + "</span>" +
      '<span class="meta-chip green">' + svgIcon("M20 6L9 17l-5-5") + "求职意向：" + PROFILE.title + " · " + PROFILE.status + "</span>";
    $("#heroStats").innerHTML = HERO_STATS.map(function (s) {
      return '<div class="stat"><div class="stat-num grad-text">' + s.num + '</div><div class="stat-label">' + s.label + "</div></div>";
    }).join("");
    $("#heroCta").innerHTML =
      '<a class="btn btn-primary" href="#projects">查看项目作品 ' + svgIcon("M5 12h14M12 5l7 7-7 7") + "</a>" +
      '<a class="btn btn-ghost" href="#contact">联系我</a>';
  }

  /* ---------- 关于我 / 个人优势 ---------- */

  function renderAbout() {
    $("#aboutIntro").textContent = PROFILE.intro;
    $("#strengths").innerHTML = STRENGTHS.map(function (s) {
      return '<div class="strength-card reveal"><div class="strength-icon">' + svgIcon("M20 6L9 17l-5-5") + '</div><div><h4>' + s.t + "</h4><p>" + s.d + "</p></div></div>";
    }).join("");
  }

  /* ---------- 专业技能 ---------- */

  function renderSkills() {
    $("#skillGrid").innerHTML = SKILL_GROUPS.map(function (g) {
      return '<div class="skill-card reveal">' +
        '<div class="skill-head"><span class="skill-icon">' + svgIcon(g.icon) + "</span><h3>" + g.name + "</h3></div>" +
        '<p class="skill-desc">' + g.desc + "</p>" +
        '<div class="skill-tags">' + g.items.map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("") + "</div>" +
        "</div>";
    }).join("");
  }

  /* ---------- 工作经历 ---------- */

  function renderExperience() {
    $("#timeline").innerHTML = EXPERIENCE.map(function (e) {
      return '<div class="tl-item reveal">' +
        '<div class="tl-dot"></div>' +
        '<div class="tl-card">' +
        '<div class="tl-head"><div><h3>' + e.company + '</h3><span class="tl-role">' + e.role + "</span></div>" +
        '<span class="tl-period">' + e.period + "</span></div>" +
        '<ul class="tl-points">' + e.points.map(function (p) {
          return "<li><strong>" + p.t + "</strong>" + p.d + "</li>";
        }).join("") + "</ul>" +
        "</div></div>";
    }).join("");
  }

  /* ---------- 项目经验 ---------- */

  function renderProjectFilters() {
    $("#projectFilters").innerHTML = CATEGORIES.map(function (c, i) {
      return '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-cat="' + c.key + '">' + c.name + "</button>";
    }).join("");
  }

  function projectCard(p) {
    const isMini = p.cat.indexOf("mobile") >= 0 && !p.highlights;
    const hasShots = p.shots && p.shots.length > 0;
    const tags = hasShots
      ? p.shots.map(function (s) { return '<span class="tag">' + s.title.split(" · ")[0] + "</span>"; }).join("")
      : p.tech.slice(0, 4).map(function (t) { return '<span class="tag">' + t + "</span>"; }).join("");
    return '<article class="project-card reveal" data-id="' + p.id + '" data-cat="' + p.cat.join(" ") + '" style="--accent:' + p.accent + '">' +
      (hasShots
        ? '<div class="pc-shot">' + shotImg(p, 0, "pc-img") +
          '<div class="pc-overlay"><span class="pc-view">查看详情 →</span></div>' +
          '<span class="pc-badge">' + (isMini ? (p.sub || "多端项目") : (p.role || "")) + "</span></div>"
        : "") +
      '<div class="pc-body">' +
      "<h3>" + p.name + "</h3>" +
      (p.sub ? '<div class="pc-sub">' + p.sub + " · " + p.period + "</div>" : '<div class="pc-sub">' + p.period + "</div>") +
      '<p class="pc-summary">' + (p.summary || "") + "</p>" +
      '<div class="pc-tags">' + tags + "</div>" +
      '<div class="pc-foot">' + (hasShots ? '<span class="pc-count">' + p.shots.length + " 张重点页面截图</span>" : "") +
      '<span class="pc-more">查看详情 →</span></div>' +
      "</div></article>";
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    grid.innerHTML = PROJECTS.map(projectCard).join("");
    $$("#projectFilters .filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$("#projectFilters .filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        const cat = btn.dataset.cat;
        $$(".project-card", grid).forEach(function (card) {
          const show = cat === "all" || card.dataset.cat.split(" ").indexOf(cat) >= 0;
          card.classList.toggle("hidden", !show);
          if (show) {
            card.style.animation = "none";
            void card.offsetWidth;
            card.style.animation = "cardIn .45s ease both";
          }
        });
      });
    });
    grid.addEventListener("click", function (ev) {
      const card = ev.target.closest(".project-card");
      if (card) openProject(card.dataset.id);
    });
  }

  /* ---------- 项目详情弹窗 ---------- */

  let lastFocus = null;

  function openProject(id) {
    const p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    lastFocus = document.activeElement;
    const isMini = !p.highlights;

    let body = "";
    if (isMini) {
      body = '<div class="modal-sec"><h4>项目描述</h4><p>' + p.summary + "</p></div>" +
        '<div class="modal-sec"><h4>工作内容</h4><ul class="modal-list">' + p.points.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul></div>";
    } else {
      body = '<div class="modal-sec"><h4>项目描述</h4>' + p.description.map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</div>" +
        '<div class="modal-sec"><h4>核心工作 · 技术攻坚</h4><div class="hl-grid">' +
        p.highlights.map(function (h) {
          return '<div class="hl-card"><h5><span class="hl-bar"></span>' + h.t + "</h5><p>" + h.d + "</p></div>";
        }).join("") + "</div></div>";
    }

    $("#modalBody").innerHTML =
      '<div class="modal-head" style="--accent:' + p.accent + '">' +
      '<span class="modal-kicker">' + p.period + (p.role ? " · " + p.role : "") + "</span>" +
      "<h2>" + p.name + (p.sub ? '<span class="modal-sub">' + p.sub + "</span>" : "") + "</h2></div>" +
      (p.shots && p.shots.length
        ? '<div class="modal-shots">' + p.shots.map(function (s, i) {
            return '<figure class="shot-frame" style="--accent:' + p.accent + '">' + shotImg(p, i) + "<figcaption>" + s.title + "</figcaption></figure>";
          }).join("") + "</div>"
        : "") +
      '<div class="modal-sec"><h4>技术栈</h4><div class="skill-tags">' + p.tech.map(function (t) { return '<span class="tag accent">' + t + "</span>"; }).join("") + "</div></div>" +
      body;

    $("#modal").classList.add("open");
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();

    // 空闲时预取该项目的大图，点开灯箱即可秒开
    if (p.shots && p.shots.length) {
      const idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 300); };
      idle(function () {
        p.shots.forEach(function (s, i) { lbPreloadSrc("assets/screenshots/" + p.id + "-" + (i + 1) + ".webp"); });
      });
    }
  }

  function closeModal() {
    $("#modal").classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  function bindModal() {
    $("#modalClose").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", function (ev) { if (ev.target === $("#modal")) closeModal(); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") closeModal(); });
    // 点击截图放大
    $("#modal").addEventListener("click", function (ev) {
      const img = ev.target.closest(".shot-frame img");
      if (!img) return;
      const frames = $$("#modal .shot-frame img");
      openLightbox(frames, frames.indexOf(img));
    });
  }

  /* ---------- 大图预览（支持左右切换） ---------- */

  let lbList = [], lbIndex = 0, lbCache = {};

  // 预加载指定大图，切换时不用等网络
  function lbPreloadSrc(url) {
    if (!url || lbCache[url]) return;
    lbCache[url] = new Image();
    lbCache[url].src = url;
  }

  function lbPreload(i) {
    const img = lbList[i];
    if (!img) return;
    lbPreloadSrc(img.dataset.full || img.src);
  }

  function lbShow() {
    const img = lbList[lbIndex];
    if (!img) return;
    const url = img.dataset.full || img.src;   // 灯箱始终展示完整原图
    if ($("#lightboxImg").getAttribute("src") !== url) $("#lightboxImg").src = url;
    $("#lightboxImg").alt = img.alt || "";
    $("#lightboxCap").textContent = img.alt || "";
    $("#lbPrev").disabled = lbIndex <= 0;
    $("#lbNext").disabled = lbIndex >= lbList.length - 1;
    $("#lbCount").textContent = (lbIndex + 1) + " / " + lbList.length;
    lbPreload(lbIndex - 1);
    lbPreload(lbIndex + 1);
  }

  function openLightbox(list, index) {
    lbList = list || [];
    lbIndex = Math.max(0, index || 0);
    lbShow();
    $("#lightbox").classList.add("open");
  }

  function bindLightbox() {
    $("#lightbox").addEventListener("click", function (ev) {
      if (ev.target.closest(".lb-nav") || ev.target.closest("#lbCount")) return;
      $("#lightbox").classList.remove("open");
    });
    $("#lbPrev").addEventListener("click", function () { if (lbIndex > 0) { lbIndex--; lbShow(); } });
    $("#lbNext").addEventListener("click", function () { if (lbIndex < lbList.length - 1) { lbIndex++; lbShow(); } });
    document.addEventListener("keydown", function (ev) {
      if (!$("#lightbox").classList.contains("open")) return;
      if (ev.key === "Escape") $("#lightbox").classList.remove("open");
      if (ev.key === "ArrowLeft") $("#lbPrev").click();
      if (ev.key === "ArrowRight") $("#lbNext").click();
    });
  }

  /* ---------- 联系 & 页脚 ---------- */

  function renderContact() {
    $("#contactCards").innerHTML =
      '<a class="contact-card reveal" href="tel:' + PROFILE.phone + '">' + svgIcon("M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z") + "<h4>电话</h4><p>" + PROFILE.phone + "</p></a>" +
      '<a class="contact-card reveal" href="mailto:' + PROFILE.email + '">' + svgIcon("M22 6L12 13 2 6M2 6h20v12H2z") + "<h4>邮箱</h4><p>" + PROFILE.email + "</p></a>" +
      '<div class="contact-card reveal">' + svgIcon("M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5") + "<h4>求职状态</h4><p>" + PROFILE.title + " · " + PROFILE.status + "</p></div>";
    $("#footerNote").textContent = "© 2026 " + PROFILE.name + " · 前端开发工程师 · " + PROFILE.school + " " + PROFILE.major;
  }

  /* ---------- 滚动显现动画 ---------- */

  function bindReveal() {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("shown");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- 粒子背景 ---------- */

  function bindParticles() {
    const cv = $("#particles");
    const ctx = cv.getContext("2d");
    let W, H, parts = [];
    function resize() {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      const n = Math.min(90, Math.floor(W / 14));
      parts = [];
      for (let i = 0; i < n; i++) {
        parts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.8 + 0.6,
        });
      }
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(94,196,255,0.5)";
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(94,196,255," + (0.09 * (1 - d / 110)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener("resize", resize);
    tick();
  }

  /* ---------- 返回顶部 ---------- */

  function bindBackTop() {
    const btn = $("#backTop");
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- 初始化 ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderProjectFilters();
    renderProjects();
    renderContact();
    bindModal();
    bindLightbox();
    bindReveal();
    bindParticles();
    bindBackTop();
  });
})();
