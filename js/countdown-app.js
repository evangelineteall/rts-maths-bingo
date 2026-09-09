/*
 * Countdown Targets — app logic.
 * Classic "Countdown" numbers game: a set of numbers is drawn (a mix of "big" numbers —
 * 25/50/75/100 — and "small" numbers 1-10), a target number appears, and students try to
 * reach the target using +, -, x, / (not every number has to be used). Reveal shows one
 * worked route to the target, step by step.
 *
 * Difficulty is generated to fit the chosen year group: how many numbers, how many of them
 * are "big", which operations are allowed, and what range the target falls in.
 */

(function () {
  const BIG_POOL = [25, 50, 75, 100];

  // Per-year difficulty. bigMin/bigMax: how many big numbers (25/50/75/100) are drawn.
  // usedMin/usedMax: how many of the drawn numbers the worked solution uses.
  const LEVELS = {
    Transition: {
      label: "Transition", numbersCount: 4, bigMin: 0, bigMax: 0,
      ops: ["+", "-", "×"], capSmallMultiply: 5,
      usedMin: 2, usedMax: 3, targetMin: 10, targetMax: 40,
    },
    Y7: {
      label: "Y7", numbersCount: 5, bigMin: 0, bigMax: 0,
      ops: ["+", "-", "×", "÷"],
      usedMin: 2, usedMax: 4, targetMin: 20, targetMax: 99,
    },
    Y8: {
      label: "Y8", numbersCount: 5, bigMin: 0, bigMax: 1,
      ops: ["+", "-", "×", "÷"],
      usedMin: 3, usedMax: 4, targetMin: 50, targetMax: 300,
    },
    Y9: {
      label: "Y9", numbersCount: 6, bigMin: 0, bigMax: 2,
      ops: ["+", "-", "×", "÷"],
      usedMin: 3, usedMax: 5, targetMin: 100, targetMax: 500,
    },
    Y10: {
      label: "Y10", numbersCount: 6, bigMin: 2, bigMax: 3,
      ops: ["+", "-", "×", "÷"],
      usedMin: 4, usedMax: 6, targetMin: 101, targetMax: 999,
    },
    Y11: {
      label: "Y11", numbersCount: 6, bigMin: 0, bigMax: 4,
      ops: ["+", "-", "×", "÷"],
      usedMin: 4, usedMax: 6, targetMin: 101, targetMax: 999,
    },
  };
  const LEVEL_ORDER = ["Transition", "Y7", "Y8", "Y9", "Y10", "Y11"];

  let selectedLevel = null;
  let currentPuzzle = null; // { allNumbers, usedNumbers, target, steps }
  let puzzlesShown = 0;
  let awaitingReveal = false;

  // ------------------------------------------------------------ DOM refs
  const screenSetup = document.getElementById("screen-setup");
  const screenCaller = document.getElementById("screen-caller");
  const screenSummary = document.getElementById("screen-summary");

  const levelGridEl = document.getElementById("level-grid");
  const selectionSummaryEl = document.getElementById("selection-summary");
  const startGameBtn = document.getElementById("start-game-btn");

  const progressTextEl = document.getElementById("progress-text");
  const endGameBtn = document.getElementById("end-game-btn");
  const targetNumberEl = document.getElementById("target-number");
  const numbersRowEl = document.getElementById("numbers-row");
  const revealAreaEl = document.getElementById("reveal-area");
  const solutionStepsEl = document.getElementById("solution-steps");
  const revealBtn = document.getElementById("reveal-btn");
  const nextBtn = document.getElementById("next-btn");
  const skipBtn = document.getElementById("skip-btn");

  const summaryLineEl = document.getElementById("summary-line");
  const playAgainBtn = document.getElementById("play-again-btn");
  const newGameBtn = document.getElementById("new-game-btn");

  // ------------------------------------------------------------ Helpers
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function choice(arr) {
    return arr[randInt(0, arr.length - 1)];
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = randInt(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ------------------------------------------------------------ Level picker
  function renderLevelPicker() {
    levelGridEl.innerHTML = "";
    for (const key of LEVEL_ORDER) {
      const cfg = LEVELS[key];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-btn";
      btn.dataset.level = key;
      btn.textContent = cfg.label;
      btn.addEventListener("click", () => {
        selectedLevel = key;
        document.querySelectorAll(".level-btn").forEach((b) => b.classList.toggle("selected", b.dataset.level === key));
        updateSelectionSummary();
      });
      levelGridEl.appendChild(btn);
    }
  }

  function updateSelectionSummary() {
    if (!selectedLevel) {
      selectionSummaryEl.textContent = "No year group selected yet.";
      startGameBtn.disabled = true;
      return;
    }
    selectionSummaryEl.textContent = `Selected: ${LEVELS[selectedLevel].label}`;
    startGameBtn.disabled = false;
  }

  function clearSelection() {
    selectedLevel = null;
    document.querySelectorAll(".level-btn").forEach((b) => b.classList.remove("selected"));
    updateSelectionSummary();
  }

  // ------------------------------------------------------------ Puzzle generation
  function drawNumbers(cfg) {
    const bigCount = Math.min(randInt(cfg.bigMin, cfg.bigMax), BIG_POOL.length);
    const bigs = shuffle(BIG_POOL).slice(0, bigCount);
    const smallCount = cfg.numbersCount - bigCount;
    const smallCounts = {}; // value -> how many times drawn so far (max 2, like the real tile set)
    const smalls = [];
    let guard = 0;
    while (smalls.length < smallCount && guard < 500) {
      guard++;
      const v = randInt(1, 10);
      if ((smallCounts[v] || 0) >= 2) continue;
      smallCounts[v] = (smallCounts[v] || 0) + 1;
      smalls.push(v);
    }
    return shuffle(bigs.concat(smalls));
  }

  function feasibleOps(cfg, a, b) {
    const ops = [];
    if (cfg.ops.includes("+")) ops.push("+");
    if (cfg.ops.includes("-") && a !== b) ops.push("-");
    if (cfg.ops.includes("×")) {
      const cap = cfg.capSmallMultiply;
      if (!cap || Math.min(a, b) <= cap) ops.push("×");
    }
    if (cfg.ops.includes("÷")) {
      const hi = Math.max(a, b), lo = Math.min(a, b);
      if (lo > 1 && hi % lo === 0) ops.push("÷");
    }
    return ops;
  }

  function applyOp(op, a, b) {
    const hi = Math.max(a, b), lo = Math.min(a, b);
    switch (op) {
      case "+": return { value: a + b, text: `${a} + ${b} = ${a + b}` };
      case "-": return { value: hi - lo, text: `${hi} − ${lo} = ${hi - lo}` };
      case "×": return { value: a * b, text: `${a} × ${b} = ${a * b}` };
      case "÷": return { value: hi / lo, text: `${hi} ÷ ${lo} = ${hi / lo}` };
    }
  }

  function buildPuzzle(levelKey, maxAttempts) {
    const cfg = LEVELS[levelKey];
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const numbers = drawNumbers(cfg);
      const k = randInt(cfg.usedMin, Math.min(cfg.usedMax, numbers.length));
      const pool = shuffle(numbers).slice(0, k);

      let current = pool[0];
      const steps = [];
      let ok = true;
      for (let i = 1; i < pool.length; i++) {
        const next = pool[i];
        const options = feasibleOps(cfg, current, next);
        if (options.length === 0) { ok = false; break; }
        // Weight toward + / - so chains don't blow up too often.
        const weighted = [];
        for (const op of options) {
          const w = op === "+" || op === "-" ? 3 : 2;
          for (let w2 = 0; w2 < w; w2++) weighted.push(op);
        }
        const op = choice(weighted);
        const result = applyOp(op, current, next);
        if (!Number.isInteger(result.value) || result.value <= 0) { ok = false; break; }
        steps.push(result.text);
        current = result.value;
      }
      if (!ok) continue;
      if (current < cfg.targetMin || current > cfg.targetMax) continue;

      return { allNumbers: numbers, usedNumbers: pool, target: current, steps };
    }
    return null;
  }

  // ------------------------------------------------------------ Screen management
  function showScreen(el) {
    [screenSetup, screenCaller, screenSummary].forEach((s) => (s.hidden = s !== el));
    window.scrollTo(0, 0);
  }

  startGameBtn.addEventListener("click", () => {
    puzzlesShown = 0;
    showScreen(screenCaller);
    nextPuzzle();
  });

  // ------------------------------------------------------------ Caller screen
  function nextPuzzle() {
    const puzzle = buildPuzzle(selectedLevel, 1000);
    if (!puzzle) {
      alert("Couldn't build a puzzle for this year group just now — please try Next again.");
      return;
    }
    currentPuzzle = puzzle;
    awaitingReveal = true;
    revealAreaEl.hidden = true;
    revealBtn.hidden = false;
    nextBtn.hidden = true;
    skipBtn.hidden = false;

    targetNumberEl.textContent = puzzle.target;
    numbersRowEl.innerHTML = "";
    for (const n of puzzle.allNumbers) {
      const tile = document.createElement("div");
      tile.className = "number-tile";
      tile.textContent = n;
      numbersRowEl.appendChild(tile);
    }
    progressTextEl.textContent = `Puzzle ${puzzlesShown + 1} — ${LEVELS[selectedLevel].label}`;
  }

  revealBtn.addEventListener("click", () => {
    if (!awaitingReveal || !currentPuzzle) return;
    solutionStepsEl.innerHTML = "";
    for (const step of currentPuzzle.steps) {
      const p = document.createElement("p");
      p.textContent = step;
      solutionStepsEl.appendChild(p);
    }
    const finalLine = document.createElement("p");
    finalLine.className = "solution-final";
    finalLine.textContent = `Target reached: ${currentPuzzle.target}`;
    solutionStepsEl.appendChild(finalLine);

    // Mark which of the on-screen tiles were actually used in this route.
    const usedRemaining = currentPuzzle.usedNumbers.slice();
    Array.from(numbersRowEl.children).forEach((tile) => {
      const val = Number(tile.textContent);
      const idx = usedRemaining.indexOf(val);
      if (idx !== -1) {
        tile.classList.add("used");
        usedRemaining.splice(idx, 1);
      } else {
        tile.classList.add("unused");
      }
    });

    revealAreaEl.hidden = false;
    revealBtn.hidden = true;
    skipBtn.hidden = true;
    nextBtn.hidden = false;
    puzzlesShown++;
    awaitingReveal = false;
  });

  nextBtn.addEventListener("click", nextPuzzle);
  skipBtn.addEventListener("click", nextPuzzle);
  endGameBtn.addEventListener("click", endGame);

  function endGame() {
    showScreen(screenSummary);
    summaryLineEl.textContent = `${puzzlesShown} puzzle${puzzlesShown === 1 ? "" : "s"} revealed this session (${LEVELS[selectedLevel].label}).`;
  }

  // ------------------------------------------------------------ Summary screen buttons
  playAgainBtn.addEventListener("click", () => {
    puzzlesShown = 0;
    showScreen(screenCaller);
    nextPuzzle();
  });

  newGameBtn.addEventListener("click", () => {
    clearSelection();
    showScreen(screenSetup);
  });

  // ------------------------------------------------------------ Init
  renderLevelPicker();
  updateSelectionSummary();
})();
