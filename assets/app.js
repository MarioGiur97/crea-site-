(function () {
  /* FOOTER YEAR */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* =========================
     MOBILE MENU (hamburger)
     ========================= */
  const btnMenuOpen = document.getElementById("btnMenuOpen");
  const btnMenuClose = document.getElementById("btnMenuClose");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawer = document.getElementById("drawer");

  function openMenu() {
    document.body.classList.add("menuOpen");
    if (btnMenuOpen) btnMenuOpen.setAttribute("aria-expanded", "true");
    if (drawer) drawer.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    document.body.classList.remove("menuOpen");
    if (btnMenuOpen) btnMenuOpen.setAttribute("aria-expanded", "false");
    if (drawer) drawer.setAttribute("aria-hidden", "true");
  }

  if (btnMenuOpen) btnMenuOpen.addEventListener("click", openMenu);
  if (btnMenuClose) btnMenuClose.addEventListener("click", closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeMenu);

  // Chiudi su ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Chiudi quando clicchi una voce del menu (se presente)
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList && target.classList.contains("drawer__link")) {
      closeMenu();
    }
  });

  /* =========================
     KPI HOME (index2)
     ========================= */
  const kpiBox = document.getElementById("kpiBox");
  if (kpiBox) {
    const rnd = (min, max) => (Math.random() * (max - min) + min);
    const data = [
      { label: "Benzina Auto (EUR/L)", value: rnd(1.72, 1.85).toFixed(3) },
      { label: "Gasolio Auto (EUR/L)", value: rnd(1.62, 1.78).toFixed(3) },
      { label: "Benzina Agricola (EUR/L)", value: rnd(1.10, 1.25).toFixed(3) },
      { label: "Gasolio Agricolo (EUR/L)", value: rnd(1.02, 1.18).toFixed(3) },
    ];

    kpiBox.innerHTML = data.map(d => `
      <div class="kpi">
        <div class="kpi__label">${d.label}</div>
        <div class="kpi__value">${d.value}</div>
      </div>
    `).join("");
  }

  /* =========================
     ULTIME NOTIZIE (index2)
     ========================= */
  const newsListEl = document.getElementById("newsList");
  const newsQueryEl = document.getElementById("newsQuery");

  const NEWS = [
    {
      title: "Andamento dei prezzi dei carburanti nella settimana corrente",
      tag: "Carburanti",
      date: "Oggi",
      snippet:
        "Prezzi con volatilità moderata, influenzata dalle quotazioni internazionali e dai costi di approvvigionamento. "
        + "Variazioni contenute sui principali prodotti petroliferi.",
      url: "#"
    },
    {
      title: "Logistica e approvvigionamento: focus sulla continuità delle forniture",
      tag: "Supply chain",
      date: "Questa settimana",
      snippet:
        "Pianificazione logistica e gestione scorte per garantire disponibilità di prodotto e ridurre gli impatti "
        + "delle oscillazioni di mercato.",
      url: "#"
    },
    {
      title: "Scenario macroeconomico e impatti sul mercato petrolifero",
      tag: "Mercati",
      date: "Questa settimana",
      snippet:
        "Dinamiche internazionali e domanda globale influenzano le quotazioni. Attenzione a fattori macro e volatilità.",
      url: "#"
    },
    {
      title: "Settore agricolo: stagionalità e utilizzo dei carburanti",
      tag: "Agricolo",
      date: "Questo mese",
      snippet:
        "Durante i picchi stagionali cresce la richiesta. Trasparenza dei listini e programmazione delle forniture "
        + "supportano le attività del settore.",
      url: "#"
    },
    {
      title: "Motopesca: disponibilità del gasolio e trend di consumo",
      tag: "Motopesca",
      date: "Questo mese",
      snippet:
        "Continuità di approvvigionamento e stabilità: le dinamiche seguono l’andamento delle attività operative delle flotte.",
      url: "#"
    },
    {
      title: "Aggiornamenti normativi e best practice di settore",
      tag: "Normative",
      date: "Questo trimestre",
      snippet:
        "Quadro normativo in evoluzione: aggiornamento continuo per garantire operatività conforme e processi trasparenti.",
      url: "#"
    }
  ];

  function renderNews(list) {
    if (!newsListEl) return;

    if (!list.length) {
      newsListEl.innerHTML = `
        <div style="padding:14px; color: rgba(245,255,249,.72)">
          Nessun risultato trovato.
        </div>
      `;
      return;
    }

    newsListEl.innerHTML = list.map(n => `
      <a class="newsRow" href="${n.url}" title="Apri articolo (demo)">
        <div class="newsRow__meta">
          <div class="newsRow__date">${n.date}</div>
          <div class="newsRow__tag">${n.tag}</div>
        </div>
        <div class="newsRow__body">
          <div class="newsRow__title">${n.title}</div>
          <div class="newsRow__snippet">${n.snippet}</div>
        </div>
      </a>
    `).join("");
  }

  if (newsListEl) renderNews(NEWS);

  function applyNewsFilter() {
    const q = (newsQueryEl?.value || "").trim().toLowerCase();
    if (!q) return renderNews(NEWS);

    const filtered = NEWS.filter(n => {
      const hay = `${n.title} ${n.tag} ${n.snippet}`.toLowerCase();
      return hay.includes(q);
    });

    renderNews(filtered);
  }

  if (newsQueryEl) newsQueryEl.addEventListener("input", applyNewsFilter);

  /* =========================
     PREZZI
     ========================= */
  const pricesTable = document.getElementById("pricesTable");
  const btnRefresh = document.getElementById("btnRefresh");
  const btnEdit = document.getElementById("btnEdit");

  function renderPrices() {
    if (!pricesTable) return;

    const today = new Date().toISOString().slice(0, 10);
    const base = [
      { product: "Benzina Auto", unit: "L", currency: "EUR", price: 1.78 },
      { product: "Gasolio Auto", unit: "L", currency: "EUR", price: 1.72 },
      { product: "Benzina Agricola", unit: "L", currency: "EUR", price: 1.18 },
      { product: "Gasolio Agricolo", unit: "L", currency: "EUR", price: 1.12 },
      { product: "Gasolio Motopesca", unit: "L", currency: "EUR", price: 0.98 },
    ].map(x => ({ ...x, price: (x.price * (0.98 + Math.random() * 0.04)) }));

    const tbody = pricesTable.querySelector("tbody");
    tbody.innerHTML = base.map(r => `
      <tr>
        <td>${r.product}</td>
        <td>${r.unit}</td>
        <td>${r.currency}</td>
        <td class="right"><b>${r.price.toFixed(3)}</b></td>
        <td>${today}</td>
      </tr>
    `).join("");

    window.__prices = base;
  }

  if (pricesTable) renderPrices();
  if (btnRefresh) btnRefresh.addEventListener("click", renderPrices);

  if (btnEdit) {
    btnEdit.addEventListener("click", () => {
      const prices = window.__prices || [];
      if (!prices.length) return;

      const product = prompt("Quale prodotto vuoi modificare? (es. Gasolio Auto)");
      if (!product) return;

      const row = prices.find(p => p.product.toLowerCase() === product.toLowerCase());
      if (!row) return alert("Prodotto non trovato (demo).");

      const newPriceStr = prompt(
        `Nuovo prezzo per ${row.product} (${row.currency}/${row.unit})`,
        String(row.price.toFixed(3))
      );
      if (!newPriceStr) return;

      const newPrice = Number(newPriceStr.replace(",", "."));
      if (!Number.isFinite(newPrice) || newPrice <= 0) return alert("Prezzo non valido.");

      row.price = newPrice;

      const tbody = pricesTable.querySelector("tbody");
      const today = new Date().toISOString().slice(0, 10);
      tbody.innerHTML = prices.map(r => `
        <tr>
          <td>${r.product}</td>
          <td>${r.unit}</td>
          <td>${r.currency}</td>
          <td class="right"><b>${r.price.toFixed(3)}</b></td>
          <td>${today}</td>
        </tr>
      `).join("");
    });
  }

  /* =========================
     CONTATTI
     ========================= */
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(contactForm);
      const name = String(fd.get("name") || "");
      const email = String(fd.get("email") || "");
      const phone = String(fd.get("phone") || "");
      const message = String(fd.get("message") || "");

      if (contactStatus) contactStatus.textContent = "Richiesta acquisita (demo). Apertura client mail…";

      const subject = encodeURIComponent("Richiesta informazioni — Crea Petroli");
      const body = encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone}\n\nMessaggio:\n${message}\n`
      );

      window.location.href = `mailto:info@creapetroli.example?subject=${subject}&body=${body}`;
    });
  }
})();
