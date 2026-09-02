/*
 * Maths Bingo — app logic.
 * Game format: students write numbers 0-100 of their own choosing on a whiteboard grid.
 * This app calls out maths questions one at a time; each question's answer is a number
 * 0-100. A live grid shows every number called so far so the teacher can check boards.
 */

(function () {
  const YEAR_ORDER = ["Y7", "Y8", "Y9", "Y10", "Y11"];
  const CODE_INFO = {}; // code -> { name, strand, topic, year }
  for (const entry of CURRICULUM) {
    for (const st of entry.subtopics) {
      if (!CODE_INFO[st.code]) {
        CODE_INFO[st.code] = { name: st.name, strand: entry.strand, topic: entry.topic, year: entry.year };
      }
    }
  }

  let selectedCode = null;
  let callList = [];       // [{ number, q, name }]
  let callIndex = -1;
  let calledNumbers = [];  // in call order
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
  const revealBtn = document.getElementById("reveal-btn");
  const nextBtn = document.getElementById("next-btn");
  const skipBtn = document.getElementById("skip-btn");
  const numberGridEl = document.getElementById("number-grid");
  const calledCountEl = document.getElementById("called-count");

  const summaryLineEl = document.getElementById("summary-line");
  const summaryGridEl = document.getElementById("summary-grid");
  const summaryListEl = document.getElementById("summary-list");
  const playAgainBtn = document.getElementById("play-again-btn");
  const newGameBtn = document.getElementById("new-game-btn");

  // ------------------------------------------------------------ Build topic picker
  function renderTopicPicker() {
    topicPickerEl.innerHTML = "";
    const byYear = {};
    for (const entry of CURRICULUM) {
      (byYear[entry.year] = byYear[entry.year] || []).push(entry);
    }

    for (const year of YEAR_ORDER) {
      const entries = byYear[year];
      if (!entries) continue;
      const yearGroup = document.createElement("div");
      yearGroup.className = "year-group";
      const h2 = document.createElement("h2");
      h2.textContent = year;
      yearGroup.appendChild(h2);
      topicPickerEl.appendChild(yearGroup);

      for (const entry of entries) {
        const card = document.createElement("div");
        card.className = "topic-card";
        card.dataset.searchText = (entry.strand + " " + entry.topic + " " + entry.subtopics.map((s) => s.name).join(" ")).toLowerCase();

        const header = document.createElement("div");
        header.className = "topic-card-header";
        header.innerHTML = `<div><h3>${escapeHtml(entry.strand)}</h3><div class="strand-label">${escapeHtml(entry.topic)}</div></div>`;
        card.appendChild(header);

        const ul = document.createElement("ul");
        ul.className = "subtopic-list";
        for (const st of entry.subtopics) {
          const li = document.createElement("li");
          const id = `st-${st.code}-${Math.random().toString(36).slice(2, 7)}`;
          li.innerHTML = `<input type="radio" name="subtopic-choice" id="${id}" data-code="${st.code}" /><label for="${id}">${escapeHtml(st.name)}</label>`;
          ul.appendChild(li);
        }
        card.appendChild(ul);
        topicPickerEl.appendChild(card);

        ul.addEventListener("change", (e) => {
          if (e.target.matches("input[type=radio]")) {
            selectedCode = e.target.dataset.code;
            updateSelectionSummary();
          }
        });
      }
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function updateSelectionSummary() {
    if (!selectedCode) {
      selectionSummaryEl.textContent = "No topic selected yet.";
      startGameBtn.disabled = true;
      return;
    }
    const info = CODE_INFO[selectedCode];
    selectionSummaryEl.textContent = `Selected: ${info ? info.name : selectedCode}`;
    startGameBtn.disabled = false;
  }

  function clearSelection() {
    selectedCode = null;
    document.querySelectorAll('#topic-picker input[type=radio]').forEach((b) => { b.checked = false; });
    updateSelectionSummary();
  }

  selectNoneBtn.addEventListener("click", clearSelection);

  topicSearchEl.addEventListener("input", () => {
    const q = topicSearchEl.value.trim().toLowerCase();
    document.querySelectorAll(".topic-card").forEach((card) => {
      card.classList.toggle("hidden-by-search", q.length > 0 && !card.dataset.searchText.includes(q));
    });
  });

  // ------------------------------------------------------------ Build a game from the selected topic
  const QUESTIONS_PER_NUMBER = 60;

  function buildGame() {
    if (!selectedCode) return [];
    const gen = GENERATORS[selectedCode];
    if (!gen) return [];
    const info = CODE_INFO[selectedCode];
    const seenNumbers = new Set();
    const list = [];
    const pool = buildPool(gen, QUESTIONS_PER_NUMBER, 800);
    for (const item of pool) {
      const n = Number(item.a);
      if (!Number.isInteger(n) || n < 0 || n > 100) continue;
      if (seenNumbers.has(n)) continue;
      seenNumbers.add(n);
      list.push({ number: n, q: item.q, name: info.name });
    }
    return shuffle(list);
  }

  // ------------------------------------------------------------ Screen management
  function showScreen(el) {
    [screenSetup, screenCaller, screenSummary].forEach((s) => (s.hidden = s !== el));
    window.scrollTo(0, 0);
  }

  startGameBtn.addEventListener("click", () => {
    const game = buildGame();
    if (game.length === 0) {
      alert("This topic couldn't produce a usable question. Please choose a different one.");
      return;
    }
    callList = game;
    callIndex = -1;
    calledNumbers = [];
    renderNumberGrid(numberGridEl, new Set());
    showScreen(screenCaller);
    nextQuestion();
    if (game.length < 20) {
      // gentle heads-up, not a blocker
      setTimeout(() => {
        questionTextEl.title = `Only ${game.length} distinct numbers are reachable with this topic.`;
      }, 0);
    }
  });

  // ------------------------------------------------------------ Caller screen
  function nextQuestion() {
    callIndex++;
    awaitingReveal = true;
    revealAreaEl.hidden = true;
    revealBtn.hidden = false;
    nextBtn.hidden = true;
    skipBtn.hidden = false;

    if (callIndex >= callList.length) {
      endGame();
      return;
    }
    const item = callList[callIndex];
    questionTextEl.textContent = item.q;
    progressTextEl.textContent = `Question ${callIndex + 1} of ${callList.length}`;
  }

  revealBtn.addEventListener("click", () => {
    if (!awaitingReveal) return;
    const item = callList[callIndex];
    revealNumberEl.textContent = item.number;
    revealAreaEl.hidden = false;
    revealBtn.hidden = true;
    skipBtn.hidden = true;
    nextBtn.hidden = false;
    calledNumbers.push(item.number);
    markCalled(item.number);
    awaitingReveal = false;
  });

  nextBtn.addEventListener("click", nextQuestion);

  skipBtn.addEventListener("click", () => {
    // Skip without calling this number — just move on.
    nextQuestion();
  });

  endGameBtn.addEventListener("click", endGame);

  function endGame() {
    showScreen(screenSummary);
    const sorted = calledNumbers.slice().sort((a, b) => a - b);
    summaryLineEl.textContent = `${calledNumbers.length} number${calledNumbers.length === 1 ? "" : "s"} called out of ${callList.length} available.`;
    renderNumberGrid(summaryGridEl, new Set(calledNumbers));
    summaryListEl.textContent = sorted.length ? sorted.join(", ") : "(none called)";
  }

  // ------------------------------------------------------------ Number grid (0-100)
  function renderNumberGrid(container, calledSet) {
    container.innerHTML = "";
    for (let i = 0; i <= 100; i++) {
      const cell = document.createElement("div");
      cell.className = "cell" + (calledSet.has(i) ? " called" : "");
      cell.textContent = i;
      cell.dataset.num = i;
      container.appendChild(cell);
    }
  }

  function markCalled(n) {
    const cell = numberGridEl.querySelector(`.cell[data-num="${n}"]`);
    if (cell) cell.classList.add("called");
    calledCountEl.textContent = `(${calledNumbers.length})`;
  }

  // ------------------------------------------------------------ Summary screen buttons
  playAgainBtn.addEventListener("click", () => {
    const game = buildGame();
    callList = game;
    callIndex = -1;
    calledNumbers = [];
    renderNumberGrid(numberGridEl, new Set());
    calledCountEl.textContent = "(0)";
    showScreen(screenCaller);
    nextQuestion();
  });

  newGameBtn.addEventListener("click", () => {
    clearSelection();
    showScreen(screenSetup);
  });

  // ------------------------------------------------------------ Init
  renderTopicPicker();
  updateSelectionSummary();
})();
