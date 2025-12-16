(function () {
  /* FOOTER YEAR */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* KPI HOME */
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
     ULTIME NOTIZIE – CONTENUTI ESEMPLIFICATIVI
     ========================= */

  const newsListEl = document.getElementById("newsList");
  const newsQueryEl = document.getElementById("newsQuery");

  const NEWS = [
    {
      title: "Andamento dei prezzi dei carburanti nella settimana corrente",
      tag: "Carburanti",
      date: "Oggi",
      snippet:
        "Nel corso della settimana i prezzi dei carburanti mostrano una moderata volatilità, "
        + "influenzata dall’andamento delle quotazioni internazionali e dai costi di approvvigionamento. "
        + "Il mercato resta stabile, con variazioni contenute sui principali prodotti petroliferi.",
      url: "#"
    },
    {
      title: "Logistica e approvvigionamento: focus sulla continuità delle forniture",
      tag: "Supply chain",
      date: "Questa settimana",
      snippet:
        "La gestione della catena di fornitura resta un elemento centrale per garantire continuità "
        + "e affidabilità del servizio. Le attività di pianificazione logistica consentono di "
        + "ridurre l’impatto delle oscillazioni di mercato e assicurare disponibilità di prodotto.",
      url: "#"
    },
    {
      title: "Scenario macroeconomico e impatti sul mercato petrolifero",
      tag: "Mercati",
      date: "Questa settimana",
      snippet:
        "Fattori macroeconomici e dinamiche internazionali continuano a influenzare il mercato petrolifero. "
        + "Le quotazioni risentono del contesto globale, con attenzione particolare alla domanda e "
        + "alle politiche di produzione.",
      url: "#"
    },
    {
      title: "Settore agricolo: stagionalità e utilizzo dei carburanti",
      tag: "Agricolo",
      date: "Questo mese",
      snippet:
        "Nel periodo stagionale aumenta la domanda di carburanti per uso agricolo. "
        + "La programmazione delle forniture e la trasparenza dei listini rappresentano "
        + "un fattore chiave per supportare le attività del settore.",
      url: "#"
    },
    {
      title: "Motopesca: disponibilità del gasolio e trend di consumo",
      tag: "Motopesca",
      date: "Questo mese",
      snippet:
        "Il comparto motopesca richiede continuità di approvvigionamento e stabilità dei prezzi. "
        + "Le dinamiche di consumo seguono l’andamento stagionale e le attività operative delle flotte.",
      url: "#"
    },
    {
      title: "Aggiornamenti normativi e best practice di settore",
      tag: "Normative",
      date: "Questo trimestre",
      snippet:
        "Il quadro normativo del settore petrolifero è in costante evoluzione. "
        + "Rimanere aggiornati sulle disposizioni vigenti è fondamentale per garantire "
        + "operatività conforme e processi trasparenti.",
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
    if (!q) {
      renderNews(NEWS);
      return;
    }

    const filtered = NEWS.filter(n => {
      const haystack = `${n.title} ${n.tag} ${n.snippet}`.toLowerCase();
      return haystack.includes(q);
    });

    renderNews(filtered);
  }

  if (newsQueryEl) {
    newsQueryEl.addEventListener("input", applyNewsFilter);
  }

  /* =========================
     PREZZI (come prima)
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

})();
