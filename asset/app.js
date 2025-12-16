(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // HOME: KPI + news mock
  const kpiBox = document.getElementById("kpiBox");
  if (kpiBox) {
    const rnd = (min, max) => (Math.random() * (max - min) + min);
    const data = [
      { label: "Brent (USD/bbl)", value: rnd(70, 95).toFixed(2) },
      { label: "WTI (USD/bbl)", value: rnd(65, 92).toFixed(2) },
      { label: "Gas (EUR/MWh)", value: rnd(28, 55).toFixed(2) },
      { label: "CO₂ (EUR/t)", value: rnd(55, 90).toFixed(2) },
    ];

    kpiBox.innerHTML = data.map(d => `
      <div class="kpi">
        <div class="kpi__label">${d.label}</div>
        <div class="kpi__value">${d.value}</div>
      </div>
    `).join("");
  }

  const newsGrid = document.getElementById("newsGrid");
  if (newsGrid) {
    const items = [
      { title: "Transizione energetica: trend 2026", tag: "Energie", date: "Oggi" },
      { title: "Petrolio: fattori che influenzano i prezzi", tag: "Petrolio", date: "Ieri" },
      { title: "Rinnovabili: nuovi investimenti e capacità", tag: "Energie", date: "Questa settimana" },
      { title: "Logistica e supply chain: cosa cambia", tag: "Mercati", date: "Questa settimana" },
      { title: "Analisi: domanda e offerta nel breve periodo", tag: "Petrolio", date: "Questo mese" },
      { title: "Scenario macro: effetti su energia e commodities", tag: "Mercati", date: "Questo mese" },
    ];

    newsGrid.innerHTML = items.map(n => `
      <article class="card">
        <div class="card__title">${n.title}</div>
        <div class="muted">${n.tag} • ${n.date}</div>
        <p class="muted" style="margin-top:10px">
          Placeholder: in seguito caricheremo questi contenuti da DB e li gestiremo da backoffice.
        </p>
      </article>
    `).join("");
  }

  // PREZZI: tabella mock + “edit” demo
  const pricesTable = document.getElementById("pricesTable");
  const btnRefresh = document.getElementById("btnRefresh");
  const btnEdit = document.getElementById("btnEdit");

  function renderPrices() {
    if (!pricesTable) return;

    const today = new Date().toISOString().slice(0, 10);
    const base = [
      { product: "Diesel", unit: "L", currency: "EUR", price: 1.62 },
      { product: "Gasoline", unit: "L", currency: "EUR", price: 1.74 },
      { product: "Jet Fuel", unit: "L", currency: "EUR", price: 0.98 },
      { product: "LPG", unit: "Kg", currency: "EUR", price: 0.92 },
      { product: "Crude Brent", unit: "bbl", currency: "USD", price: 83.20 },
    ].map(x => ({ ...x, price: (x.price * (0.98 + Math.random() * 0.06)) }));

    const tbody = pricesTable.querySelector("tbody");
    tbody.innerHTML = base.map(r => `
      <tr>
        <td>${r.product}</td>
        <td>${r.unit}</td>
        <td>${r.currency}</td>
        <td class="right"><b>${r.price.toFixed(2)}</b></td>
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

      const product = prompt("Quale prodotto vuoi modificare? (es. Diesel)");
      if (!product) return;

      const row = prices.find(p => p.product.toLowerCase() === product.toLowerCase());
      if (!row) return alert("Prodotto non trovato (demo).");

      const newPriceStr = prompt(`Nuovo prezzo per ${row.product} (${row.currency}/${row.unit})`, String(row.price.toFixed(2)));
      if (!newPriceStr) return;

      const newPrice = Number(newPriceStr.replace(",", "."));
      if (!Number.isFinite(newPrice) || newPrice <= 0) return alert("Prezzo non valido.");

      row.price = newPrice;
      // rerender
      const tbody = pricesTable.querySelector("tbody");
      const today = new Date().toISOString().slice(0, 10);
      tbody.innerHTML = prices.map(r => `
        <tr>
          <td>${r.product}</td>
          <td>${r.unit}</td>
          <td>${r.currency}</td>
          <td class="right"><b>${r.price.toFixed(2)}</b></td>
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

      const subject = encodeURIComponent("Richiesta informazioni — OilCo Energy");
      const body = encodeURIComponent(
        `Nome: ${name}\nEmail: ${email}\nTelefono: ${phone}\n\nMessaggio:\n${message}\n`
      );

      // Demo: apre il client email. Step futuro: POST a API/DB.
      window.location.href = `mailto:info@oilco.example?subject=${subject}&body=${body}`;
    });
  }
})();

