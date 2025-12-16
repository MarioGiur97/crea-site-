(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // KPI (index2)
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

  // NEWS (index2) - box unico scrollabile + ricerca
  const newsListEl = document.getElementById("newsList");
  const newsQueryEl = document.getElementById("newsQuery");

  const NEWS = [
    {
      title: "Mercato carburanti: dinamiche di breve periodo",
      tag: "Carburanti",
      date: "Oggi",
      snippet: "Sintesi placeholder: movimenti di prezzo e fattori di breve periodo sul mercato dei carburanti.",
      url: "#"
    },
    {
      title: "Logistica: impatti su approvvigionamento e distribuzione",
      tag: "Supply chain",
      date: "Questa settimana",
      snippet: "Sintesi placeholder: disponibilità e tempi di consegna possono influire sulla distribuzione.",
      url: "#"
    },
    {
      title: "Scenario macro e prezzi: fattori principali",
      tag: "Mercati",
      date: "Questa settimana",
      snippet: "Sintesi placeholder: fattori macro e volatilità contribuiscono alla formazione dei prezzi.",
      url: "#"
    },
    {
      title: "Focus agricoltura: stagionalità e consumi",
      tag: "Agricolo",
      date: "Questo mese",
      snippet: "Sintesi placeholder: variazioni di consumo e stagionalità nell’uso agricolo dei carburanti.",
      url: "#"
    },
    {
      title: "Motopesca: trend e disponibilità prodotto",
      tag: "Motopesca",
      date: "Questo mese",
      snippet: "Sintesi placeholder: domanda del settore e disponibilità del prodotto per motopesca.",
      url: "#"
    },
    {
      title: "Normative e compliance: aggiornamenti di settore",
      tag: "Normative",
      date: "Questo trimestre",
      snippet: "Sintesi placeholder: aggiornamenti e best practice di compliance nel settore petrolifero.",
      url: "#"
    },
  ];

  function renderNews(list) {
    if (!newsListEl) return;

    newsListEl.innerHTML = list.map(n => `
      <a class="newsRow" href="${n.url}" role="listitem" title="Apri articolo (demo)">
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

    if (!list.length) {
      newsListEl.innerHTML = `
        <div style="padding:12px; color: rgba(245,255,249,.72)">
          Nessun risultato per la ricerca (demo).
        </div>
      `;
    }
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

  if (newsQueryEl) {
    newsQueryEl.addEventListener("input", applyNewsFilter);
  }

  // PREZZI: tabella mock + edit demo
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

  // CONTATTI: demo submit + mailto
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
