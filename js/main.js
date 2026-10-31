/* =========================================================
   Общая логика сайта: шапка, подвал, меню, вывод данных
   ========================================================= */

const MENU = [
  {
    title: "Наша школа",
    items: [
      ["about.html", "О школе"],
      ["staff.html", "Педагогический состав"],
      ["svedeniya.html", "Сведения об образовательной организации"],
      ["contacts.html", "Контакты"]
    ]
  },
  {
    title: "Обучение",
    items: [
      ["journal.html", "Электронный журнал"],
      ["schedule.html", "Расписание"],
      ["funcgram.html", "Функциональная грамотность"],
      ["quality.html", "Оценка качества образования"]
    ]
  },
  {
    title: "Жизнь школы",
    items: [
      ["news.html", "Новости"],
      ["events.html", "Мероприятия"],
      ["schedule.html#clubs", "Кружки и секции"],
      ["about.html#achievements", "Достижения"]
    ]
  },
  {
    title: "Родителям и ученикам",
    items: [
      ["services.html", "Услуги и сервисы"],
      ["useful.html", "Полезная информация"],
      ["useful.html#admission", "Приём в школу"],
      ["useful.html#food", "Школьное питание"]
    ]
  }
];

const MAIN_NAV = [
  ["about.html", "О школе"],
  ["svedeniya.html", "Сведения"],
  ["schedule.html", "Расписание"],
  ["news.html", "Новости"],
  ["events.html", "Мероприятия"],
  ["contacts.html", "Контакты"]
];

const currentPage = location.pathname.split("/").pop() || "index.html";

function logoHTML() {
  return `
    <a href="index.html" class="logo" aria-label="На главную">
      <span class="logo-mark">22</span>
      <span class="logo-text">
        <strong>Школа №22</strong>
        <span>имени Д. М. Карбышева · Краснодар</span>
      </span>
    </a>`;
}

function buildHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;

  const nav = MAIN_NAV.map(([href, label]) =>
    `<a href="${href}" class="${href === currentPage ? "active" : ""}">${label}</a>`).join("");

  const mega = MENU.map(group => `
    <div>
      <h3>${group.title}</h3>
      <ul>${group.items.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
    </div>`).join("");

  el.outerHTML = `
    <a href="#main" class="skip-link">Перейти к содержимому</a>
    <div class="topbar">
      <div class="container">
        <div class="topbar-left">
          <a href="tel:${SCHOOL.phone.replace(/[^\d+]/g, "")}">📞 ${SCHOOL.phone}</a>
          <a href="mailto:${SCHOOL.email}" class="hide-sm">✉️ ${SCHOOL.email}</a>
        </div>
        <div class="topbar-right">
          <a href="${SCHOOL.vk}" target="_blank" rel="noopener" class="hide-sm">ВКонтакте</a>
          <button class="a11y-btn" id="a11yBtn" type="button">👁 Версия для слабовидящих</button>
        </div>
      </div>
    </div>
    <header class="header">
      <div class="container">
        ${logoHTML()}
        <nav class="nav" aria-label="Основное меню">${nav}</nav>
        <div style="display:flex;gap:10px;align-items:center">
          <a href="journal.html" class="btn btn-gold btn-sm">Электронный журнал</a>
          <button class="menu-toggle" id="menuOpen" type="button" aria-expanded="false" aria-controls="mega">
            <span class="burger"><span></span></span><span class="label">Все разделы</span>
          </button>
        </div>
      </div>
    </header>
    <div class="mega" id="mega" role="dialog" aria-label="Все разделы сайта">
      <div class="container">
        <div class="mega-head">
          ${logoHTML()}
          <button class="mega-close" id="menuClose" type="button" aria-label="Закрыть меню">×</button>
        </div>
        <div class="mega-grid">${mega}</div>
      </div>
    </div>`;
}

function buildFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;

  const cols = MENU.slice(0, 3).map(group => `
    <div>
      <h4>${group.title}</h4>
      <ul>${group.items.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
    </div>`).join("");

  el.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            ${logoHTML()}
            <p class="footer-about">${SCHOOL.address}<br>
              Тел.: <a href="tel:${SCHOOL.phone.replace(/[^\d+]/g, "")}">${SCHOOL.phone}</a><br>
              E-mail: <a href="mailto:${SCHOOL.email}">${SCHOOL.email}</a></p>
            <div class="socials">
              <a href="${SCHOOL.vk}" target="_blank" rel="noopener" aria-label="ВКонтакте">VK</a>
              <a href="${SCHOOL.sferum}" target="_blank" rel="noopener" aria-label="Сферум">Сф</a>
              <a href="${SCHOOL.gosuslugi}" target="_blank" rel="noopener" aria-label="Госуслуги">ГУ</a>
            </div>
          </div>
          ${cols}
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${SCHOOL.shortName} имени Героя Советского Союза Д. М. Карбышева</span>
          <span><a href="svedeniya.html">Сведения об образовательной организации</a></span>
        </div>
      </div>
    </footer>
    <button class="to-top" id="toTop" type="button" aria-label="Наверх">↑</button>`;
}

/* ---------- Меню, доступность, анимации ---------- */
function initUI() {
  const mega = document.getElementById("mega");
  const openBtn = document.getElementById("menuOpen");
  const closeBtn = document.getElementById("menuClose");

  const setMenu = open => {
    mega.classList.toggle("open", open);
    document.body.classList.toggle("no-scroll", open);
    openBtn.setAttribute("aria-expanded", open);
    if (open) closeBtn.focus();
  };
  openBtn?.addEventListener("click", () => setMenu(true));
  closeBtn?.addEventListener("click", () => setMenu(false));
  mega?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Версия для слабовидящих
  const a11yBtn = document.getElementById("a11yBtn");
  const applyA11y = on => {
    document.documentElement.classList.toggle("a11y", on);
    if (a11yBtn) a11yBtn.textContent = on ? "👁 Обычная версия" : "👁 Версия для слабовидящих";
  };
  let a11yOn = false;
  try { a11yOn = localStorage.getItem("a11y") === "1"; } catch (e) {}
  applyA11y(a11yOn);
  a11yBtn?.addEventListener("click", () => {
    a11yOn = !a11yOn;
    applyA11y(a11yOn);
    try { localStorage.setItem("a11y", a11yOn ? "1" : "0"); } catch (e) {}
  });

  // Кнопка «наверх»
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => toTop?.classList.toggle("show", window.scrollY > 600));
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0 }));

  // Подсветка пункта бокового меню
  const side = document.querySelectorAll(".sidenav a[href^='#']");
  if (side.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          side.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    side.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
  }
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("visible")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: .12 });
  items.forEach(i => io.observe(i));
}

/* ---------- Вывод данных ---------- */
const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const MONTHS_FULL = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

function newsCard(n) {
  const img = n.image
    ? `<div class="card-img" style="background-image:url('${n.image}')"></div>`
    : `<div class="card-img">${n.icon || "📰"}</div>`;
  return `
    <article class="card">
      ${img}
      <div class="card-body">
        <div class="card-meta"><span class="tag">${n.category}</span><time datetime="${n.date}">${fmtDate(n.date)}</time></div>
        <h3>${n.title}</h3>
        <p>${n.text}</p>
      </div>
    </article>`;
}

function renderNews(el) {
  const limit = +el.dataset.limit || NEWS.length;
  const list = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

  const draw = cat => {
    const items = list.filter(n => !cat || cat === "Все" || n.category === cat).slice(0, limit);
    el.innerHTML = items.length ? items.map(newsCard).join("") : `<p class="empty">Новостей пока нет</p>`;
  };

  const filterBox = document.querySelector(el.dataset.filter || "#none");
  if (filterBox) {
    const cats = ["Все", ...new Set(list.map(n => n.category))];
    filterBox.innerHTML = cats.map((c, i) => `<button class="chip${i ? "" : " active"}" type="button">${c}</button>`).join("");
    filterBox.addEventListener("click", e => {
      if (!e.target.matches(".chip")) return;
      filterBox.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === e.target));
      draw(e.target.textContent);
    });
  }
  draw();
}

function eventRow(ev, past) {
  const d = new Date(ev.date + "T00:00:00");
  return `
    <article class="event${past ? " past" : ""}">
      <div class="event-date"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
      <div><h3>${ev.title}</h3><p>${ev.text}</p></div>
      <div class="event-place">📍 ${ev.place}</div>
    </article>`;
}

function renderEvents(el) {
  const today = new Date().toISOString().slice(0, 10);
  const limit = +el.dataset.limit || 0;
  const upcoming = EVENTS.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = EVENTS.filter(e => e.date < today).sort((a, b) => b.date.localeCompare(a.date));

  if (limit) {
    el.innerHTML = upcoming.slice(0, limit).map(e => eventRow(e)).join("") || `<p class="empty">Ближайших мероприятий нет</p>`;
    return;
  }
  el.innerHTML =
    `<h2>Предстоящие</h2>` +
    (upcoming.map(e => eventRow(e)).join("") || `<p class="empty">Ближайших мероприятий нет</p>`) +
    (past.length ? `<h2 style="margin-top:40px">Прошедшие</h2>` + past.map(e => eventRow(e, true)).join("") : "");
}

function renderStaff(el) {
  const search = document.querySelector(el.dataset.search || "#none");
  const initials = name => name.split(" ").slice(0, 2).map(w => w[0]).join("");

  const draw = q => {
    const items = STAFF.filter(p => !q || (p.name + p.position + p.subjects).toLowerCase().includes(q.toLowerCase()));
    el.innerHTML = items.length ? items.map(p => `
      <article class="person">
        <div class="person-photo"${p.photo ? ` style="background-image:url('${p.photo}')"` : ""}>${p.photo ? "" : initials(p.name)}</div>
        <div class="person-body">
          <h4>${p.name}</h4>
          <p>${p.position}</p>
          ${p.subjects ? `<p>${p.subjects}</p>` : ""}
          ${p.experience ? `<p>${p.experience}</p>` : ""}
          ${p.category ? `<span class="tag">${p.category}</span>` : ""}
        </div>
      </article>`).join("") : `<p class="empty">Никого не найдено</p>`;
  };
  search?.addEventListener("input", e => draw(e.target.value.trim()));
  draw();
}

function renderBells(el) {
  el.innerHTML = `
    <div class="table-wrap"><table class="schedule-table" style="min-width:0">
      <thead><tr><th>№</th><th>Время урока</th><th>Перемена</th></tr></thead>
      <tbody>${BELLS.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody>
    </table></div>`;
}

function renderTimetable(el) {
  const classes = Object.keys(TIMETABLE);
  const chips = document.createElement("div");
  chips.className = "chips";
  chips.innerHTML = classes.map((c, i) => `<button class="chip${i ? "" : " active"}" type="button">${c}</button>`).join("");
  const box = document.createElement("div");
  el.append(chips, box);

  const draw = cls => {
    const days = TIMETABLE[cls];
    const names = Object.keys(days);
    const max = Math.max(...names.map(d => days[d].length));
    let rows = "";
    for (let i = 0; i < max; i++) {
      rows += `<tr><td>${i + 1}</td>${names.map(d => `<td>${days[d][i] || ""}</td>`).join("")}</tr>`;
    }
    box.innerHTML = `<div class="table-wrap"><table class="schedule-table">
      <thead><tr><th>№</th>${names.map(d => `<th>${d}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  };
  chips.addEventListener("click", e => {
    if (!e.target.matches(".chip")) return;
    chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === e.target));
    draw(e.target.textContent);
  });
  draw(classes[0]);
}

function renderClubs(el) {
  el.innerHTML = `
    <div class="table-wrap"><table class="schedule-table">
      <thead><tr><th>Кружок / секция</th><th>Для кого</th><th>Время</th><th>Место</th></tr></thead>
      <tbody>${CLUBS.map(c => `<tr><td style="width:auto">${c.name}</td><td>${c.who}</td><td>${c.time}</td><td>${c.place}</td></tr>`).join("")}</tbody>
    </table></div>`;
}

function renderSchoolField(el) {
  const key = el.dataset.school;
  if (SCHOOL[key]) el.textContent = SCHOOL[key];
}

const RENDERERS = {
  news: renderNews,
  events: renderEvents,
  staff: renderStaff,
  bells: renderBells,
  timetable: renderTimetable,
  clubs: renderClubs
};

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  initUI();
  document.querySelectorAll("[data-render]").forEach(el => RENDERERS[el.dataset.render]?.(el));
  document.querySelectorAll("[data-school]").forEach(renderSchoolField);
  initReveal();

  // Форма обратной связи (демо — без отправки на сервер)
  document.querySelectorAll("form[data-demo]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    f.querySelector(".form-ok").style.display = "block";
    f.reset();
  }));
});
