/*
 * "Always, Sometimes, Never" — app logic.
 * Teacher picks a filter (year level and/or strand, or leave blank for everything),
 * presses Start, and the site shows one statement at a time for the class to discuss
 * before revealing the Always/Sometimes/Never answer and the explanation to read aloud.
 */

(function () {
  const YEAR_ORDER = ["Transition", "Y7", "Y8", "Y9", "Y10", "Y11"];

  // level -> strand -> [statements]
  const byLevel = {};
  const strandsByLevel = {};
  for (const st of ASN_STATEMENTS) {
    (byLevel[st.level] = byLevel[st.level] || {});
    (byLevel[st.level][st.strand] = byLevel[st.level][st.strand] || []).push(st);
    (strandsByLevel[st.level] = strandsByLevel[st.level] || new Set()).add(st.strand);
  }

  const activeFilters = new Set(); // "level|strand" keys; empty = everything

  let queue = [];
  let queueIndex = -1;
  let shownCount = 0;
  let awaitingReveal = false;

  // ------------------------------------------------------------ DOM refs
  const screenSetup = document.getElementById("screen-setup");
  const screenCaller = document.getElementById("screen-caller");
  const screenSummary = document.getElementById("screen-summary");

  const topicPickerEl = document.getElementById("topic-picker");
  const topicSearchEl = document.getElementById("topic-search");
  const selectNoneBtn = document.getElementById("select-none-btn");
  const selectionSummaryEl = document.getElementById("selection-summary");
  const startGameBtn = document.getElementById("start-game-btn");

  const progressTextEl = document.getElementById("progress-text");
  const endGameBtn = document.getElementById("end-game-btn");
  const questionTextEl = document.getElementById("question-text");
  const revealAreaEl = document.getElementById("reveal-area");
  const revealNumberEl = document.getElementById("reveal-number");
  const revealExplanationEl = document.getElementById("reveal-explanation");
  const revealBtn = document.getElementById("reveal-btn");
  const nextBtn = document.getElementById("next-btn");
  const skipBtn = document.getElementById("skip-btn");

  const summaryLineEl = document.getElementById("summary-line");
  const playAgainBtn = document.getElementById("play-again-btn");
  const newGameBtn = document.getElementById("new-game-btn");

  // ------------------------------------------------------------ Build filter picker
  function renderTopicPicker() {
    topicPickerEl.innerHTML = "";

    for (const level of YEAR_ORDER) {
      const strands = strandsByLevel[level];
      if (!strands) continue;
      const strandList = Array.from(strands).sort();
      const total = strandList.reduce((sum, s) => sum + byLevel[level][s].length, 0);

      const section = document.createElement("div");
      section.className = "year-section";

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "year-toggle";
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = `<span class="year-toggle-label">${escapeHtml(level)}</span><span class="year-toggle-count">${total} statement${total === 1 ? "" : "s"}</span><span class="year-toggle-chevron" aria-hidden="true">&#9662;</span>`;
      toggle.addEventListener("click", () => {
        const isOpen = section.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
      section.appendChild(toggle);

      const topicsEl = document.createElement("div");
      topicsEl.className = "year-topics";
      section.appendChild(topicsEl);

      topicPickerEl.appendChild(section);

      const card = document.createElement("div");
      card.className = "topic-card";
      card.dataset.searchText = (level + " " + strandList.join(" ")).toLowerCase();

      const header = document.createElement("div");
      header.className = "topic-card-header";
      header.innerHTML = `<div><h3>Strands</h3></div>`;
      card.appendChild(header);

      const ul = document.createElement("ul");
      ul.className = "subtopic-list";
      for (const strand of strandList) {
        const count = byLevel[level][strand].length;
        const key = `${level}|${strand}`;
        const li = document.createElement("li");
        const id = `st-${key.replace(/[^a-z0-9]/gi, "-")}`;
        li.innerHTML = `<input type="checkbox" id="${id}" data-key="${escapeHtml(key)}" /><label for="${id}">${escapeHtml(strand)} (${count})</label>`;
        ul.appendChild(li);
      }
      card.appendChild(ul);
      topicsEl.appendChild(card);

      ul.addEventListener("change", (e) => {
        if (e.target.matches('input[type="checkbox"]')) {
          const key = e.target.dataset.key;
          if (e.target.checked) activeFilters.add(key);
          else activeFilters.delete(key);
          updateSelectionSummary();
        }
      });
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function updateSelectionSummary() {
    const n = filteredStatements().length;
    if (activeFilters.size === 0) {
      selectionSummaryEl.textContent = `No filter selected — all ${n} statements included.`;
    } else {
      selectionSummaryEl.textContent = `${activeFilters.size} filter${activeFilters.size === 1 ? "" : "s"} selected — ${n} statement${n === 1 ? "" : "s"} included.`;
    }
    startGameBtn.disabled = n === 0;
  }

  function clearSelection() {
    activeFilters.clear();
    document.querySelectorAll('#topic-picker input[type="checkbox"]').forEach((b) => { b.checked = false; });
    updateSelectionSummary();
  }

  selectNoneBtn.addEventListener("click", clearSelection);

  topicSearchEl.addEventListener("input", () => {
    const q = topicSearchEl.value.trim().toLowerCase();
    const searching = q.length > 0;
    document.querySelectorAll(".year-section").forEach((section) => {
      let anyVisible = false;
      section.querySelectorAll(".topic-card").forEach((card) => {
        const matches = !searching || card.dataset.searchText.includes(q);
        card.classList.toggle("hidden-by-search", !matches);
        if (matches) anyVisible = true;
      });
      section.classList.toggle("no-match", searching && !anyVisible);
      if (searching) {
        section.classList.toggle("open", anyVisible);
        section.querySelector(".year-toggle").setAttribute("aria-expanded", String(anyVisible));
      } else {
        section.classList.remove("open");
        section.querySelector(".year-toggle").setAttribute("aria-expanded", "false");
      }
    });
  });

  // ------------------------------------------------------------ Build a queue from the filters
  function filteredStatements() {
    if (activeFilters.size === 0) return ASN_STATEMENTS.slice();
    return ASN_STATEMENTS.filter((st) => activeFilters.has(`${st.level}|${st.strand}`));
  }

  function buildQueue() {
    return shuffle(filteredStatements().slice());
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ------------------------------------------------------------ Screen management
  function showScreen(el) {
    [screenSetup, screenCaller, screenSummary].forEach((s) => (s.hidden = s !== el));
    window.scrollTo(0, 0);
  }

  startGameBtn.addEventListener("click", () => {
    const q = buildQueue();
    if (q.length === 0) {
      alert("No statements match this filter. Please choose a different one.");
      return;
    }
    queue = q;
    queueIndex = -1;
    shownCount = 0;
    showScreen(screenCaller);
    nextStatement();
  });

  // ------------------------------------------------------------ Caller screen
  function nextStatement() {
    queueIndex++;
    awaitingReveal = true;
    revealAreaEl.hidden = true;
    revealBtn.hidden = false;
    nextBtn.hidden = true;
    skipBtn.hidden = false;

    if (queueIndex >= queue.length) {
      endGame();
      return;
    }
    const item = queue[queueIndex];
    questionTextEl.textContent = item.statement;
    progressTextEl.textContent = `Statement ${queueIndex + 1} of ${queue.length}`;
  }

  revealBtn.addEventListener("click", () => {
    if (!awaitingReveal) return;
    const item = queue[queueIndex];
    revealNumberEl.textContent = item.answer;
    revealNumberEl.className = "verdict-badge verdict-" + item.answer.toLowerCase();
    revealExplanationEl.textContent = item.explanation;
    revealAreaEl.hidden = false;
    revealBtn.hidden = true;
    skipBtn.hidden = true;
    nextBtn.hidden = false;
    shownCount++;
    awaitingReveal = false;
  });

  nextBtn.addEventListener("click", nextStatement);

  skipBtn.addEventListener("click", () => {
    nextStatement();
  });

  endGameBtn.addEventListener("click", endGame);

  function endGame() {
    showScreen(screenSummary);
    summaryLineEl.textContent = `${shownCount} statement${shownCount === 1 ? "" : "s"} revealed out of ${queue.length} in this session.`;
  }

  // ------------------------------------------------------------ Summary screen buttons
  playAgainBtn.addEventListener("click", () => {
    const q = buildQueue();
    queue = q;
    queueIndex = -1;
    shownCount = 0;
    showScreen(screenCaller);
    nextStatement();
  });

  newGameBtn.addEventListener("click", () => {
    showScreen(screenSetup);
  });

  // ------------------------------------------------------------ Init
  renderTopicPicker();
  updateSelectionSummary();
})();
