/*
 * Maths Bingo — question generators.
 *
 * IMPORTANT GAME FORMAT: students draw their own grid on a whiteboard and fill it with
 * numbers of their choosing from 0 to 100. Every generator below MUST therefore return
 * an integer answer in the range 0–100 inclusive — that's the number a student could
 * plausibly have written down. Some topics (e.g. rearranging formulae, standard form,
 * exact trig values, constructions) have been adapted so the *final* number asked for
 * fits this range, even though the underlying skill and the numbers used to build the
 * question can be as large/awkward as normal.
 *
 * Each function returns { q: "question text", a: <integer 0-100> }.
 * A generator may `throw` to signal "please try again" (e.g. to dodge a degenerate
 * case) — the pool builder in utils.js catches this and retries automatically.
 */

(function () {
  const U = (typeof module !== "undefined") ? require("./utils.js") : self;
  const {
    randInt, randSign, choice, shuffle, gcd, roundTo, randDecimal, formatMoney,
    formatPercent, simplifyFraction, fractionStr, distinctInts, isPerfectSquare,
    nChoiceExcluding, ordinalSuffix, signed, paren,
  } = U;

  function inRange(n) { return Number.isFinite(n) && Number.isInteger(n) && n >= 0 && n <= 100; }
  function need(n) { if (!inRange(n)) throw 0; return n; }

  // Render a small tally chart in plain text, e.g. 7 -> "llll/ ll"
  function tallyStr(n) {
    const full = Math.floor(n / 5), rem = n % 5;
    const parts = [];
    for (let i = 0; i < full; i++) parts.push("llll/");
    if (rem > 0) parts.push("l".repeat(rem));
    return parts.join(" ");
  }

  // Formats a coefficient-times-variable term without an ugly "1x" — e.g. xTerm(1, "x") -> "x", xTerm(3, "x²") -> "3x²".
  function xTerm(coeff, unit) { return (coeff === 1 ? "" : `${coeff}`) + unit; }

  const PIE_DIVISORS = [4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60];
  // (l, w, h, d) integer cuboid space-diagonal triples: l^2+w^2+h^2 = d^2
  const CUBOID_TRIPLES = [
    [1, 2, 2, 3], [2, 3, 6, 7], [3, 4, 12, 13], [2, 6, 9, 11], [4, 4, 7, 9],
    [1, 4, 8, 9], [2, 10, 11, 15], [2, 5, 14, 15], [6, 6, 7, 11], [4, 13, 16, 21],
  ];
  // (p, q, r) integer Pythagorean triples: p^2+q^2 = r^2
  const CIRCLE_TRIPLES = [
    [3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25],
    [9, 12, 15], [12, 16, 20], [9, 40, 41], [20, 21, 29], [10, 24, 26],
  ];

  const GENERATORS = {

    // ============================================================ Y7 — Number sense
    M763: () => {
      const a = randInt(0, 100);
      let b = randInt(0, 100);
      if ((a + b) % 2 !== 0) b = b === 100 ? b - 1 : b + 1;
      const lo = Math.min(a, b), hi = Math.max(a, b);
      if (lo === hi) throw 0;
      return { q: `A number line runs from ${lo} to ${hi}. What number is exactly halfway between them?`, a: (lo + hi) / 2 };
    },
    M704: () => {
      const tens = randInt(1, 9), units = randInt(0, 9), num = tens * 10 + units;
      if (Math.random() < 0.5) return { q: `What is the value of the digit ${tens} in the number ${num}?`, a: tens * 10 };
      if (units === 0) throw 0;
      return { q: `What is the value of the digit ${units} in the number ${num}?`, a: units };
    },
    M522: () => {
      if (Math.random() < 0.5) { const n = randInt(1, 100); return { q: `How many tenths are there in ${n / 10}?`, a: n }; }
      const n = randInt(1, 100); return { q: `How many hundredths are there in ${n / 100}?`, a: n };
    },
    M527: () => {
      const nums = distinctInts(-20, 20, 4);
      return { q: `Here are four numbers: ${nums.join(", ")}. What is the difference between the largest and the smallest?`, a: Math.max(...nums) - Math.min(...nums) };
    },
    M111: () => { const num = randInt(0, 100), power = choice([5, 10]); return { q: `Round ${num} to the nearest ${power}.`, a: Math.round(num / power) * power }; },
    M431: () => { const num = randDecimal(0.01, 99.99, choice([1, 2])); return { q: `Round ${num} to the nearest whole number.`, a: Math.round(num) }; },

    // ============================================================ Y7 — Adding and subtracting
    M928: () => { const a = randInt(1, 99), maxB = 100 - a; if (maxB < 1) throw 0; const b = randInt(1, maxB); return { q: `${a} + ${b} = ?`, a: a + b }; },
    M429: () => { const dp = choice([1, 2]), target = randInt(1, 100), a = randDecimal(0.1, target - 0.1, dp), b = roundTo(target - a, dp); if (b <= 0) throw 0; return { q: `${a} + ${b} = ?`, a: target }; },
    M347: () => { const hi = randInt(1, 100), lo = randInt(0, hi - 1); return { q: `${hi} - ${lo} = ?`, a: hi - lo }; },
    M152: () => { const dp = choice([1, 2]), target = randInt(0, 100), lo = randDecimal(0.1, 50, dp), hi = roundTo(lo + target, dp); return { q: `${hi} - ${lo} = ?`, a: target }; },

    // ============================================================ Y7 — Multiplying
    M113: () => { const power = choice([10, 100, 1000]), mult = Math.random() < 0.5, target = randInt(0, 100); if (mult) { const base = roundTo(target / power, 4); return { q: `${base} × ${power} = ?`, a: target }; } return { q: `${target * power} ÷ ${power} = ?`, a: target }; },
    M911: () => { const a = choice([10, 20, 30, 40, 50]), b = randInt(2, 9), product = a * b; if (product > 100) throw 0; return { q: `${a} × ${b} = ?`, a: product }; },
    M187: () => { const a = randInt(11, 49), b = randInt(2, 4), product = a * b; if (product > 100) throw 0; return { q: `${a} × ${b} = ?`, a: product }; },
    M803: () => { const b = choice([2, 4, 5, 8, 10]), target = randInt(1, 100), a = roundTo(target / b, 3); return { q: `${a} × ${b} = ?`, a: target }; },

    // ============================================================ Y7 — Dividing
    M462: () => { const divisor = randInt(2, 12), quotient = randInt(2, 20); return { q: `${divisor * quotient} ÷ ${divisor} = ?`, a: quotient }; },
    M354: () => { const divisor = randInt(11, 25), quotient = randInt(10, 90); return { q: `${divisor * quotient} ÷ ${divisor} = ?`, a: quotient }; },
    M873: () => { const divisor = randInt(3, 12), quotient = randInt(3, 30), remainder = randInt(1, divisor - 1); return { q: `What is the remainder when ${divisor * quotient + remainder} is divided by ${divisor}?`, a: remainder }; },
    M262: () => { const divisor = randInt(2, 20), quotient = randDecimal(1, 50, choice([1, 2])), dividend = roundTo(divisor * quotient, 2); return { q: `${dividend} ÷ ${divisor} = ? (give your answer to the nearest whole number)`, a: Math.round(quotient) }; },
    M491: () => { const dvDp = choice([1, 2]), divisor = randDecimal(1.1, 20, dvDp), quotient = randInt(2, 30); return { q: `${roundTo(divisor * quotient, dvDp)} ÷ ${divisor} = ?`, a: quotient }; },

    // ============================================================ Y7 — Calculating with negative numbers
    M106: () => { const a = randInt(-20, 20), b = randInt(-20, 20), op = choice(["+", "-"]), result = op === "+" ? a + b : a - b; if (result < 0 || result > 100) throw 0; return { q: `${U.paren(a)} ${op} ${U.paren(b)} = ?`, a: result }; },
    M288: () => {
      if (choice(["×", "÷"]) === "×") { const a = choice([-1, 1]) * randInt(2, 10), b = choice([-1, 1]) * randInt(2, 10), product = a * b; if (product < 0 || product > 100) throw 0; return { q: `${U.paren(a)} × ${U.paren(b)} = ?`, a: product }; }
      const k = randInt(2, 12) * choice([-1, 1]); if (k < 0 || k > 100) throw 0; const bb = choice([-1, 1]) * randInt(2, 12), aa = bb * k;
      return { q: `${U.paren(aa)} ÷ ${U.paren(bb)} = ?`, a: k };
    },

    // ============================================================ Y7 — Order of operations
    M135: () => {
      const type = choice(["square", "cube", "sqrt", "power"]);
      if (type === "square") { const n = randInt(2, 10); return { q: `${n}² = ?`, a: n * n }; }
      if (type === "cube") { const n = randInt(2, 4); return { q: `${n}³ = ?`, a: n * n * n }; }
      if (type === "sqrt") { const n = randInt(2, 10); return { q: `√${n * n} = ?`, a: n }; }
      const combos = [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2]];
      const [base, exp] = choice(combos);
      return { q: `${base}^${exp} = ?`, a: Math.pow(base, exp) };
    },
    M521: () => {
      const a = randInt(2, 10), b = randInt(2, 9), c = randInt(2, 9), d = randInt(2, 9);
      const templates = [
        () => ({ q: `${a} + ${b} × ${c} = ?`, a: a + b * c }),
        () => ({ q: `(${a} + ${b}) × ${c} = ?`, a: (a + b) * c }),
        () => ({ q: `${a} × ${b} - ${c} = ?`, a: a * b - c }),
        () => ({ q: `${a} - ${b} + ${c} × ${d} = ?`, a: a - b + c * d }),
        () => ({ q: `${a}² - ${b} × ${c} = ?`, a: a * a - b * c }),
      ];
      const result = choice(templates)();
      need(result.a);
      return result;
    },
    M952: () => {
      if (Math.random() < 0.5) { const a = randInt(5, 45), b = randInt(5, Math.max(5, 95 - a)); const sum = a + b; if (sum > 100) throw 0; return { q: `Given that ${a} + ${b} = ${sum}, what is ${b} + ${a}?`, a: sum }; }
      const a = randInt(2, 10), b = randInt(2, 10), product = a * b; return { q: `Given that ${a} × ${b} = ${product}, what is ${b} × ${a}?`, a: product };
    },
    M409: () => {
      if (Math.random() < 0.5) { const a = randInt(2, 30), b = randInt(2, 30), c = randInt(2, 30), total = a + b + c; if (total > 100) throw 0; return { q: `(${a} + ${b}) + ${c} = ?  (this is the same as ${a} + (${b} + ${c}))`, a: total }; }
      const a = randInt(2, 4), b = randInt(2, 4), c = randInt(2, 4);
      return { q: `(${a} × ${b}) × ${c} = ?  (this is the same as ${a} × (${b} × ${c}))`, a: a * b * c };
    },

    // ============================================================ Y8 — Percentages
    M437: () => { const k = randInt(1, 10), m = randInt(1, 10); return { q: `Find ${5 * m}% of ${20 * k} (no calculator).`, a: k * m }; },
    M905: () => { const target = randInt(0, 100), pct = randInt(1, 100), base = roundTo(target * 100 / pct, 2); if (Math.round(base * pct / 100) !== target) throw 0; return { q: `Find ${pct}% of ${base} using a calculator.`, a: target }; },
    M476: () => { const k = randInt(1, 5), m = randInt(1, 10), base = 20 * k, pct = 5 * m, change = k * m, inc = Math.random() < 0.5, result = inc ? base + change : base - change; if (result < 0 || result > 100) throw 0; return { q: `${base} is ${inc ? "increased" : "decreased"} by ${pct}% (no calculator). What is the new amount?`, a: result }; },
    M533: () => { const target = randInt(0, 100), pct = randDecimal(1, 50, 1), inc = Math.random() < 0.5; const base = roundTo(inc ? target / (1 + pct / 100) : target / (1 - pct / 100), 2); if (base <= 0) throw 0; const check = Math.round(inc ? base + base * pct / 100 : base - base * pct / 100); if (check !== target) throw 0; return { q: `${base} is ${inc ? "increased" : "decreased"} by ${pct}% (calculator allowed). What is the new amount?`, a: target }; },

    // ============================================================ Y8 — Money
    M681: () => { const size = choice([100, 200, 250, 400, 500, 750, 1000]), pricePence = randInt(20, 900), per100 = Math.round(pricePence / size * 100); if (per100 > 100) throw 0; return { q: `A ${size}g bag costs £${(pricePence / 100).toFixed(2)}. What is the price per 100g, in pence, to the nearest penny?`, a: per100 }; },

    // ============================================================ Y8 — Indices
    M608: () => { const base = choice([2, 3, 4, 5, 10]), m = randInt(2, 6), n = randInt(1, 5), op = choice(["×", "÷"]), result = op === "×" ? m + n : m - n; if (result <= 0 || result > 100) throw 0; return { q: `Simplify ${base}^${m} ${op} ${base}^${n}, giving your answer as ${base}^? — what is the index?`, a: result }; },
    M150: () => { const options = [[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [10, 2]]; const [base, n] = choice(options); return { q: `Write ${base}^-${n} as a fraction: 1/?. What number replaces the ?`, a: Math.pow(base, n) }; },
    M120: () => { const m = randInt(2, 6), n = randInt(1, 5), op = choice(["×", "÷"]), result = op === "×" ? m + n : m - n; if (result <= 0 || result > 100) throw 0; return { q: `Simplify x^${m} ${op} x^${n}, giving your answer as x^? — what is the index?`, a: result }; },
    M568: () => { const factor = randInt(2, 9), sa = randInt(1, 9), sb = randInt(1, 9); if (sa === sb) throw 0; return { q: `Simplify the fraction ${factor * sa}/${factor * sb} by cancelling the common factor of ${factor}. What is the numerator of the simplified fraction?`, a: sa }; },

    // ============================================================ Y8 — Equations
    M401: () => { const b = randInt(2, 9), a = randInt(-20, 20), c = randInt(-15, 15), x = c * b - a; need(x); return { q: `Solve for x: (x ${signed(a)}) / ${b} = ${c}`, a: x }; },
    M902: () => { const k = randInt(2, 9), inner = randInt(-20, 20), x = randInt(0, 100); return { q: `Solve for x: ${k}(x ${signed(inner)}) = ${k * (x + inner)}`, a: x }; },
    M554: () => { const a = randInt(2, 9), c = randInt(1, a - 1), x = randInt(0, 100), b = randInt(-50, 50), d = (a - c) * x + b; return { q: `Solve for x: ${a}x ${signed(b)} = ${c}x ${signed(d)}`, a: x }; },
    M387: () => { const b = randInt(1, 9) * choice([1, -1]), x = randInt(1, 100); return { q: `Solve for x: ${b * x}/x = ${b}`, a: x }; },
    M957: () => { const m = randInt(2, 9), x = randInt(0, 100), add = randInt(-50, 50); return { q: `I think of a number, multiply it by ${m}, then ${add >= 0 ? "add " + add : "subtract " + Math.abs(add)}. The result is ${m * x + add}. What was the number?`, a: x }; },

    // ============================================================ Y8 — Sequences
    M381: () => { const step = randInt(1, 9), maxStart = 100 - 4 * step; if (maxStart < 0) throw 0; const start = randInt(0, maxStart); return { q: `What is the next term in this sequence? ${start}, ${start + step}, ${start + 2 * step}, ${start + 3 * step}, ...`, a: start + 4 * step }; },
    M241: () => { const step = randInt(2, 9), maxStart = 100 - 3 * step; if (maxStart < 1) throw 0; const start = randInt(1, maxStart); return { q: `A pattern has ${start}, ${start + step}, ${start + 2 * step} dots in its first three terms, increasing by the same amount each time. How many dots will the 4th term have?`, a: start + 3 * step }; },
    M166: () => { const target = randInt(0, 100), m = randInt(2, 9), n = randInt(1, 15), c = target - m * n; return { q: `The nth term of a sequence is ${m}n ${signed(c)}. What is the ${ordinalSuffix(n)} term?`, a: target }; },
    M991: () => { const m = randInt(2, 9), start = randInt(1, 20), terms = [start, start + m, start + 2 * m, start + 3 * m], n = randInt(5, 10), nthTerm = start + (n - 1) * m; if (nthTerm > 100) throw 0; return { q: `A sequence begins ${terms.join(", ")}, ... continuing with the same common difference. What is the ${ordinalSuffix(n)} term?`, a: nthTerm }; },
    M866: () => { const m = randInt(2, 9), c = randInt(0, 15), start = m + c, terms = [start, start + m, start + 2 * m], n = randInt(5, 10), nthTerm = m * n + c; if (nthTerm > 100) throw 0; return { q: `A pattern has ${terms.join(", ")} tiles in its first three terms, growing by the same number of tiles each time. How many tiles will the ${ordinalSuffix(n)} term have?`, a: nthTerm }; },

    // ============================================================ Y9 — Fractions and percentages
    U888: () => { const pct = randInt(1, 100); if (Math.random() < 0.5) return { q: `Write ${pct / 100} as a percentage.`, a: pct }; const [n, d] = simplifyFraction(pct, 100); return { q: `Write ${n}/${d} as a percentage.`, a: pct }; },
    U594: () => {
      const vals = new Set(); while (vals.size < 4) vals.add(randInt(5, 95));
      const arr = [...vals];
      const displays = arr.map((p) => { const form = choice(["pct", "dec", "frac"]); if (form === "pct") return `${p}%`; if (form === "dec") return `${(p / 100).toFixed(2)}`; const [n, d] = simplifyFraction(p, 100); return `${n}/${d}`; });
      const askMax = Math.random() < 0.5;
      return { q: `Which of these is ${askMax ? "the largest" : "the smallest"}? ${displays.join(", ")}   (give your answer as a percentage)`, a: askMax ? Math.max(...arr) : Math.min(...arr) };
    },
    U881: () => { const d = choice([2, 3, 4, 5, 6, 8, 10]), n = randInt(1, d - 1), k = randInt(1, 10), base = d * k, val = n * k; return { q: `Find ${n}/${d} of ${base} (no calculator).`, a: val }; },
    U916: () => { const val = randInt(0, 100), d = randInt(2, 12), n = randInt(1, d - 1), base = roundTo(val * d / n, 2); if (Math.round(base * n / d) !== val) throw 0; return { q: `Find ${n}/${d} of ${base} using a calculator.`, a: val }; },
    U554: () => { const k = randInt(1, 10), m = randInt(1, 10); return { q: `Find ${5 * m}% of ${20 * k} (no calculator).`, a: k * m }; },
    U349: () => { const target = randInt(0, 100), pct = randDecimal(1, 100, 1), base = roundTo(target * 100 / pct, 2); if (Math.round(base * pct / 100) !== target) throw 0; return { q: `Find ${pct}% of ${base} using a calculator.`, a: target }; },
    U773: () => { const k = randInt(1, 5), m = randInt(1, 10), base = 20 * k, pct = 5 * m, change = k * m, inc = Math.random() < 0.5, result = inc ? base + change : base - change; if (result < 0 || result > 100) throw 0; return { q: `${base} is ${inc ? "increased" : "decreased"} by ${pct}% (no calculator). What is the new amount?`, a: result }; },
    U671: () => { const target = randInt(0, 100), pct = randDecimal(1, 50, 1), inc = Math.random() < 0.5; const base = roundTo(inc ? target / (1 + pct / 100) : target / (1 - pct / 100), 2); if (base <= 0) throw 0; const check = Math.round(inc ? base + base * pct / 100 : base - base * pct / 100); if (check !== target) throw 0; return { q: `${base} is ${inc ? "increased" : "decreased"} by ${pct}% (calculator allowed). What is the new amount?`, a: target }; },
    U286: () => { const original = randInt(1, 100), pct = choice([5, 10, 15, 20, 25, 30, 40, 50]), inc = Math.random() < 0.5, changed = roundTo(original * (inc ? 1 + pct / 100 : 1 - pct / 100), 2); return { q: `After a ${pct}% ${inc ? "increase" : "decrease"}, a value is ${changed}. What was the original value?`, a: original }; },
    U278: () => { const original = choice([20, 25, 40, 50, 60, 80, 100]), pct = choice([5, 10, 15, 20, 25, 30, 40, 50]), inc = Math.random() < 0.5, changed = inc ? original * (1 + pct / 100) : original * (1 - pct / 100); return { q: `A value changes from ${original} to ${roundTo(changed, 2)}. What is the percentage ${inc ? "increase" : "decrease"}?`, a: pct }; },
    U533: () => { const principal = choice([100, 200, 300, 400, 500]), rate = choice([1, 2, 3, 4, 5]), years = randInt(1, 4), interest = (principal / 100) * rate * years; if (interest > 100) throw 0; return { q: `Calculate the simple interest earned on £${principal} at ${rate}% per year for ${years} year${years > 1 ? "s" : ""}.`, a: interest }; },

    // ============================================================ Y9 — Probability
    U166: () => { const pDen = randInt(2, 10), pNum = randInt(1, pDen - 1), k = randInt(1, 10), trials = pDen * k; if (trials > 100) throw 0; return { q: `The probability of an event is ${pNum}/${pDen}. How many times would you expect it to happen in ${trials} trials?`, a: pNum * k }; },
    U580: () => { const total = choice([4, 5, 10, 20, 25, 50, 100]), successes = randInt(1, total - 1), pct = successes / total * 100; if (!Number.isInteger(pct)) throw 0; return { q: `An experiment is repeated ${total} times and is successful ${successes} times. What is the experimental probability of success, as a percentage?`, a: pct }; },
    U280: () => { const total = choice([40, 50, 60, 80, 100]), part = randInt(1, total - 1); return { q: `In a frequency tree, ${total} people were surveyed and ${part} of them said yes. How many said no?`, a: total - part }; },

    // ============================================================ Y9 — Standard form
    U264: () => {
      if (choice(["×", "÷"]) === "×") { const a = randInt(1, 4), b = randInt(1, Math.floor(9 / a)), aExp = randInt(1, 6), bExp = randInt(1, 6); return { q: `(${a} × 10^${aExp}) × (${b} × 10^${bExp}) = ? × 10^${aExp + bExp}. What number replaces the ?`, a: a * b }; }
      const b = randInt(1, 9), coeff = randInt(1, Math.max(1, Math.floor(9 / b))), a = b * coeff, bExp = randInt(1, 4), aExp = bExp + randInt(1, 4);
      return { q: `(${a} × 10^${aExp}) ÷ (${b} × 10^${bExp}) = ? × 10^${aExp - bExp}. What number replaces the ?`, a: coeff };
    },
    U290: () => {
      const exp = randInt(1, 10), a = randInt(1, 9), b = randInt(1, Math.max(1, 9 - a));
      if (choice(["+", "-"]) === "+") return { q: `(${a} × 10^${exp}) + (${b} × 10^${exp}) = ? × 10^${exp}. What number replaces the ?`, a: a + b };
      const hi = Math.max(a, b), lo = Math.min(a, b); if (hi === lo) throw 0;
      return { q: `(${hi} × 10^${exp}) - (${lo} × 10^${exp}) = ? × 10^${exp}. What number replaces the ?`, a: hi - lo };
    },
    U161: () => { const coeff = roundTo(randDecimal(1, 9.9, 1), 1), exp = randInt(-4, 8), value = parseFloat((coeff * Math.pow(10, exp)).toPrecision(10)); return { q: `${value} is written in standard form as a × 10^${exp}. What is a × 10? (e.g. if a = 3.2, the answer is 32)`, a: Math.round(coeff * 10) }; },

    // ============================================================ Y9 — Inequalities
    U738: () => {
      const a = randInt(3, 9), c = randInt(1, a - 1), x0 = randInt(0, 80), b = randInt(0, 15), d = (a - c) * x0 + b, ineq = choice([">", ">=", "<", "<="]);
      let ans, phrase;
      if (ineq === ">") { ans = x0 + 1; phrase = "smallest integer value"; }
      else if (ineq === ">=") { ans = x0; phrase = "smallest integer value"; }
      else if (ineq === "<") { ans = x0 - 1; phrase = "largest integer value"; }
      else { ans = x0; phrase = "largest integer value"; }
      need(ans);
      return { q: `Solve: ${a}x ${signed(b)} ${ineq} ${c}x ${signed(d)}. What is the ${phrase} of x that satisfies this?`, a: ans };
    },
    U145: () => { const m = randInt(2, 6), c = randInt(0, 15), xlo = randInt(0, 30), xhi = xlo + randInt(1, 8); return { q: `Solve: ${m * xlo + c} < ${m}x ${signed(c)} < ${m * xhi + c}. What is the smallest integer value of x that satisfies this?`, a: xlo + 1 }; },
    U337: () => { const m = randInt(2, 9), n = randInt(2, 20), bound = m * n; return { q: `${m} times a number is greater than ${bound}. What is the smallest possible integer value of the number?`, a: n + 1 }; },

    // ============================================================ Y9 — Quadratic equations
    U178: () => { const p = randInt(1, 12), q = randInt(1, 12), b = p + q, c = p * q; return { q: `x² + ${b}x + ${c} factorises to (x + ${p})(x + ?). What replaces the ?`, a: q }; },
    U963: () => { const n = randInt(2, 10); return { q: `Factorise x² - ${n * n}, giving your answer as (x + a)(x - a). What is a?`, a: n }; },
    U228: () => { let p = randInt(1, 12), q = randInt(1, 12); if (p === q) throw 0; const b = -(p + q), c = p * q; return { q: `Solve: x² ${signed(b)}x + ${c} = 0. What is the larger solution for x?`, a: Math.max(p, q) }; },

    // ============================================================ Y9 — Formulae
    U675: () => {
      const a = randInt(2, 20), x = randInt(0, 80), type = choice(["add", "sub", "mul", "div"]);
      if (type === "add") return { q: `y = x + ${a}. If y = ${x + a}, what is x?`, a: x };
      if (type === "sub") { const y = x - a; if (y < 0) throw 0; return { q: `y = x - ${a}. If y = ${y}, what is x?`, a: x }; }
      if (type === "mul") return { q: `y = ${a}x. If y = ${a * x}, what is x?`, a: x };
      const y = x / a; if (!Number.isInteger(y)) throw 0; return { q: `y = x/${a}. If y = ${y}, what is x?`, a: x };
    },
    U181: () => {
      const a = randInt(2, 9), b = randInt(1, 20), x = randInt(0, 80);
      if (choice(["linear", "frac"]) === "linear") return { q: `y = ${a}x + ${b}. If y = ${a * x + b}, what is x?`, a: x };
      const y = (x + b) / a; if (!Number.isInteger(y)) throw 0; return { q: `y = (x + ${b})/${a}. If y = ${y}, what is x?`, a: x };
    },
    U191: () => { const a = randInt(2, 9), b = randInt(1, 9), x = randInt(0, 80); return { q: `y = ${a}x + ${b}x. If y = ${(a + b) * x}, what is x?`, a: x }; },

    // ============================================================ Y9 — Constructions (adapted to numeric answers)
    U787: () => { const angle = randInt(2, 90) * 2; return { q: `An angle of ${angle}° is bisected using a pair of compasses. What is the size of each new angle?`, a: angle / 2 }; },
    U245: () => { let a = randInt(0, 50), c = randInt(0, 50); if ((a + c) % 2 !== 0) c += c < 50 ? 1 : -1; if (a === c) throw 0; const y1 = randInt(0, 50), y2 = randInt(0, 50); return { q: `A perpendicular bisector is drawn for the line segment joining (${Math.min(a, c)}, ${y1}) and (${Math.max(a, c)}, ${y2}). What is the x-coordinate of the midpoint?`, a: (a + c) / 2 }; },

    // ============================================================ Y9 — Circles
    U221: () => { const r = randInt(3, 15), angle = choice([30, 45, 60, 90, 120, 150, 180, 270]), arc = 2 * Math.PI * r * (angle / 360); if (arc > 100) throw 0; return { q: `Find the arc length of a sector with radius ${r} cm and angle ${angle}°, to the nearest whole number (use π).`, a: Math.round(arc) }; },
    U373: () => { const r = randInt(2, 6), angle = choice([30, 45, 60, 90, 120, 150, 180, 270]), area = Math.PI * r * r * (angle / 360); if (area > 100) throw 0; return { q: `Find the area of a sector with radius ${r} cm and angle ${angle}°, to the nearest whole number (use π).`, a: Math.round(area) }; },
    U464: () => { const r = randInt(1, 3), h = randInt(1, 10), sa = 2 * Math.PI * r * (r + h); if (sa > 100) throw 0; return { q: `Find the surface area of a cylinder with radius ${r} cm and height ${h} cm, to the nearest whole number (use π).`, a: Math.round(sa) }; },
    U915: () => { const r = randInt(1, 3), h = randInt(1, 15), vol = Math.PI * r * r * h; if (vol > 100) throw 0; return { q: `Find the volume of a cylinder with radius ${r} cm and height ${h} cm, to the nearest whole number (use π).`, a: Math.round(vol) }; },

    // ============================================================ Y10 — Percentages
    U332: () => { const principal = choice([100, 200, 300]), rate = choice([2, 3, 4, 5]), years = randInt(1, 3), amount = principal * Math.pow(1 + rate / 100, years) - principal; if (amount > 100) throw 0; return { q: `£${principal} is invested at ${rate}% compound interest per year. How much interest (to the nearest £) has it earned after ${years} year${years > 1 ? "s" : ""}?`, a: Math.round(amount) }; },
    U988: () => { const start = choice([20, 30, 40, 50]), rate = choice([2, 3, 5, 8, 10]), grow = Math.random() < 0.5, years = randInt(1, 3), result = start * Math.pow(1 + (grow ? 1 : -1) * rate / 100, years); if (result < 0 || result > 100) throw 0; return { q: `A population of ${start} ${grow ? "grows" : "decays"} by ${rate}% per year. What will it be after ${years} year${years > 1 ? "s" : ""}, to the nearest whole number?`, a: Math.round(result) }; },

    // ============================================================ Y10 — Surface area and volume
    U871: () => { const base = randInt(2, 5), slant = randInt(2, 6), sa = base * base + 2 * base * slant; if (sa > 100) throw 0; return { q: `Find the surface area of a square-based pyramid with base length ${base} cm and slant height ${slant} cm.`, a: sa }; },
    U523: () => { const r = randInt(1, 3), l = randInt(r + 1, r + 6), sa = Math.PI * r * (r + l); if (sa > 100) throw 0; return { q: `Find the surface area of a cone with radius ${r} cm and slant height ${l} cm, to the nearest whole number (use π).`, a: Math.round(sa) }; },
    U893: () => { const r = randInt(1, 3), sa = 4 * Math.PI * r * r; if (sa > 100) throw 0; return { q: `Find the surface area of a sphere with radius ${r} cm, to the nearest whole number (use π).`, a: Math.round(sa) }; },
    U334: () => { const R = randInt(2, 4), r = randInt(1, R - 1), l = randInt(2, 5), sa = Math.PI * (R + r) * l + Math.PI * R * R + Math.PI * r * r; if (sa > 100) throw 0; return { q: `A frustum has circular ends of radius ${R} cm and ${r} cm, and slant height ${l} cm. Find its total surface area, to the nearest whole number (use π).`, a: Math.round(sa) }; },
    U561: () => { const L = randInt(3, 6), W = randInt(2, 4), H1 = randInt(1, 2), l = randInt(1, Math.max(1, L - 2)), w = randInt(1, Math.max(1, W - 2)), H2 = randInt(1, 2), sa = 2 * H1 * (L + W) + 2 * L * W + 2 * H2 * (l + w); if (sa > 100) throw 0; return { q: `A step-shaped solid is made from a ${L}×${W}×${H1} cm cuboid with a ${l}×${w}×${H2} cm cuboid stacked centrally on top. Find the total surface area.`, a: sa }; },
    U484: () => { const base = randInt(2, 5), h = randInt(2, 8), vol = (1 / 3) * base * base * h; if (vol > 100) throw 0; return { q: `Find the volume of a square-based pyramid with base length ${base} cm and height ${h} cm, to the nearest whole number.`, a: Math.round(vol) }; },
    U116: () => { const r = randInt(1, 3), h = randInt(2, 10), vol = (1 / 3) * Math.PI * r * r * h; if (vol > 100) throw 0; return { q: `Find the volume of a cone with radius ${r} cm and height ${h} cm, to the nearest whole number (use π).`, a: Math.round(vol) }; },
    U617: () => { const r = randInt(1, 3), vol = (4 / 3) * Math.PI * Math.pow(r, 3); if (vol > 100) throw 0; return { q: `Find the volume of a sphere with radius ${r} cm, to the nearest whole number (use π).`, a: Math.round(vol) }; },
    U350: () => {
      const R = randInt(3, 6), Hbig = randInt(4, 8), [num, den] = choice([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]);
      if ((R * num) % den !== 0 || (Hbig * num) % den !== 0) throw 0;
      const r = R * num / den, Hsmall = Hbig * num / den;
      if (Hsmall === Hbig || r === R) throw 0;
      const vol = (1 / 3) * Math.PI * R * R * Hbig - (1 / 3) * Math.PI * r * r * Hsmall;
      if (vol > 100 || vol < 0) throw 0;
      return { q: `A frustum is formed by removing a cone of height ${Hsmall} cm and radius ${r} cm from a similar cone of height ${Hbig} cm and radius ${R} cm. Find the volume of the frustum, to the nearest whole number (use π).`, a: Math.round(vol) };
    },
    U543: () => { const L = randInt(2, 5), W = randInt(2, 4), H1 = randInt(1, 3), l = randInt(1, Math.max(1, L - 1)), w = randInt(1, Math.max(1, W - 1)), H2 = randInt(1, 3), vol = L * W * H1 + l * w * H2; if (vol > 100) throw 0; return { q: `A step-shaped solid is made from a ${L}×${W}×${H1} cm cuboid with a ${l}×${w}×${H2} cm cuboid stacked centrally on top. Find the total volume.`, a: vol }; },

    // ============================================================ Y10 — Simultaneous equations
    U760: () => { const x = randInt(0, 50), y = randInt(0, 50), a = randInt(1, 9), b = randInt(1, 9), c = randInt(1, 9), d = randInt(1, 9); if (a * d === b * c) throw 0; return { q: `Solve simultaneously: ${a}x + ${b}y = ${a * x + b * y}  and  ${c}x + ${d}y = ${c * x + d * y}. What is x?`, a: x }; },
    U757: () => { const m = randInt(1, 6), c = randInt(-20, 20), a = randInt(1, 9), b = randInt(1, 9), x = randInt(0, 50), y = m * x + c; if (a + b * m === 0) throw 0; return { q: `Solve simultaneously: y = ${m}x ${signed(c)}  and  ${a}x + ${b}y = ${a * x + b * y}. What is x?`, a: x }; },
    U836: () => { const m1 = randInt(-5, 5) || 1, m2 = randInt(-5, 5); if (m1 === m2) throw 0; const x0 = randInt(0, 50), c1 = randInt(-20, 20), c2 = c1 + (m1 - m2) * x0; return { q: `The lines y = ${m1}x ${signed(c1)} and y = ${m2}x ${signed(c2)} are graphed. What is the x-coordinate where they intersect?`, a: x0 }; },
    U137: () => { const x = randInt(1, 50), y = randInt(1, 50); if (x === y) throw 0; return { q: `Two numbers have a sum of ${x + y} and a difference of ${Math.abs(x - y)}. What is the larger number?`, a: Math.max(x, y) }; },

    // ============================================================ Y10 — Trigonometry
    U605: () => { const func = choice(["sin", "cos", "tan"]), angle = func === "tan" ? choice([0, 30, 45]) : choice([0, 30, 45, 60, 90]), rad = angle * Math.PI / 180, val = func === "sin" ? Math.sin(rad) : func === "cos" ? Math.cos(rad) : Math.tan(rad); return { q: `What is ${func}(${angle}°), as a percentage, to the nearest whole number?`, a: Math.round(val * 100) }; },
    U283: () => { const angle = randInt(20, 70), hyp = randInt(10, 90), func = choice(["sin", "cos"]), rad = angle * Math.PI / 180, side = func === "sin" ? hyp * Math.sin(rad) : hyp * Math.cos(rad), rounded = Math.round(side); if (rounded < 0 || rounded > 100) throw 0; return { q: `A right-angled triangle has hypotenuse ${hyp} cm and one angle ${angle}°. Find the length of the side ${func === "sin" ? "opposite" : "adjacent"} to this angle, to the nearest whole number.`, a: rounded }; },
    U545: () => { const opp = randInt(3, 50), adj = randInt(3, 50); return { q: `A right-angled triangle has the side opposite an angle measuring ${opp} cm, and the side adjacent to it measuring ${adj} cm. Find the angle, to the nearest whole number.`, a: Math.round(Math.atan(opp / adj) * 180 / Math.PI) }; },
    U627: () => { const table = [["sin", 0, 0], ["sin", 30, 50], ["sin", 45, 71], ["sin", 60, 87], ["sin", 90, 100], ["cos", 0, 100], ["cos", 30, 87], ["cos", 45, 71], ["cos", 60, 50], ["cos", 90, 0], ["tan", 0, 0], ["tan", 30, 58], ["tan", 45, 100]]; const [func, angle, pct] = choice(table); return { q: `Without using a calculator, what is ${func}(${angle}°) as a percentage, to the nearest whole number?`, a: pct }; },
    U967: () => { const dist = randInt(10, 100), height = randInt(5, 90); return { q: `From a point ${dist} m from the base of a tower, the angle of elevation to the top is measured. If the tower is ${height} m tall, what is the angle of elevation, to the nearest whole number?`, a: Math.round(Math.atan(height / dist) * 180 / Math.PI) }; },
    U164: () => { const dist = randInt(10, 90), bearing = choice([30, 45, 60]), north = dist * Math.cos(bearing * Math.PI / 180), rounded = Math.round(north); if (rounded < 0 || rounded > 100) throw 0; return { q: `A ship sails ${dist} km on a bearing of ${String(bearing).padStart(3, "0")}°. How far north has it travelled, to the nearest whole number?`, a: rounded }; },

    // ============================================================ Y10 — Constructions
    U820: () => { const r = randInt(2, 5); return { q: `A goat is tied to a post by a rope ${r} m long in an open field. What area of field can it graze, to the nearest whole number (use π)?`, a: Math.round(Math.PI * r * r) }; },

    // ============================================================ Y11 — Factors, multiples and primes
    U751: () => { const a = randInt(2, 20), b = randInt(2, 20), lcm = (a * b) / U.gcd(a, b); if (lcm > 100 || lcm < 1) throw 0; return { q: `Find the lowest common multiple (LCM) of ${a} and ${b}.`, a: lcm }; },
    U529: () => { const a = randInt(4, 100), b = randInt(4, 100); return { q: `Find the highest common factor (HCF) of ${a} and ${b}.`, a: U.gcd(a, b) }; },
    U739: () => {
      const primes = [2, 3, 5, 7, 11, 13], count = randInt(2, 4);
      const factors = []; for (let i = 0; i < count; i++) factors.push(choice(primes));
      const num = factors.reduce((a, b) => a * b, 1), sum = factors.reduce((a, b) => a + b, 0);
      if (sum > 100) throw 0;
      return { q: `${num} is written as a product of its prime factors. What is the sum of all its prime factors (counting repeats)?`, a: sum };
    },
    U250: () => {
      const primes = [2, 3, 5];
      const expA = primes.map(() => randInt(0, 2)), expB = primes.map(() => randInt(0, 2));
      const lcmExp = expA.map((e, i) => Math.max(e, expB[i]));
      const lcm = primes.reduce((acc, p, i) => acc * Math.pow(p, lcmExp[i]), 1);
      if (lcm > 100 || lcm < 2) throw 0;
      const describe = (exps) => primes.map((p, i) => (exps[i] > 0 ? (exps[i] === 1 ? `${p}` : `${p}^${exps[i]}`) : null)).filter(Boolean).join(" × ") || "1";
      return { q: `a = ${describe(expA)} and b = ${describe(expB)} (written as products of prime factors). Find the LCM of a and b.`, a: lcm };
    },

    // ============================================================ Y11 — Fractions
    U439: () => {
      const mixed = [], used = new Set();
      while (mixed.length < 4) {
        const whole = randInt(0, 4), den = choice([2, 3, 4, 5, 8]), n = randInt(1, den - 1), val = whole + n / den, key = val.toFixed(3);
        if (used.has(key)) continue;
        used.add(key); mixed.push({ label: whole > 0 ? `${whole} ${n}/${den}` : `${n}/${den}`, val });
      }
      const threshold = choice([1, 1.5, 2, 2.5, 3]);
      return { q: `Here are four mixed numbers: ${mixed.map((m) => m.label).join(", ")}. How many of them are greater than ${threshold}?`, a: mixed.filter((m) => m.val > threshold).length };
    },
    U793: () => {
      const den = choice([2, 3, 4, 5, 6, 8]), n1 = randInt(1, den - 1);
      if (choice(["add", "sub"]) === "add") {
        const w1 = randInt(1, 20), w2 = randInt(1, 20), n2 = den - n1, total = w1 + w2 + 1;
        if (total > 100) throw 0;
        return { q: `${w1} ${n1}/${den} + ${w2} ${n2}/${den} = ?`, a: total };
      }
      const w2 = randInt(1, 20), w1 = randInt(1, 20), bigWhole = w1 + w2;
      if (bigWhole > 100) throw 0;
      return { q: `${bigWhole} ${n1}/${den} - ${w1} ${n1}/${den} = ?`, a: w2 };
    },
    U224: () => {
      const den = choice([2, 3, 4, 5]), n = randInt(1, den - 1), w = randInt(1, 10), m = randInt(1, 8), k = den * m;
      const product = (w + n / den) * k;
      if (!Number.isInteger(product) || product > 100 || product < 0) throw 0;
      return { q: `${w} ${n}/${den} × ${k} = ?`, a: Math.round(product) };
    },
    U538: () => { const den = choice([2, 3, 4, 5]), n = randInt(1, den - 1), w = randInt(1, 15), result = w * den + n; if (result > 100) throw 0; return { q: `${w} ${n}/${den} ÷ 1/${den} = ?`, a: result }; },

    // ============================================================ Y11 — Expressions
    U662: () => { const a = randInt(2, 8), b = randInt(1, 6), c = randInt(1, 5), result = a + b - c; if (result <= 0 || result > 100) throw 0; return { q: `Simplify x^${a} × x^${b} ÷ x^${c}, giving your answer as x^? — what is the index?`, a: result }; },
    U103: () => { const factor = randInt(2, 9), sa = randInt(1, 9), sb = randInt(1, 9); if (sa === sb) throw 0; return { q: `Simplify the algebraic fraction ${factor * sa}x/${factor * sb} by cancelling common factors. What is the denominator of the simplified fraction?`, a: sb }; },

    // ============================================================ Y11 — Equations
    U325: () => { const a = randInt(2, 9), x = randInt(0, 100), b = randInt(-50, 50); return { q: `Solve for x: ${a}x ${signed(b)} = ${a * x + b}`, a: x }; },
    U870: () => { const k = randInt(2, 9), inner = randInt(-15, 15), m = randInt(1, k - 1), x = randInt(0, 80), lhs = k * (x + inner), n = lhs - m * x; return { q: `Solve for x: ${k}(x ${signed(inner)}) = ${m}x ${signed(n)}`, a: x }; },
    U505: () => { const c = randInt(1, 9) * choice([1, -1]), x = randInt(0, 100), b = randInt(-20, 20); if (x + b === 0) throw 0; return { q: `Solve for x: ${c * (x + b)}/(x ${signed(b)}) = ${c}`, a: x }; },
    U599: () => { const w = randInt(0, 80), m = randInt(2, 9), add = randInt(-40, 40); return { q: `A rectangle's length is ${m} times its width, ${add >= 0 ? "plus " + add : "minus " + Math.abs(add)} cm. If the length is ${m * w + add} cm, what is the width, w (in cm)?`, a: w }; },
    U601: () => { const p = randInt(1, 12), q = randInt(1, 12); if (p === q) throw 0; const coeffX = -(p + q), c = p * q; return { q: `The graph of y = x² ${signed(coeffX)}x + ${c} crosses the x-axis at two points. What is the larger x-intercept?`, a: Math.max(p, q) }; },

    // ============================================================ Y11 — Angles
    U655: () => {
      if (Math.random() < 0.5) { const a = randInt(10, 90), b = randInt(10, 90), x = 180 - a - b; if (x < 1 || x > 100) throw 0; return { q: `Three angles lie on a straight line: ${a}°, ${b}°, and x°. What is x?`, a: x }; }
      const a = randInt(10, 150), b = randInt(10, 150), c = randInt(10, 150), x = 360 - a - b - c;
      if (x < 1 || x > 100) throw 0;
      return { q: `Four angles meet at a point: ${a}°, ${b}°, ${c}°, and x°. What is x?`, a: x };
    },
    U826: () => {
      const angle = randInt(10, 170), type = choice(["corresponding", "alternate", "co-interior"]);
      if (type === "co-interior") { const other = 180 - angle; if (other < 1 || other > 100) throw 0; return { q: `Two parallel lines are cut by a transversal. One co-interior angle is ${angle}°. What is the other co-interior angle?`, a: other }; }
      if (angle > 100) throw 0;
      return { q: `Two parallel lines are cut by a transversal. One angle is ${angle}°. What is its ${type} angle (which is equal to it)?`, a: angle };
    },
    U329: () => { const a = randInt(10, 150), b = randInt(10, 150), c = randInt(10, 150), x = 360 - a - b - c; if (x < 1 || x > 100) throw 0; return { q: `A quadrilateral has angles ${a}°, ${b}°, ${c}°, and x°. What is x?`, a: x }; },
    U427: () => { const n = choice([4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40]); return { q: `A regular polygon has ${n} sides. What is the size of each exterior angle?`, a: 360 / n }; },

  // ---------------------------------------------------------------- Y7 (SOW additions)
  M813() {
      const type = choice(["mul_const", "mul_two", "square", "div_const"]);
      if (type === "mul_const") { const k = randInt(2, 10), v = randInt(1, 10); return { q: `In algebraic notation, ${k}n means ${k} × n. If n = ${v}, what is ${k}n?`, a: need(k * v) }; }
      if (type === "mul_two") { const x = randInt(1, 10), y = randInt(1, 10); return { q: `ab means a × b. If a = ${x} and b = ${y}, what is ab?`, a: need(x * y) }; }
      if (type === "square") { const n = randInt(2, 10); return { q: `n² means n × n. If n = ${n}, what is n²?`, a: need(n * n) }; }
      const k = randInt(2, 10), v = randInt(1, 10);
      return { q: `n/${k} means n ÷ ${k}. If n = ${k * v}, what is n/${k}?`, a: v };
    },
  M830() {
      const numVarTerms = randInt(1, 3);
      const vars = shuffle(["x", "y", "z"]).slice(0, numVarTerms);
      const coeffOf = {};
      const terms = vars.map((v) => { const c = randInt(1, 12); coeffOf[v] = c; return `${c}${v}`; });
      const hasConstant = Math.random() < 0.6;
      let constant = null;
      if (hasConstant) { constant = randInt(1, 20); terms.push(`${constant}`); }
      const expr = terms.join(" + ");
      const numTerms = terms.length;
      const askType = choice(hasConstant ? ["count", "coeff", "constant"] : ["count", "coeff"]);
      if (askType === "count") return { q: `How many terms are there in the expression ${expr}?`, a: numTerms };
      if (askType === "coeff") { const v = choice(vars); return { q: `What is the coefficient of ${v} in the expression ${expr}?`, a: coeffOf[v] }; }
      return { q: `What is the constant term in the expression ${expr}?`, a: constant };
    },
  M795() {
      const v = choice(["x", "y", "n"]);
      const numTerms = randInt(2, 3);
      const coeffs = [randInt(1, 15)];
      for (let i = 1; i < numTerms; i++) coeffs.push(randInt(1, 15) * choice([1, -1]));
      const total = coeffs.reduce((a, b) => a + b, 0);
      if (total <= 0 || total > 100) throw 0;
      const expr = coeffs.map((c, i) => (i === 0 ? `${c}${v}` : `${signed(c)}${v}`)).join(" ");
      return { q: `Simplify: ${expr}. Give your answer in the form ?${v} — what number replaces the ?`, a: total };
    },
  M531() {
      const [v1, v2] = shuffle(["x", "y", "z"]).slice(0, 2);
      const numTerms = randInt(3, 4);
      const terms = [];
      let coeff1 = 0, coeff2 = 0;
      for (let i = 0; i < numTerms; i++) {
        const useV1 = Math.random() < 0.5;
        const c = randInt(1, 12);
        const v = useV1 ? v1 : v2;
        if (useV1) coeff1 += c; else coeff2 += c;
        terms.push(i === 0 ? `${c}${v}` : `+ ${c}${v}`);
      }
      if (coeff1 === 0 || coeff2 === 0 || coeff1 > 100 || coeff2 > 100) throw 0;
      const expr = terms.join(" ");
      const askV1 = Math.random() < 0.5;
      return { q: `Simplify: ${expr}. What is the coefficient of ${askV1 ? v1 : v2} in the simplified expression?`, a: askV1 ? coeff1 : coeff2 };
    },
  M949() {
      const kind = choice(["x2", "xy"]);
      const label = kind === "x2" ? "x²" : "xy";
      const numTerms = randInt(2, 3);
      const coeffs = [randInt(1, 10)];
      for (let i = 1; i < numTerms; i++) coeffs.push(randInt(1, 10) * choice([1, -1]));
      const total = coeffs.reduce((a, b) => a + b, 0);
      if (total <= 0 || total > 100) throw 0;
      const expr = coeffs.map((c, i) => (i === 0 ? `${c}${label}` : `${signed(c)}${label}`)).join(" ");
      return { q: `Simplify: ${expr}. Give your answer in the form ?${label} — what number replaces the ?`, a: total };
    },
  M417() {
      const op = choice(["add", "sub", "mul", "div"]);
      const v = choice(["x", "n"]);
      if (op === "add") { const val = randInt(0, 90), k = randInt(1, 10); return { q: `If ${v} = ${val}, what is ${v} + ${k}?`, a: val + k }; }
      if (op === "sub") { const val = randInt(10, 100), k = randInt(1, val); return { q: `If ${v} = ${val}, what is ${v} - ${k}?`, a: val - k }; }
      if (op === "mul") { const val = randInt(1, 10), k = randInt(1, 10); return { q: `If ${v} = ${val}, what is ${k}${v}?`, a: val * k }; }
      const k = randInt(2, 10), val = randInt(1, 10) * k;
      return { q: `If ${v} = ${val}, what is ${v} ÷ ${k}?`, a: val / k };
    },
  M327() {
      const v = choice(["x", "n"]);
      const a = randInt(2, 9), b = randInt(-20, 20), val = randInt(0, 20);
      return { q: `If ${v} = ${val}, what is ${a}${v} ${signed(b)}?`, a: need(a * val + b) };
    },
  M208() {
      const type = choice(["sum", "diff", "mul"]);
      if (type === "sum") { const x = randInt(-20, 20), y = randInt(-20, 20); return { q: `If x = ${paren(x)} and y = ${paren(y)}, what is x + y?`, a: need(x + y) }; }
      if (type === "diff") { const x = randInt(-20, 20), y = randInt(-20, 20); return { q: `If x = ${paren(x)} and y = ${paren(y)}, what is x - y?`, a: need(x - y) }; }
      const x = randInt(-10, 10) || 3, y = randInt(1, 9);
      return { q: `If x = ${paren(x)}, what is ${y}x?`, a: need(x * y) };
    },
  M979() {
      const type = choice(["perimeter", "cost", "speed", "wage"]);
      if (type === "perimeter") { const l = randInt(1, 40), w = randInt(1, 40); const p = 2 * (l + w); if (p > 100) throw 0; return { q: `The perimeter of a rectangle is given by P = 2(l + w). If l = ${l} cm and w = ${w} cm, what is P, in cm?`, a: p }; }
      if (type === "cost") { const price = randInt(1, 20), qty = randInt(1, 10); const cost = price * qty; if (cost > 100) throw 0; return { q: `The total cost is given by C = pn, where p is the price per item (in £) and n is the number of items. If p = ${price} and n = ${qty}, what is C, in £?`, a: cost }; }
      if (type === "speed") { const t = choice([1, 2, 4, 5, 10]); const s = randInt(1, 20); const d = s * t; if (d > 100) throw 0; return { q: `Speed is given by S = D ÷ T. If a journey covers D = ${d} km in T = ${t} hours, what is the speed S, in km/h?`, a: s }; }
      const hours = randInt(1, 10), rate = randInt(1, 10); const wage = hours * rate; if (wage > 100) throw 0;
      return { q: `Wages are given by W = h × r, where h is hours worked and r is the hourly rate (in £). If h = ${hours} and r = ${rate}, what is W, in £?`, a: wage };
    },
  M707() {
      const op = choice(["add", "sub", "mul", "div"]);
      if (op === "add") { const x = randInt(0, 90), k = randInt(1, 10); return { q: `Solve: x + ${k} = ${x + k}`, a: x }; }
      if (op === "sub") { const x = randInt(1, 100), k = randInt(1, x); return { q: `Solve: x - ${k} = ${x - k}`, a: x }; }
      if (op === "mul") { const k = randInt(2, 9), x = randInt(0, 20); return { q: `Solve: ${k}x = ${k * x}`, a: x }; }
      const k = randInt(2, 9), m = randInt(0, 20), x = m * k;
      if (x > 100) throw 0;
      return { q: `Solve: x ÷ ${k} = ${m}`, a: x };
    },
  M634() {
      const a = randInt(2, 9), x = randInt(0, 100), b = randInt(-50, 50);
      return { q: `Solve for x: ${a}x ${signed(b)} = ${a * x + b}`, a: x };
    },
  M647() {
      const a = randInt(2, 9), m = randInt(0, 20), b = randInt(-20, 20);
      const x = a * m;
      if (x > 100) throw 0;
      return { q: `Solve for x: x/${a} ${signed(b)} = ${m + b}`, a: x };
    },
  M515() {
      const type = choice(["s_to_m", "m_to_h", "h_to_d", "y_to_mo"]);
      if (type === "s_to_m") {
        const m = choice([0, 1]), s = randInt(0, 59), total = m * 60 + s;
        if (total > 100) throw 0;
        const phrase = m === 0 ? `${s} seconds` : `1 minute and ${s} seconds`;
        return { q: `How many seconds are there in ${phrase}?`, a: total };
      }
      if (type === "m_to_h") {
        const h = choice([0, 1]), m = randInt(0, 59), total = h * 60 + m;
        if (total > 100) throw 0;
        const phrase = h === 0 ? `${m} minutes` : `1 hour and ${m} minutes`;
        return { q: `How many minutes are there in ${phrase}?`, a: total };
      }
      if (type === "h_to_d") { const h = randInt(0, 23); const total = 24 + h; const phrase = h === 1 ? "1 hour" : `${h} hours`; return { q: `How many hours are there in 1 day and ${phrase}?`, a: total }; }
      const y = randInt(1, 8); return { q: `How many months are there in ${y} years?`, a: y * 12 };
    },
  M892() {
      const h = randInt(1, 12), m = randInt(1, 59);
      const type = choice(["past", "to"]);
      const mm = String(m).padStart(2, "0");
      if (type === "past") return { q: `The time is ${h}:${mm}. How many minutes past ${h} o'clock is it?`, a: m };
      const to = 60 - m, nextH = h === 12 ? 1 : h + 1;
      return { q: `The time is ${h}:${mm}. How many minutes is it to ${nextH} o'clock?`, a: to };
    },
  M627() {
      const durMins = randInt(5, 95);
      const startTotal = randInt(0, 1439 - durMins);
      const endTotal = startTotal + durMins;
      const fmt = (t) => { const hh = Math.floor(t / 60), mm = t % 60; return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; };
      return { q: `A train departs at ${fmt(startTotal)} and arrives at ${fmt(endTotal)}. How many minutes does the journey take?`, a: durMins };
    },
  M963() {
      const startMin = randInt(0, 600);
      const interval = randInt(5, 30);
      const times = [startMin, startMin + interval, startMin + 2 * interval, startMin + 3 * interval];
      const fmt = (t) => { const hh = Math.floor(t / 60) % 24, mm = t % 60; return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`; };
      const idx = randInt(0, 2);
      return { q: `A bus timetable shows departures at ${times.map(fmt).join(", ")}. How many minutes do you wait between the ${ordinalSuffix(idx + 1)} and ${ordinalSuffix(idx + 2)} buses?`, a: times[idx + 1] - times[idx] };
    },
  M747() {
      const type = choice(["days_between", "years_to_months"]);
      if (type === "days_between") {
        const d1 = randInt(1, 20), span = randInt(1, 15), d2 = d1 + span;
        if (d2 > 31) throw 0;
        return { q: `In a month, today is the ${ordinalSuffix(d1)}. How many days until the ${ordinalSuffix(d2)} of the same month?`, a: span };
      }
      const y = randInt(1, 8);
      return { q: `How many months are there in ${y} years?`, a: y * 12 };
    },
  M828() {
      const items = [
        { desc: "the length of a pencil, in cm", correct: 15, wrongFactors: [0.1, 10, 100] },
        { desc: "the height of a classroom door, in cm", correct: 200, wrongFactors: [0.1, 10, 0.01] },
        { desc: "the mass of an apple, in g", correct: 100, wrongFactors: [0.01, 10, 100] },
        { desc: "the mass of a bag of sugar, in g", correct: 1000, wrongFactors: [0.001, 0.01, 100] },
        { desc: "the capacity of a mug of tea, in ml", correct: 250, wrongFactors: [0.01, 0.1, 10] },
        { desc: "the capacity of a bathtub, in litres", correct: 150, wrongFactors: [0.01, 0.1, 10] },
        { desc: "the mass of a family car, in kg", correct: 1200, wrongFactors: [0.001, 0.01, 10] },
        { desc: "the length of a football pitch, in m", correct: 100, wrongFactors: [0.1, 10, 0.01] },
      ];
      const item = choice(items);
      const options = shuffle([item.correct, ...item.wrongFactors.map((f) => Math.round(item.correct * f))]);
      if (new Set(options).size !== 4) throw 0;
      const idx = options.indexOf(item.correct) + 1;
      const list = options.map((v, i) => `${i + 1}) ${v}`).join("   ");
      return { q: `Which is the most sensible estimate for ${item.desc}? ${list}`, a: idx };
    },
  M774() {
      const type = choice(["cm_from_m", "g_from_kg", "ml_from_l", "mm_from_cm"]);
      if (type === "cm_from_m") { const cm = randInt(1, 99); return { q: `How many cm are there in ${cm / 100} m?`, a: cm }; }
      if (type === "g_from_kg") { const g = randInt(1, 99); return { q: `How many g are there in ${g / 1000} kg?`, a: g }; }
      if (type === "ml_from_l") { const ml = randInt(1, 99); return { q: `How many ml are there in ${ml / 1000} l?`, a: ml }; }
      const cmVal = randInt(1, 10), mm = cmVal * 10;
      return { q: `How many mm are there in ${cmVal} cm?`, a: mm };
    },
  M487() {
      const scenarios = [
        { desc: "the length of a pencil", correct: "cm", distractors: ["mm", "m", "km"] },
        { desc: "the distance from Leeds to London", correct: "km", distractors: ["mm", "cm", "m"] },
        { desc: "the mass of a bag of sugar", correct: "kg", distractors: ["mg", "g", "tonnes"] },
        { desc: "the mass of a shipping container", correct: "tonnes", distractors: ["mg", "g", "kg"] },
        { desc: "the capacity of a bathtub", correct: "litres", distractors: ["ml", "cl", "kl"] },
        { desc: "the capacity of a teaspoon", correct: "ml", distractors: ["litres", "cl", "kl"] },
        { desc: "the height of a classroom", correct: "m", distractors: ["mm", "cm", "km"] },
        { desc: "the thickness of a coin", correct: "mm", distractors: ["cm", "m", "km"] },
      ];
      const s = choice(scenarios);
      const options = shuffle([s.correct, ...s.distractors]);
      const idx = options.indexOf(s.correct) + 1;
      return { q: `Which unit would be most appropriate for measuring ${s.desc}? 1) ${options[0]}  2) ${options[1]}  3) ${options[2]}  4) ${options[3]}`, a: idx };
    },
  M814() {
      const type = choice(["bisect", "perp_angle", "parallel"]);
      if (type === "bisect") { const L = randInt(2, 50) * 2; return { q: `A line segment AB has length ${L} cm and is bisected at point M. What is the length of AM, in cm?`, a: L / 2 }; }
      if (type === "perp_angle") return { q: `Two lines are perpendicular to each other. What is the angle, in degrees, between them?`, a: 90 };
      return { q: `Two lines are parallel. If both are extended forever, will they ever meet? Answer 1 for yes or 0 for no.`, a: 0 };
    },
  M276() {
      const shapes = [["triangle", 3], ["quadrilateral", 4], ["pentagon", 5], ["hexagon", 6], ["heptagon", 7], ["octagon", 8], ["nonagon", 9], ["decagon", 10]];
      const [name, n] = choice(shapes);
      const article = "aeiou".includes(name[0]) ? "an" : "a";
      const askType = choice(["sides", "vertices", "diagonals"]);
      if (askType === "sides") return { q: `How many sides does ${article} ${name} have?`, a: n };
      if (askType === "vertices") return { q: `How many vertices does ${article} ${name} have?`, a: n };
      const diag = (n * (n - 3)) / 2;
      return { q: `How many diagonals does ${article} ${name} have?`, a: diag };
    },
  M523() {
      const shapes = [
        ["a square", 4, 4], ["a rectangle that isn't a square", 2, 2], ["an equilateral triangle", 3, 3],
        ["an isosceles triangle (that isn't equilateral)", 1, 1], ["a regular pentagon", 5, 5],
        ["a regular hexagon", 6, 6], ["a regular octagon", 8, 8], ["a rhombus that isn't a square", 2, 2], ["a kite", 1, 1],
      ];
      const [name, linesOfSym, rotOrder] = choice(shapes);
      const askType = choice(["lines", "rotation"]);
      if (askType === "lines") return { q: `How many lines of symmetry does ${name} have?`, a: linesOfSym };
      return { q: `What is the order of rotational symmetry of ${name}?`, a: rotOrder };
    },
  M920() {
      const perim = randInt(2, 50) * 2, half = perim / 2;
      const w = randInt(1, half - 1), h = half - w;
      return { q: `On a centimetre-squared grid, a rectangle is ${w} squares wide and ${h} squares tall. What is its perimeter, in cm?`, a: perim };
    },
  M635() {
      if (choice(["square", "rectangle"]) === "square") { const s = randInt(1, 25); return { q: `A square has side length ${s} cm. What is its perimeter, in cm?`, a: 4 * s }; }
      const perim = randInt(2, 50) * 2, half = perim / 2;
      const l = randInt(1, half - 1), w = half - l;
      return { q: `A rectangle has length ${l} cm and width ${w} cm. What is its perimeter, in cm?`, a: perim };
    },
  M690() {
      const half = randInt(3, 49), perim = 2 * half;
      const W = randInt(2, half - 1), H = half - W;
      if (H < 2) throw 0;
      const w = randInt(1, W - 1), h = randInt(1, H - 1);
      return { q: `An L-shaped tile is formed by cutting a ${w} cm × ${h} cm rectangular notch from one corner of a ${W} cm × ${H} cm rectangle. What is the perimeter of the L-shape, in cm?`, a: perim };
    },
  M900() {
      const area = randInt(4, 100);
      const factors = []; for (let f = 1; f * f <= area; f++) if (area % f === 0) factors.push(f);
      const w = choice(factors), h = area / w;
      return { q: `On a centimetre-squared grid, a rectangle is ${w} squares wide and ${h} squares tall. How many square cm is its area?`, a: area };
    },
  M390() {
      const area = randInt(4, 100);
      const factors = []; for (let f = 1; f * f <= area; f++) if (area % f === 0) factors.push(f);
      const w = choice(factors), l = area / w;
      return { q: `A rectangle has length ${l} cm and width ${w} cm. What is its area, in cm²?`, a: area };
    },
  M269() {
      const W = randInt(4, 10), H = randInt(4, 10);
      const w = randInt(1, W - 2 < 1 ? 1 : W - 2), h = randInt(1, H - 2 < 1 ? 1 : H - 2);
      const area = W * H - w * h;
      if (area <= 0 || area > 100) throw 0;
      return { q: `An L-shape is formed by cutting a ${w} cm × ${h} cm rectangle from one corner of a ${W} cm × ${H} cm rectangle. What is the area of the remaining L-shape, in cm²?`, a: area };
    },
  M610() {
      const area = randInt(2, 100), doubled = 2 * area;
      const factors = []; for (let f = 1; f * f <= doubled; f++) if (doubled % f === 0) factors.push(f);
      const b = choice(factors), h = doubled / b;
      return { q: `A triangle has base ${b} cm and height ${h} cm. What is its area, in cm²?`, a: area };
    },
  M996() {
      const w = randInt(2, 10), rectH = randInt(2, 6), triH = choice([2, 4, 6, 8]);
      const rectArea = w * rectH, triArea = (w * triH) / 2;
      if (!Number.isInteger(triArea)) throw 0;
      const total = rectArea + triArea;
      if (total > 100) throw 0;
      return { q: `A shape is made from a ${w} cm × ${rectH} cm rectangle with a triangle of height ${triH} cm sitting on top of it (the triangle's base matches the rectangle's width of ${w} cm). What is the total area of the shape, in cm²?`, a: total };
    },
  M618() {
      const x = randInt(0, 20), y = randInt(0, 20);
      const askType = choice(["x", "y", "sum"]);
      if (askType === "x") return { q: `Point P has coordinates (${x}, ${y}). What is the x-coordinate of P?`, a: x };
      if (askType === "y") return { q: `Point P has coordinates (${x}, ${y}). What is the y-coordinate of P?`, a: y };
      const sum = x + y; if (sum > 100) throw 0;
      return { q: `Point P has coordinates (${x}, ${y}). What is the sum of its x- and y-coordinates?`, a: sum };
    },
  M230() {
      const x1 = randInt(0, 40), y1 = randInt(0, 40), w = randInt(1, 30), h = randInt(1, 30);
      const A = [x1, y1], B = [x1 + w, y1], C = [x1 + w, y1 + h], D = [x1, y1 + h];
      const askCoord = choice(["x", "y"]);
      const val = askCoord === "x" ? D[0] : D[1];
      if (val > 100) throw 0;
      return { q: `A rectangle ABCD has vertices A(${A[0]}, ${A[1]}), B(${B[0]}, ${B[1]}), C(${C[0]}, ${C[1]}), and D. What is the ${askCoord}-coordinate of D?`, a: val };
    },
  M227() {
      const a = randInt(2, 20), b = randInt(2, 20);
      const l = (a * b) / gcd(a, b);
      if (l > 100) throw 0;
      return { q: `Find the lowest common multiple (LCM) of ${a} and ${b}.`, a: l };
    },
  M823() {
      const n = randInt(12, 100), d = choice([2, 3, 4, 5, 6, 8, 9, 10, 11]);
      return { q: `Is ${n} divisible by ${d}? Answer 1 for yes or 0 for no.`, a: n % d === 0 ? 1 : 0 };
    },
  M698() {
      const a = randInt(4, 100), b = randInt(4, 100);
      return { q: `Find the highest common factor (HCF) of ${a} and ${b}.`, a: gcd(a, b) };
    },
  M322() {
      function isPrime(n) { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; }
      const type = choice(["is_prime", "count_range"]);
      if (type === "is_prime") { const n = randInt(2, 100); return { q: `Is ${n} a prime number? Answer 1 for yes or 0 for no.`, a: isPrime(n) ? 1 : 0 }; }
      const lo = randInt(2, 50), hi = lo + randInt(5, 20);
      if (hi > 100) throw 0;
      let count = 0; for (let i = lo; i <= hi; i++) if (isPrime(i)) count++;
      return { q: `How many prime numbers are there between ${lo} and ${hi} inclusive?`, a: count };
    },
  M108() {
      const primes = [2, 3, 5, 7], count = randInt(2, 5);
      const factors = []; for (let i = 0; i < count; i++) factors.push(choice(primes));
      const num = factors.reduce((a, b) => a * b, 1);
      if (num > 100 || num < 2) throw 0;
      const sum = factors.reduce((a, b) => a + b, 0);
      return { q: `${num} is written as a product of its prime factors. What is the sum of all its prime factors (counting repeats)?`, a: sum };
    },
  M158() {
      const d = choice([2, 3, 4, 5, 6, 8, 10]), n = randInt(1, d - 1), k = randInt(1, 10);
      const totalArea = d * k, shadedArea = n * k;
      if (totalArea > 100) throw 0;
      return { q: `A shape is divided into ${d} equal parts, and ${n} of them are shaded. If the shape has a total area of ${totalArea} cm², what is the area of the shaded part, in cm²?`, a: shadedArea };
    },
  M939() {
      const total = randInt(5, 100), part = randInt(1, total - 1);
      return { q: `In a class of ${total} students, ${part} are boys. Write the fraction of students who are boys, as a fraction out of ${total}. What is the numerator?`, a: part };
    },
  M410() {
      const b = choice([2, 3, 4, 5, 6, 8]), a = randInt(1, b - 1), scale = randInt(2, 12);
      const d = b * scale, numerator = a * scale;
      if (d > 100 || numerator > 100) throw 0;
      return { q: `${a}/${b} = ?/${d}. What number replaces the ?`, a: numerator };
    },
  M671() {
      const factor = randInt(2, 9), sa = randInt(1, 10), sb = randInt(1, 10);
      if (sa === sb) throw 0;
      const num = factor * sa, den = factor * sb;
      if (num > 100 || den > 100) throw 0;
      const askNum = Math.random() < 0.5;
      return { q: `Simplify the fraction ${num}/${den} by cancelling the common factor of ${factor}. What is the ${askNum ? "numerator" : "denominator"} of the simplified fraction?`, a: askNum ? sa : sb };
    },
  M335() {
      const D = 24, divisors = [2, 3, 4, 6, 8, 12, 24];
      const chosen = shuffle(divisors).slice(0, 4);
      const fracs = chosen.map((d) => { const n = randInt(1, d - 1); return { n, d, eq: n * (D / d) }; });
      const eqs = fracs.map((f) => f.eq);
      if (new Set(eqs).size !== 4) throw 0;
      const askMax = Math.random() < 0.5;
      const target = askMax ? Math.max(...eqs) : Math.min(...eqs);
      const display = fracs.map((f) => `${f.n}/${f.d}`).join(", ");
      return { q: `Here are four fractions: ${display}. Which is the ${askMax ? "largest" : "smallest"}? Give your answer as its equivalent numerator out of ${D}.`, a: target };
    },
  M601() {
      const d = choice([2, 3, 4, 5, 6, 8]), w = randInt(1, 15), n = randInt(1, d - 1);
      const improperNum = w * d + n;
      if (improperNum > 100) throw 0;
      if (choice(["to_improper", "to_mixed"]) === "to_improper") return { q: `Convert the mixed number ${w} ${n}/${d} to an improper fraction: ?/${d}. What is the numerator?`, a: improperNum };
      return { q: `Convert the improper fraction ${improperNum}/${d} to a mixed number. What is the whole-number part?`, a: w };
    },
  M835() {
      const dd1 = randInt(2, 10), dd2 = randInt(2, 10);
      if (dd1 === dd2) throw 0;
      const D = (dd1 * dd2) / gcd(dd1, dd2);
      if (D > 100) throw 0;
      if (choice(["add", "sub"]) === "add") {
        const sum = D / dd1 + D / dd2;
        if (sum > 100) throw 0;
        return { q: `1/${dd1} + 1/${dd2} = ?/${D}. What number replaces the ?`, a: sum };
      }
      const small = Math.min(dd1, dd2), large = Math.max(dd1, dd2);
      if (small === large) throw 0;
      const diff = D / small - D / large;
      if (diff <= 0 || diff > 100) throw 0;
      return { q: `1/${small} - 1/${large} = ?/${D}. What number replaces the ?`, a: diff };
    },
  M931() {
      const d = choice([2, 3, 4, 5, 6, 8]), n1 = randInt(1, d - 1);
      if (choice(["add", "sub"]) === "add") {
        const n2 = d - n1, w1 = randInt(1, 20), w2 = randInt(1, 20), wholeSum = w1 + w2 + 1;
        if (wholeSum > 100) throw 0;
        return { q: `${w1} ${n1}/${d} + ${w2} ${n2}/${d} = ? (the fraction parts add to make a whole one). Give your answer as a whole number.`, a: wholeSum };
      }
      const w2 = randInt(1, 20), w1 = randInt(w2 + 1, w2 + 20);
      if (w1 > 100) throw 0;
      return { q: `${w1} ${n1}/${d} - ${w2} ${n1}/${d} = ? Give your answer as a whole number.`, a: w1 - w2 };
    },
  M637() {
      const k = randInt(2, 9), maxTotal = Math.floor(100 / k);
      if (maxTotal < 11) throw 0;
      const total = randInt(11, Math.min(maxTotal, 99));
      const tens = Math.floor(total / 10) * 10, units = total % 10;
      return { q: `Use the distributive law to work out ${k} × ${total} by splitting ${total} into ${tens} + ${units}: ${k} × ${tens} + ${k} × ${units}. What is the final answer?`, a: k * total };
    },
  M237() {
      const k = randInt(2, 9), a = randInt(1, Math.floor(100 / k));
      return { q: `Expand ${k}(x + ${a}). What is the constant term in the expanded expression?`, a: k * a };
    },
  M792() {
      const k1 = randInt(2, 9), a = randInt(-10, 10) || 3, k2 = randInt(1, 9);
      const coeffX = k1 + k2, constant = k1 * a;
      if (Math.random() < 0.5) { if (coeffX > 100) throw 0; return { q: `Expand and simplify ${k1}(x ${signed(a)}) + ${k2}x. What is the coefficient of x?`, a: coeffX }; }
      if (constant < 0 || constant > 100) throw 0;
      return { q: `Expand and simplify ${k1}(x ${signed(a)}) + ${k2}x. What is the constant term?`, a: constant };
    },
  M100() {
      const k = randInt(2, 9), a = randInt(1, Math.floor(100 / k));
      return { q: `Factorise fully: ${k}x + ${k * a} = ${k}(x + ?). What number replaces the ?`, a: a };
    },
  M502() {
      const type = choice(["acute", "right", "obtuse", "straight", "reflex"]);
      let angle;
      if (type === "acute") angle = randInt(1, 89);
      else if (type === "right") angle = 90;
      else if (type === "obtuse") angle = randInt(91, 179);
      else if (type === "straight") angle = 180;
      else angle = randInt(181, 359);
      const map = { acute: 1, right: 2, obtuse: 3, straight: 4, reflex: 5 };
      return { q: `An angle measures ${angle}°. Classify it: 1) acute  2) right  3) obtuse  4) straight  5) reflex. Give the number.`, a: map[type] };
    },
  M541() {
      const angle = randInt(1, 99);
      return { q: `Estimate the size of an angle that measures ${angle}°, to the nearest 10 degrees.`, a: Math.round(angle / 10) * 10 };
    },
  M780() {
      const reading = randInt(81, 179), actual = 180 - reading;
      if (actual < 1 || actual > 100) throw 0;
      return { q: `A protractor is misread using the wrong scale, giving a reading of ${reading}°. The correct angle is 180° minus this reading. What is the correct angle, in degrees?`, a: actual };
    },
  M331() {
      const angle = randInt(1, 89);
      return { q: `You need to draw an angle of ${angle}°. How many degrees short of a right angle (90°) is this?`, a: 90 - angle };
    },
  M818() {
      if (Math.random() < 0.5) {
        const a = randInt(10, 150), x = 180 - a;
        if (x < 1 || x > 100) throw 0;
        return { q: `Two angles lie on a straight line: ${a}° and x°. What is x?`, a: x };
      }
      const a = randInt(10, 150), b = randInt(10, 150), x = 360 - a - b;
      if (x < 1 || x > 100) throw 0;
      return { q: `Three angles meet at a point: ${a}°, ${b}°, and x°. What is x?`, a: x };
    },
  M163() {
      const angle = randInt(1, 100);
      if (Math.random() < 0.5) return { q: `Two straight lines cross, forming an angle of ${angle}°. What is the size of the angle vertically opposite it?`, a: angle };
      const adj = 180 - angle;
      if (adj < 1 || adj > 100) throw 0;
      return { q: `Two straight lines cross, forming an angle of ${angle}°. What is the size of the angle next to it on the same straight line?`, a: adj };
    },
  M351() {
      const a = randInt(10, 150), b = randInt(10, 150), c = 180 - a - b;
      if (c < 1 || c > 100) throw 0;
      return { q: `A triangle has two angles of ${a}° and ${b}°. What is the third angle?`, a: c };
    },
  M328() {
      const nums = distinctInts(0, 100, 5);
      const range = Math.max(...nums) - Math.min(...nums);
      return { q: `Here are five numbers: ${nums.join(", ")}. What is the range?`, a: range };
    },
  M934() {
      const nums = Array.from({ length: 5 }, () => randInt(0, 100)).sort((a, b) => a - b);
      const median = nums[2];
      return { q: `Here are five numbers: ${shuffle(nums).join(", ")}. What is the median?`, a: median };
    },
  M841() {
      const mode = randInt(0, 100);
      const others = [];
      while (others.length < 3) { const x = randInt(0, 100); if (x !== mode && !others.includes(x)) others.push(x); }
      const data = shuffle([mode, mode, ...others]);
      return { q: `Here is a list of numbers: ${data.join(", ")}. What is the mode?`, a: mode };
    },
  M940() {
      const n = choice([3, 4, 5]), mean = randInt(10, 90);
      const deviations = [];
      let sum = 0;
      for (let i = 0; i < n - 1; i++) { const dev = randInt(-15, 15); deviations.push(dev); sum += dev; }
      deviations.push(-sum);
      const nums = deviations.map((d) => mean + d);
      if (nums.some((v) => v < 0 || v > 100)) throw 0;
      return { q: `Here are ${n} numbers: ${shuffle(nums).join(", ")}. What is their mean?`, a: mean };
    },
  M899() {
      const a = randInt(1, 25), b = randInt(1, 25), c = randInt(1, 25), d = randInt(1, 25);
      const total = a + b + c + d;
      if (total > 100) throw 0;
      const desc = `A two-way table shows: Boys who like it: ${a}, Boys who dislike it: ${b}, Girls who like it: ${c}, Girls who dislike it: ${d}.`;
      const options = [
        { q: `${desc} How many boys are there in total?`, a: a + b },
        { q: `${desc} How many people like it in total?`, a: a + c },
        { q: `${desc} How many people were surveyed in total?`, a: total },
      ];
      return choice(options);
    },
  M597() {
      const chosen = shuffle(["Red", "Blue", "Green", "Yellow"]).slice(0, 3);
      const counts = chosen.map(() => randInt(1, 20));
      const total = counts.reduce((a, b) => a + b, 0);
      if (total > 100) throw 0;
      const desc = chosen.map((l, i) => `${l}: ${tallyStr(counts[i])}`).join("   ");
      if (Math.random() < 0.3) return { q: `A tally chart shows people's favourite colours: ${desc}. How many people were asked in total?`, a: total };
      const idx = randInt(0, 2);
      return { q: `A tally chart shows people's favourite colours: ${desc}. How many people chose ${chosen[idx]}?`, a: counts[idx] };
    },
  M644() {
      const symbolsPerUnit = choice([2, 4, 5]);
      const categories = ["Mon", "Tue", "Wed", "Thu"];
      const symCounts = categories.map(() => randInt(1, 8));
      const values = symCounts.map((s) => s * symbolsPerUnit);
      if (values.some((v) => v > 100)) throw 0;
      const desc = categories.map((c, i) => `${c}: ${symCounts[i]} symbols`).join(", ");
      const idx = randInt(0, 3);
      return { q: `In a pictogram, each symbol represents ${symbolsPerUnit} items. The data shows: ${desc}. How many items does ${categories[idx]} represent?`, a: values[idx] };
    },
  M460() {
      const categories = ["A", "B", "C", "D"];
      const heights = categories.map(() => randInt(1, 25));
      const desc = categories.map((c, i) => `${c}: ${heights[i]}`).join(", ");
      const askType = choice(["value", "total", "diff"]);
      if (askType === "value") { const idx = randInt(0, 3); return { q: `A frequency table shows: ${desc}. If you were to draw a bar chart, how tall would the bar for ${categories[idx]} be (i.e. what is its frequency)?`, a: heights[idx] }; }
      if (askType === "total") { const total = heights.reduce((a, b) => a + b, 0); if (total > 100) throw 0; return { q: `A frequency table shows: ${desc}. What is the total frequency, i.e. the sum of all the bar heights if drawn on a bar chart?`, a: total }; }
      const i1 = randInt(0, 3), i2 = randInt(0, 3);
      if (i1 === i2) throw 0;
      const diff = Math.abs(heights[i1] - heights[i2]);
      return { q: `A frequency table shows: ${desc}. What is the difference in height between the bars for ${categories[i1]} and ${categories[i2]}?`, a: diff };
    },
  M738() {
      const categories = ["Football", "Rugby", "Tennis", "Swimming"];
      const heights = categories.map(() => randInt(1, 25));
      const desc = categories.map((c, i) => `${c}: ${heights[i]}`).join(", ");
      const askType = choice(["max", "min", "diff", "total"]);
      if (askType === "max") return { q: `A bar chart shows the number of students who chose each sport: ${desc}. What is the height of the tallest bar?`, a: Math.max(...heights) };
      if (askType === "min") return { q: `A bar chart shows the number of students who chose each sport: ${desc}. What is the height of the shortest bar?`, a: Math.min(...heights) };
      if (askType === "total") { const total = heights.reduce((a, b) => a + b, 0); if (total > 100) throw 0; return { q: `A bar chart shows the number of students who chose each sport: ${desc}. How many students were surveyed in total?`, a: total }; }
      const mx = Math.max(...heights), mn = Math.min(...heights);
      if (mx === mn) throw 0;
      return { q: `A bar chart shows the number of students who chose each sport: ${desc}. What is the difference between the tallest and shortest bars?`, a: mx - mn };
    },
  M945() {
      const categories = ["Cat", "Dog", "Fish", "Bird"];
      const counts = categories.map(() => randInt(1, 20));
      const total = counts.reduce((a, b) => a + b, 0);
      if (total > 100) throw 0;
      const desc = categories.map((c, i) => `${c}: ${counts[i]}`).join(", ");
      if (Math.random() < 0.4) return { q: `A survey of favourite pets is recorded in a table: ${desc}. How many people were surveyed in total?`, a: total };
      const idx = randInt(0, 3);
      return { q: `A survey of favourite pets is recorded in a table: ${desc}. How many people chose ${categories[idx]}?`, a: counts[idx] };
    },
  M127() {
      const values = [10, 20, 30, 40, 50];
      const freqs = values.map(() => randInt(1, 10));
      const totalFreq = freqs.reduce((a, b) => a + b, 0);
      const sumFX = values.reduce((acc, v, i) => acc + v * freqs[i], 0);
      const mean = Math.round(sumFX / totalFreq);
      if (mean > 100) throw 0;
      const desc = values.map((v, i) => `${v} minutes: ${freqs[i]} students`).join(", ");
      return { q: `A frequency table shows how long students spent on homework: ${desc}. What is the mean time, in minutes, to the nearest whole number?`, a: mean };
    },
  M440() {
      const nums = [randInt(1, 10), randInt(1, 10), randInt(1, 10), randInt(1, 10), randInt(80, 100)].sort((a, b) => a - b);
      const median = nums[2];
      return { q: `A small business has 5 employees earning (in £1000s): ${shuffle(nums).join(", ")}. One salary is much higher than the rest, so the median is a more suitable average than the mean here. What is the median salary, in £1000s?`, a: median };
    },
  M478() {
      const unitCost = randInt(1, 10), qtyKnown = randInt(2, 10);
      let qtyAsk = randInt(2, 10);
      if (qtyAsk === qtyKnown) qtyAsk = qtyAsk === 10 ? qtyAsk - 1 : qtyAsk + 1;
      const knownTotal = unitCost * qtyKnown, askTotal = unitCost * qtyAsk;
      if (askTotal > 100) throw 0;
      return { q: `${qtyKnown} pens cost £${knownTotal} in total. Using the unitary method, how much would ${qtyAsk} pens cost, in £?`, a: askTotal };
    },
  M216() {
      if (choice(["frac", "whole"]) === "frac") { const n = randInt(1, 20), d = randInt(1, 20); if (n === d) throw 0; return { q: `What is the numerator of the reciprocal of ${n}/${d}?`, a: d }; }
      const k = randInt(2, 20);
      return { q: `The reciprocal of ${k} is 1/${k}. What is the denominator of the reciprocal?`, a: k };
    },
  M157() {
      const a = randInt(1, 9), b = randInt(2, 10), c = randInt(1, 9), d = randInt(2, 10);
      const num = a * c, den = b * d;
      if (num > 100 || den > 100) throw 0;
      return { q: `${a}/${b} × ${c}/${d} = ?/${den}. What number replaces the ? (the unsimplified numerator)`, a: num };
    },
  M110() {
      const a = randInt(1, 9), b = randInt(2, 10), c = randInt(1, 9), d = randInt(2, 10);
      const num = a * d, den = b * c;
      if (num > 100 || den > 100) throw 0;
      return { q: `${a}/${b} ÷ ${c}/${d} = ?/${den}. What number replaces the ? (the unsimplified numerator)`, a: num };
    },
  M197() {
      const whole = randInt(1, 10), d = choice([2, 3, 4]), n = randInt(1, d - 1), k = randInt(2, 10);
      const multiplier = k * d, product = (whole * d + n) * k;
      if (product > 100) throw 0;
      return { q: `${whole} ${n}/${d} × ${multiplier} = ?`, a: product };
    },
  M265() {
      const d = choice([2, 3, 4, 5]), whole = randInt(1, 15), n = randInt(1, d - 1);
      const result = whole * d + n;
      if (result > 100) throw 0;
      return { q: `${whole} ${n}/${d} ÷ 1/${d} = ?`, a: result };
    },
  M695() {
      const d = choice([2, 3, 4, 5, 6, 8, 10]), n = randInt(1, d - 1), k = randInt(1, 10);
      const base = d * k, val = n * k;
      if (base > 100) throw 0;
      return { q: `Find ${n}/${d} of ${base} (no calculator).`, a: val };
    },
  M684() {
      const val = randInt(0, 100), d = randInt(2, 12), n = randInt(1, d - 1);
      const base = roundTo((val * d) / n, 2);
      if (Math.round((base * n) / d) !== val) throw 0;
      return { q: `Find ${n}/${d} of ${base} using a calculator.`, a: val };
    },
  M958() {
      if (choice(["frac_to_dec", "dec_to_frac"]) === "frac_to_dec") {
        const d = choice([2, 4, 5, 10, 20, 25, 50, 100]), n = randInt(1, d - 1);
        const decTimes100 = Math.round((n / d) * 100);
        if (decTimes100 > 100) throw 0;
        return { q: `Convert ${n}/${d} to a decimal, then multiply the decimal by 100. What is the result?`, a: decTimes100 };
      }
      const hundredths = randInt(1, 100);
      return { q: `Write ${hundredths / 100} as a fraction with denominator 100. What is the numerator?`, a: hundredths };
    },
  M264() {
      const pct = randInt(1, 100);
      if (choice(["dec", "frac"]) === "dec") return { q: `Write ${pct / 100} as a percentage.`, a: pct };
      const [n, d] = simplifyFraction(pct, 100);
      return { q: `Write ${n}/${d} as a percentage.`, a: pct };
    },
  M553() {
      const vals = new Set(); while (vals.size < 4) vals.add(randInt(5, 95));
      const arr = [...vals];
      const displays = arr.map((p) => { const f = choice(["pct", "dec", "frac"]); if (f === "pct") return `${p}%`; if (f === "dec") return `${(p / 100).toFixed(2)}`; const [n, d] = simplifyFraction(p, 100); return `${n}/${d}`; });
      const askMax = Math.random() < 0.5;
      return { q: `Which of these is ${askMax ? "the largest" : "the smallest"}? ${displays.join(", ")}   (give your answer as a percentage)`, a: askMax ? Math.max(...arr) : Math.min(...arr) };
    },
  M235() {
      const pct = randInt(1, 100), base = choice([4, 5, 10, 20, 25, 50, 100]);
      const part = (pct * base) / 100;
      if (!Number.isInteger(part)) throw 0;
      return { q: `${part} out of ${base} students passed a test. What percentage passed?`, a: pct };
    },
  M655() {
      const table = [["impossible", 0], ["very unlikely", 10], ["unlikely", 25], ["evens", 50], ["likely", 75], ["very likely", 90], ["certain", 100]];
      const [phrase, pct] = choice(table);
      return { q: `An event is described as "${phrase}". As a rough percentage, what is its probability?`, a: pct };
    },
  M941() {
      const d = randInt(2, 20), n = randInt(1, d - 1);
      return { q: `A bag contains ${d} balls, ${n} of which are red. Write the probability of picking a red ball as a fraction: ?/${d}. What is the numerator?`, a: n };
    },
  M938() {
      const d = choice([2, 4, 5, 10, 20, 25, 50, 100]), n = randInt(1, d - 1);
      const pct = Math.round((n / d) * 100);
      if (pct > 100) throw 0;
      return { q: `The probability of an event is ${n}/${d}. What is this as a percentage?`, a: pct };
    },
  M755() {
      if (choice(["sum", "complement"]) === "complement") { const pct = randInt(1, 99); return { q: `The probability that it rains tomorrow is ${pct}%. What is the probability, as a percentage, that it does NOT rain?`, a: 100 - pct }; }
      const p1 = randInt(1, 49), p2 = randInt(1, 50 - p1);
      const sum = p1 + p2;
      if (sum > 100) throw 0;
      return { q: `Events A and B are mutually exclusive. P(A) = ${p1}% and P(B) = ${p2}%. What is P(A or B), as a percentage?`, a: sum };
    },
  M718() {
      if (choice(["two_dice_sum", "dice_coin"]) === "two_dice_sum") {
        const target = randInt(2, 12);
        let count = 0;
        for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === target) count++;
        return { q: `Two fair six-sided dice are rolled and their scores added. Using a sample space diagram of all 36 outcomes, how many outcomes give a sum of ${target}?`, a: count };
      }
      return { q: `A fair coin is flipped and a fair six-sided die is rolled. Using a sample space diagram, how many possible outcomes are there in total?`, a: 12 };
    },

  // ---------------------------------------------------------------- Y8 (SOW additions)
  M885() {
        const p = randInt(1, 12), q = randInt(1, 12);
        if (U.gcd(p, q) !== 1) throw 0;
        const k = randInt(2, 8);
        const askFirst = Math.random() < 0.5;
        return { q: `Write the ratio ${p * k}:${q * k} in its simplest form. What is the ${askFirst ? "first" : "second"} number in the simplified ratio?`, a: askFirst ? p : q };
      },
  M543() {
        const a = randInt(2, 9), n = randInt(2, 50);
        const b = a * n;
        return { q: `Write the ratio ${a}:${b} in the form 1:n. What is n?`, a: n };
      },
  M267() {
        const d = choice([2, 4, 5, 10, 20, 25, 50]);
        const n = randInt(1, d - 1);
        const pct = (n / d) * 100;
        if (!Number.isInteger(pct)) throw 0;
        return { q: `A ratio is ${n}:${d - n}. What percentage of the total does the first part represent?`, a: pct };
      },
  M801() {
        const p = randInt(1, 12), q = randInt(1, 12);
        if (U.gcd(p, q) !== 1) throw 0;
        const k = randInt(2, 8);
        const known = p * k, unknown = q * k;
        if (unknown > 100) throw 0;
        return { q: `${p}:${q} = ${known}:?. What number replaces the ?`, a: unknown };
      },
  M525() {
        const p = randInt(1, 9), q = randInt(1, 9);
        if (U.gcd(p, q) !== 1) throw 0;
        const k = randInt(1, 10);
        const shareP = p * k;
        if (shareP > 100) throw 0;
        const total = (p + q) * k;
        return { q: `£${total} is shared in the ratio ${p}:${q}. How much does the first share receive?`, a: shareP };
      },
  M112() {
        const n = randInt(2, 10);
        const mapcm = randInt(1, 10);
        const real = mapcm * n;
        if (real > 100) throw 0;
        return { q: `On a scale drawing, 1 cm represents ${n} km. A road measures ${mapcm} cm on the drawing. What is its real length, in km?`, a: real };
      },
  M994() {
        const original = randInt(10, 99);
        const rounded = Math.round(original / 10) * 10;
        return { q: `Round ${original} to 1 significant figure.`, a: rounded };
      },
  M131() {
        const R = randInt(1, 99);
        const offsetInt = randInt(-4, 4);
        const original = roundTo(R + offsetInt / 10, 1);
        const sf = String(R).length;
        return { q: `Round ${original} to ${sf} significant figure${sf > 1 ? "s" : ""}.`, a: R };
      },
  M878() {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        const ra = choice(candidates), rb = choice(candidates);
        if (ra * rb > 100) throw 0;
        const near = (r) => (r < 10 ? roundTo(r + randInt(-4, 4) / 10, 1) : r + randInt(-4, 4));
        const a = near(ra), b = near(rb);
        return { q: `Estimate the value of ${a} × ${b} by rounding each number to 1 significant figure.`, a: ra * rb };
      },
  M622() {
        let x1 = randInt(0, 100), x2 = randInt(0, 100);
        if ((x1 + x2) % 2 !== 0) x2 = x2 === 100 ? x2 - 1 : x2 + 1;
        let y1 = randInt(0, 100), y2 = randInt(0, 100);
        if ((y1 + y2) % 2 !== 0) y2 = y2 === 100 ? y2 - 1 : y2 + 1;
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const askX = Math.random() < 0.5;
        return { q: `Find the midpoint of the line segment joining (${x1}, ${y1}) and (${x2}, ${y2}). What is its ${askX ? "x" : "y"}-coordinate?`, a: askX ? mx : my };
      },
  M311() {
        const x1 = randInt(0, 100), mx = randInt(0, 100), x2 = 2 * mx - x1;
        const y1 = randInt(0, 100), my = randInt(0, 100), y2 = 2 * my - y1;
        if (x2 < 0 || x2 > 100 || y2 < 0 || y2 > 100) throw 0;
        const askX = Math.random() < 0.5;
        return { q: `The midpoint of A(${x1}, ${y1}) and B is (${mx}, ${my}). What is the ${askX ? "x" : "y"}-coordinate of B?`, a: askX ? x2 : y2 };
      },
  M291() {
        const base = randInt(2, 20), height = randInt(1, Math.floor(100 / base));
        if (base * height > 100) throw 0;
        return { q: `Find the area of a parallelogram with base ${base} cm and perpendicular height ${height} cm.`, a: base * height };
      },
  M705() {
        const h = randInt(1, 10);
        let a = randInt(1, 20), b = randInt(1, 20);
        if ((a + b) % 2 !== 0) b = b === 20 ? b - 1 : b + 1;
        const area = ((a + b) / 2) * h;
        if (area > 100) throw 0;
        return { q: `Find the area of a trapezium with parallel sides ${a} cm and ${b} cm, and height ${h} cm.`, a: area };
      },
  M728() {
        const useM = Math.random() < 0.5;
        const factor = useM ? 10000 : 100;
        const fromUnit = useM ? "cm²" : "mm²";
        const toUnit = useM ? "m²" : "cm²";
        const N = randInt(1, 100);
        const big = N * factor;
        return { q: `Convert ${big} ${fromUnit} to ${toUnit}. (1 ${toUnit} = ${factor} ${fromUnit})`, a: N };
      },
  M595() {
        if (Math.random() < 0.5) { const r = randInt(1, 50); return { q: `A circle has a radius of ${r} cm. What is its diameter, in cm?`, a: 2 * r }; }
        const d = randInt(1, 50) * 2;
        return { q: `A circle has a diameter of ${d} cm. What is its radius, in cm?`, a: d / 2 };
      },
  M169() {
        const d = randInt(2, 31);
        const c = Math.round(Math.PI * d);
        if (c > 100) throw 0;
        return { q: `Find the circumference of a circle with diameter ${d} cm, to the nearest whole number (use π).`, a: c };
      },
  M231() {
        const r = randDecimal(1, 5.6, 1);
        const area = Math.round(Math.PI * r * r);
        if (area > 100) throw 0;
        return { q: `Find the area of a circle with radius ${r} cm, to the nearest whole number (use π).`, a: area };
      },
  M719() {
        if (Math.random() < 0.5) {
          const coeff = randInt(1, 9), exp = randInt(1, 8);
          const num = coeff * Math.pow(10, exp);
          return { q: `${num} is written in standard form as ${coeff} × 10^n. What is n?`, a: exp };
        }
        const coeff = roundTo(randDecimal(1, 9.9, 1), 1), exp = randInt(1, 6);
        const value = parseFloat((coeff * Math.pow(10, exp)).toPrecision(10));
        return { q: `${value} is written in standard form as a × 10^${exp}. What is a × 10? (e.g. if a = 3.2, the answer is 32)`, a: Math.round(coeff * 10) };
      },
  M678() {
        if (Math.random() < 0.5) {
          const coeff = randInt(1, 9), exp = randInt(1, 6);
          const numStr = "0." + "0".repeat(exp - 1) + coeff;
          return { q: `${numStr} is written in standard form as ${coeff} × 10^-n. What is n?`, a: exp };
        }
        const coeff = roundTo(randDecimal(1, 9.9, 1), 1), exp = randInt(1, 4);
        const shifted = Math.round(coeff * 10);
        const digits = String(shifted);
        const numStr = "0." + "0".repeat(exp - 1) + digits;
        return { q: `${numStr} is written in standard form as a × 10^-${exp}. What is a × 10? (e.g. if a = 3.2, the answer is 32)`, a: shifted };
      },
  M829() {
        const onlyA = randInt(1, 20), onlyB = randInt(1, 20), both = randInt(1, 20), neither = randInt(1, 20);
        const total = onlyA + onlyB + both + neither;
        if (total > 100) throw 0;
        const totalA = onlyA + both, totalB = onlyB + both, either = onlyA + onlyB + both;
        const itemPhrase = (n) => (n === 1 ? "1 item is" : `${n} items are`);
        const options = [
          ["only in set A", onlyA],
          ["only in set B", onlyB],
          ["in both A and B", both],
          ["in neither set", neither],
          ["in set A (including any overlap with B)", totalA],
          ["in set B (including any overlap with A)", totalB],
          ["in A or B (or both)", either],
        ];
        const [label, val] = choice(options);
        return { q: `A Venn diagram shows two sets, A and B. ${itemPhrase(onlyA)} only in A, ${onlyB === 1 ? "1 is" : `${onlyB} are`} only in B, ${both === 1 ? "1 is" : `${both} are`} in both, and ${neither === 1 ? "1 is" : `${neither} are`} in neither. How many items are ${label}?`, a: val };
      },
  M419() {
        const both = randInt(5, 30);
        const onlyA = randInt(5, 30), onlyB = randInt(5, 30);
        const neither = 100 - both - onlyA - onlyB;
        if (neither < 1) throw 0;
        const totalA = onlyA + both, totalB = onlyB + both, either = onlyA + onlyB + both;
        const options = [
          ["only in A", onlyA],
          ["only in B", onlyB],
          ["in both A and B", both],
          ["in neither", neither],
          ["in the whole of A (including any overlap with B)", totalA],
          ["in the whole of B (including any overlap with A)", totalB],
          ["in A or B", either],
        ];
        const [label, val] = choice(options);
        const beV = (n) => (n === 1 ? "is" : "are");
        return { q: `A Venn diagram shows sets A and B for 100 items in total. ${onlyA} ${beV(onlyA)} only in A, ${onlyB} ${beV(onlyB)} only in B, ${both} ${beV(both)} in both, and ${neither} ${beV(neither)} in neither. An item is picked at random. What is the probability, as a percentage, that it is ${label}?`, a: val };
      },
  M365() {
        const primes = [2, 3, 5];
        const expA = primes.map(() => randInt(0, 2)), expB = primes.map(() => randInt(0, 2));
        const useHCF = Math.random() < 0.5;
        const combExp = expA.map((e, i) => (useHCF ? Math.min(e, expB[i]) : Math.max(e, expB[i])));
        const val = primes.reduce((acc, p, i) => acc * Math.pow(p, combExp[i]), 1);
        if (val < 1 || val > 100) throw 0;
        const describe = (exps) => primes.map((p, i) => (exps[i] > 0 ? (exps[i] === 1 ? `${p}` : `${p}^${exps[i]}`) : null)).filter(Boolean).join(" × ") || "1";
        return { q: `Using a Venn diagram of prime factors, a = ${describe(expA)} and b = ${describe(expB)}. Find the ${useHCF ? "HCF" : "LCM"} of a and b.`, a: val };
      },
  M767() {
        const shapes = [
          ["cube", 6, 12, 8], ["cuboid", 6, 12, 8], ["triangular prism", 5, 9, 6],
          ["square-based pyramid", 5, 8, 5], ["tetrahedron", 4, 6, 4],
          ["cylinder", 3, 2, 0], ["cone", 2, 1, 1], ["sphere", 1, 0, 0],
          ["hexagonal prism", 8, 18, 12], ["pentagonal prism", 7, 15, 10],
        ];
        const [name, faces, edges, vertices] = choice(shapes);
        const prop = choice(["faces", "edges", "vertices"]);
        const val = prop === "faces" ? faces : prop === "edges" ? edges : vertices;
        return { q: `How many ${prop} does a ${name} have?`, a: val };
      },
  M518() {
        const shapes = [
          ["cone", 2], ["cylinder", 3], ["tetrahedron", 4], ["triangular prism", 5], ["square-based pyramid", 5],
          ["cube", 6], ["cuboid", 6], ["pentagonal prism", 7], ["hexagonal prism", 8],
          ["heptagonal prism", 9], ["octagonal prism", 10], ["nonagonal prism", 11], ["decagonal prism", 12],
        ];
        const [name, faces] = choice(shapes);
        const article = "aeiou".includes(name[0]) ? "an" : "a";
        return { q: `A net is folded up to make ${article} ${name}. How many faces does the ${name} have?`, a: faces };
      },
  M884() {
        const n = randInt(4, 7);
        const areas = [];
        let sum = 0;
        for (let i = 0; i < n; i++) { const a = randInt(1, Math.max(1, Math.floor(90 / n))); areas.push(a); sum += a; }
        if (sum > 100) throw 0;
        return { q: `A net folds up into a solid with ${n} faces, of areas ${areas.join(", ")} cm² each. What is the total surface area of the solid, in cm²?`, a: sum };
      },
  M534() {
        if (Math.random() < 0.5) { const s = randInt(1, 4); const sa = 6 * s * s; if (sa > 100) throw 0; return { q: `Find the surface area of a cube with side length ${s} cm.`, a: sa }; }
        const l = randInt(1, 6), w = randInt(1, 6), h = randInt(1, 6), sa = 2 * (l * w + l * h + w * h);
        if (sa > 100) throw 0;
        return { q: `Find the surface area of a cuboid measuring ${l} cm × ${w} cm × ${h} cm.`, a: sa };
      },
  M661() {
        const base = randInt(2, 6), height = randInt(2, 6), length = randInt(2, 6);
        const hyp = Math.sqrt(base * base + height * height);
        const areaTri = 0.5 * base * height;
        const perim = base + height + hyp;
        const sa = 2 * areaTri + perim * length;
        const rounded = Math.round(sa);
        if (rounded > 100) throw 0;
        return { q: `A triangular prism has a right-angled triangular cross-section with legs ${base} cm and ${height} cm, and the prism is ${length} cm long. Find its total surface area, to the nearest whole number.`, a: rounded };
      },
  M765() {
        if (Math.random() < 0.5) { const s = randInt(1, 4); const vol = s * s * s; if (vol > 100) throw 0; return { q: `Find the volume of a cube with side length ${s} cm.`, a: vol }; }
        const l = randInt(1, 9), w = randInt(1, 9), h = randInt(1, 9), vol = l * w * h;
        if (vol > 100) throw 0;
        return { q: `Find the volume of a cuboid measuring ${l} cm × ${w} cm × ${h} cm.`, a: vol };
      },
  M722() {
        const base = randInt(2, 10), height = randInt(2, 10), length = randInt(2, 10);
        const vol = 0.5 * base * height * length;
        if (!Number.isInteger(vol) || vol > 100) throw 0;
        return { q: `A triangular prism has a cross-section that is a right-angled triangle with legs ${base} cm and ${height} cm. The prism is ${length} cm long. Find its volume, in cm³.`, a: vol };
      },
  M465() {
        const type = choice(["cm3-litres", "cm3-m3"]);
        const N = randInt(1, 100);
        if (type === "cm3-litres") { const cm3 = N * 1000; return { q: `Convert ${cm3} cm³ to litres. (1 litre = 1000 cm³)`, a: N }; }
        const cm3 = N * 1000000;
        return { q: `Convert ${cm3} cm³ to m³. (1 m³ = 1,000,000 cm³)`, a: N };
      },
  M797() {
        const h = randInt(0, 100), v = randInt(0, 100);
        const askX = Math.random() < 0.5;
        return { q: `The horizontal line y = ${h} and the vertical line x = ${v} are plotted on a graph. They intersect at one point — give the ${askX ? "x" : "y"}-coordinate of that point.`, a: askX ? v : h };
      },
  M932() {
        const m = randInt(-9, 9) || 1, c = randInt(-50, 50), x = randInt(0, 20);
        const y = m * x + c;
        if (y < 0 || y > 100) throw 0;
        return { q: `A straight line has equation y = ${m}x ${signed(c)}. What is y when x = ${x}?`, a: y };
      },
  M544() {
        const m = randInt(1, 10), c = randInt(0, 50);
        if (Math.random() < 0.5) {
          const x2 = randInt(1, 10), y2 = m * x2 + c;
          if (y2 > 100) throw 0;
          return { q: `A straight line passes through (0, ${c}) and (${x2}, ${y2}). What is its gradient?`, a: m };
        }
        const x2 = randInt(1, 10), y2 = m * x2 + c;
        if (y2 > 100) throw 0;
        return { q: `A straight line has gradient ${m} and passes through (${x2}, ${y2}). What is its y-intercept?`, a: c };
      },
  M139() {
        const x = randInt(0, 80), y = randInt(0, 80), dx = randInt(-30, 30), dy = randInt(-30, 30);
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx > 100 || ny < 0 || ny > 100) throw 0;
        const askX = Math.random() < 0.5;
        return { q: `Point P(${x}, ${y}) is translated by the vector (${dx}, ${dy}). What is the ${askX ? "x" : "y"}-coordinate of the image point?`, a: askX ? nx : ny };
      },
  M290() {
        const vertical = Math.random() < 0.5;
        const k = randInt(0, 100);
        const x = randInt(0, 100), y = randInt(0, 100);
        if (vertical) {
          const nx = 2 * k - x;
          if (nx < 0 || nx > 100) throw 0;
          return { q: `Point P(${x}, ${y}) is reflected in the line x = ${k}. What is the x-coordinate of the image?`, a: nx };
        }
        const ny = 2 * k - y;
        if (ny < 0 || ny > 100) throw 0;
        return { q: `Point P(${x}, ${y}) is reflected in the line y = ${k}. What is the y-coordinate of the image?`, a: ny };
      },
  M679() {
        const a = randInt(30, 150), b = randInt(30, 150), c = randInt(30, 150), x = 360 - a - b - c;
        if (x < 1 || x > 100) throw 0;
        return { q: `A quadrilateral has angles ${a}°, ${b}°, ${c}°, and x°. What is x?`, a: x };
      },
  M319() {
        const known = randInt(20, 160);
        const other = randInt(10, 170 - known);
        const x = 180 - known - other;
        if (x < 1 || x > 100) throw 0;
        return { q: `In a diagram, angle a = ${known}° is vertically opposite angle b, and angle b lies on a straight line together with a ${other}° angle and x°. What is x?`, a: x };
      },
  M606() {
        const angle = randInt(10, 170);
        const type = choice(["corresponding", "alternate", "co-interior"]);
        if (type === "co-interior") { const other = 180 - angle; if (other < 1 || other > 100) throw 0; return { q: `Two parallel lines are cut by a transversal. One co-interior angle is ${angle}°. What is the other co-interior angle?`, a: other }; }
        if (angle > 100) throw 0;
        return { q: `Two parallel lines are cut by a transversal. One angle is ${angle}°. What is its ${type} angle?`, a: angle };
      },
  M393() {
        const base = randInt(10, 170);
        const top = 180 - base;
        if (top < 1 || top > 100 || base > 100) throw 0;
        const askTop = Math.random() < 0.5;
        if (askTop) return { q: `An isosceles trapezium has two equal base angles of ${base}° each. What is the size of each of the other two (equal) angles?`, a: top };
        return { q: `An isosceles trapezium has two equal angles of ${top}° at the top. What is the size of each of the two equal base angles?`, a: base };
      },
  M653() {
        const n = choice([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 36]);
        const exterior = 360 / n;
        if (!Number.isInteger(exterior)) throw 0;
        const askExterior = Math.random() < 0.5;
        if (askExterior) { if (exterior > 100) throw 0; return { q: `A regular polygon has ${n} sides. What is the size of each exterior angle?`, a: exterior }; }
        const interior = 180 - exterior;
        if (interior < 1 || interior > 100) throw 0;
        return { q: `A regular polygon has ${n} sides. What is the size of each interior angle?`, a: interior };
      },
  M574() {
        const total = choice([12, 18, 24, 36, 60, 72, 90, 120, 180]);
        const freq = randInt(1, total);
        const angle = (freq * 360) / total;
        if (!Number.isInteger(angle) || angle > 100) throw 0;
        return { q: `In a survey of ${total} people, ${freq} chose a particular option. What angle, in degrees, should be used to represent this in a pie chart?`, a: angle };
      },
  M165() {
        const total = choice([20, 40, 50, 60, 80, 100]);
        const angle = choice([18, 30, 36, 45, 60, 72, 90, 120, 144, 180, 270]);
        const freq = (angle / 360) * total;
        if (!Number.isInteger(freq) || freq < 0 || freq > 100) throw 0;
        return { q: `A pie chart shows data for ${total} people. One sector has an angle of ${angle}°. How many people does this sector represent?`, a: freq };
      },
  M140() {
        const start = randInt(0, 60), step = randInt(-5, 5) || 1;
        const x = randInt(1, 5);
        const y = start + step * x;
        if (y < 0 || y > 100) throw 0;
        const hourPhrase = x === 1 ? "1 hour" : `${x} hours`;
        return { q: `A line graph is drawn from this data: at time 0 the value is ${start}, changing by ${step} each hour. What value should be plotted at time ${hourPhrase}?`, a: y };
      },
  M183() {
        const times = [9, 10, 11, 12, 13];
        const vals = times.map(() => randInt(0, 100));
        const idx = randInt(0, times.length - 1);
        if (Math.random() < 0.5) {
          return { q: `A line graph shows these values: ${times.map((t, i) => `${t}:00 → ${vals[i]}`).join(", ")}. What value is shown at ${times[idx]}:00?`, a: vals[idx] };
        }
        const i2 = nChoiceExcluding([0, 1, 2, 3, 4], [idx]);
        const diff = Math.abs(vals[idx] - vals[i2]);
        return { q: `A line graph shows these values: ${times.map((t, i) => `${t}:00 → ${vals[i]}`).join(", ")}. What is the difference between the values at ${times[idx]}:00 and ${times[i2]}:00?`, a: diff };
      },
  M648() {
        const n = randInt(6, 15);
        const data = [];
        for (let i = 0; i < n; i++) data.push(randInt(10, 39));
        const stem = randInt(1, 3);
        const count = data.filter((v) => Math.floor(v / 10) === stem).length;
        return { q: `Here is a list of values: ${data.join(", ")}. If these were shown in a stem-and-leaf diagram (stems = tens digit), how many values would be on the stem "${stem}"?`, a: count };
      },
  M210() {
        const stem = randInt(1, 9);
        const leafCount = randInt(3, 8);
        const leaves = [];
        while (leaves.length < leafCount) { const l = randInt(0, 9); if (!leaves.includes(l)) leaves.push(l); }
        leaves.sort((a, b) => a - b);
        const type = choice(["count", "value", "range"]);
        if (type === "count") return { q: `A stem-and-leaf diagram has the row: ${stem} | ${leaves.join(" ")}. How many values are on this row?`, a: leaves.length };
        if (type === "range") { const range = leaves[leaves.length - 1] - leaves[0]; return { q: `A stem-and-leaf diagram has the row: ${stem} | ${leaves.join(" ")}  (key: ${stem}|${leaves[0]} = ${stem}${leaves[0]}). What is the range of the values on this row?`, a: range }; }
        const idx = randInt(0, leaves.length - 1);
        const val = stem * 10 + leaves[idx];
        if (val > 100) throw 0;
        return { q: `A stem-and-leaf diagram has the row: ${stem} | ${leaves.join(" ")}  (key: ${stem}|${leaves[0]} = ${stem}${leaves[0]}). What is the ${ordinalSuffix(idx + 1)} smallest value on this row?`, a: val };
      },
  U854() {
        const type = choice(["mean", "median", "range", "mode"]);
        if (type === "mode") {
          const n = randInt(5, 9);
          const data = [];
          for (let i = 0; i < n; i++) data.push(randInt(0, 15));
          const counts = {}; data.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
          const maxCount = Math.max(...Object.values(counts));
          const modes = Object.keys(counts).filter((k) => counts[k] === maxCount).map(Number);
          if (modes.length !== 1 || maxCount < 2) throw 0;
          return { q: `A diagram shows these values: ${data.join(", ")}. What is the mode?`, a: modes[0] };
        }
        const n = randInt(5, 9);
        const data = [];
        for (let i = 0; i < n; i++) data.push(randInt(0, 100));
        if (type === "range") { const range = Math.max(...data) - Math.min(...data); return { q: `A diagram shows these values: ${data.join(", ")}. What is the range?`, a: range }; }
        if (type === "median") {
          const sorted = [...data].sort((a, b) => a - b);
          if (n % 2 === 0) { const median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2; if (!Number.isInteger(median)) throw 0; return { q: `A diagram shows these values: ${data.join(", ")}. What is the median?`, a: median }; }
          return { q: `A diagram shows these values: ${data.join(", ")}. What is the median?`, a: sorted[(n - 1) / 2] };
        }
        const sum = data.reduce((a, b) => a + b, 0);
        if (sum % n !== 0) throw 0;
        const mean = sum / n;
        if (mean > 100) throw 0;
        return { q: `A diagram shows these values: ${data.join(", ")}. What is the mean?`, a: mean };
      },
  M384() {
        const lo = randInt(0, 80), hi = lo + randInt(2, 20);
        const type = choice(["gt", "gte", "lt", "lte", "between"]);
        if (type === "between") { const count = hi - lo - 1; if (count < 1 || count > 100) throw 0; return { q: `A number line shows open circles at ${lo} and ${hi}, with the region between them shaded (i.e. ${lo} < x < ${hi}). How many integers satisfy this?`, a: count }; }
        if (type === "gt") { const ansv = lo + 1; if (ansv > 100) throw 0; return { q: `A number line shows an open circle at ${lo}, with the region to the right shaded (x > ${lo}). What is the smallest integer that satisfies this?`, a: ansv }; }
        if (type === "gte") { if (lo > 100) throw 0; return { q: `A number line shows a closed circle at ${lo}, with the region to the right shaded (x ≥ ${lo}). What is the smallest integer that satisfies this?`, a: lo }; }
        if (type === "lt") { const ansv = lo - 1; if (ansv < 0) throw 0; return { q: `A number line shows an open circle at ${lo}, with the region to the left shaded (x < ${lo}). What is the largest integer that satisfies this?`, a: ansv }; }
        if (lo > 100) throw 0;
        return { q: `A number line shows a closed circle at ${lo}, with the region to the left shaded (x ≤ ${lo}). What is the largest integer that satisfies this?`, a: lo };
      },
  M118() {
        const a = randInt(2, 9), x0 = randInt(0, 90), b = randInt(-20, 20);
        const rhs = a * x0 + b;
        const type = choice([">", "<", ">=", "<="]);
        let ansv;
        if (type === ">") ansv = x0 + 1;
        else if (type === ">=") ansv = x0;
        else if (type === "<") ansv = x0 - 1;
        else ansv = x0;
        if (ansv < 0 || ansv > 100) throw 0;
        const phrase = (type === ">" || type === ">=") ? "smallest integer" : "largest integer";
        return { q: `Solve: ${a}x ${signed(b)} ${type} ${rhs}. What is the ${phrase} value of x that satisfies this?`, a: ansv };
      },
  M960() {
        const a = randInt(-9, 9) || 1, b = randInt(-9, 9) || 1;
        const askConst = Math.random() < 0.5;
        if (askConst) { const c = a * b; if (c < 0 || c > 100) throw 0; return { q: `Expand and simplify (x ${signed(a)})(x ${signed(b)}). What is the constant term?`, a: c }; }
        const coeff = a + b;
        if (coeff < 0 || coeff > 100) throw 0;
        return { q: `Expand and simplify (x ${signed(a)})(x ${signed(b)}). What is the coefficient of x?`, a: coeff };
      },
  M645() {
        const d = choice([2, 3, 4, 5, 6, 8, 10, 12]);
        const a = randInt(1, d - 1), c = randInt(1, d - 1);
        if (Math.random() < 0.5) { const num = a + c; if (num > 100) throw 0; return { q: `${a}/${d} + ${c}/${d} = ?/${d}. What replaces the ?`, a: num }; }
        const hi = Math.max(a, c), lo = Math.min(a, c);
        if (hi === lo) throw 0;
        return { q: `${hi}/${d} - ${lo}/${d} = ?/${d}. What replaces the ?`, a: hi - lo };
      },
  M619() {
        const d = choice([2, 3, 4, 5, 6, 8]);
        const n1 = randInt(1, d - 1), n2 = randInt(1, d - 1);
        const w1 = randInt(1, 20), w2 = randInt(1, 20);
        const wholeSum = w1 + w2 + Math.floor((n1 + n2) / d);
        if (wholeSum > 100) throw 0;
        return { q: `${w1} ${n1}/${d} + ${w2} ${n2}/${d} = ? (give just the whole-number part of the answer)`, a: wholeSum };
      },
  M754() {
        const k = randInt(1, 100);
        return { q: `Simplify (x² + ${k}x)/x by factorising out common factors. The result is x + ?. What number replaces the ?`, a: k };
      },
  M336() {
        const a = randInt(1, 50), b = randInt(1, 50);
        if (Math.random() < 0.5) { const num = a + b; if (num > 100) throw 0; return { q: `${a}/x + ${b}/x = ?/x. What replaces the ?`, a: num }; }
        const hi = Math.max(a, b), lo = Math.min(a, b);
        if (hi === lo) throw 0;
        return { q: `${hi}/x - ${lo}/x = ?/x. What replaces the ?`, a: hi - lo };
      },
  M701() {
        const useNinths = Math.random() < 0.5;
        if (useNinths) {
          const k = randInt(1, 8), n = randInt(1, 10);
          return { q: `${k}/9 = 0.${k}${k}${k}${k}... (recurring). Using recurring decimal notation, what is the ${ordinalSuffix(n)} digit after the decimal point?`, a: k };
        }
        const m = randInt(1, 10);
        const block = String(9 * m).padStart(2, "0");
        const n = randInt(1, 10);
        const digit = Number(n % 2 === 1 ? block[0] : block[1]);
        return { q: `${m}/11 = 0.${block}${block}... (recurring, block "${block}"). What is the ${ordinalSuffix(n)} digit after the decimal point?`, a: digit };
      },
  M922() {
        const type = choice(["ninths", "elevenths", "sixths"]);
        if (type === "ninths") {
          const k = randInt(1, 8), n = randInt(1, 10);
          return { q: `Convert ${k}/9 to a recurring decimal. What is the ${ordinalSuffix(n)} digit after the decimal point?`, a: k };
        }
        if (type === "elevenths") {
          const m = randInt(1, 10);
          const block = String(9 * m).padStart(2, "0");
          const n = randInt(1, 10);
          const digit = Number(n % 2 === 1 ? block[0] : block[1]);
          return { q: `Convert ${m}/11 to a recurring decimal. What is the ${ordinalSuffix(n)} digit after the decimal point?`, a: digit };
        }
        const num = choice([1, 5]);
        const first = num === 1 ? 1 : 8;
        const rep = num === 1 ? 6 : 3;
        const n = randInt(1, 10);
        const digit = n === 1 ? first : rep;
        return { q: `Convert ${num}/6 to a recurring decimal. What is the ${ordinalSuffix(n)} digit after the decimal point?`, a: digit };
      },

  // ---------------------------------------------------------------- Y9 (SOW additions)
  U657() {
      const unit = choice([10, 20, 50]);
      const half = unit / 2;
      const steps = Math.floor(100 / unit);
      const R = randInt(1, steps) * unit;
      const lowerBound = R - half;
      return { q: `A number is rounded to the nearest ${unit} and the result is ${R}. What is the smallest possible value of the original number (the lower bound of the error interval)?`, a: need(lowerBound) };
    },
  U108() {
      const N = randInt(0, 99);
      const frac = randInt(50, 99);
      const decimal = N + frac / 100;
      return { q: `Truncate ${decimal.toFixed(2)} to a whole number (do not round).`, a: need(N) };
    },
  U301() {
      const unit = choice([10, 20, 25, 50]);
      const maxSteps = Math.floor(100 / unit) - 1;
      if (maxSteps < 0) throw 0;
      const T = randInt(0, maxSteps) * unit;
      const upperBound = T + unit;
      return { q: `An integer is truncated to the nearest ${unit}, giving ${T}. What is the largest possible original integer value?`, a: need(upperBound - 1) };
    },
  U743() {
      const a = randInt(1, 5), b = randInt(1, 5), c = randInt(1, 4);
      const vol = a * b * c;
      if (vol > 100) throw 0;
      const unitsPhrase = (n) => (n === 1 ? "1 unit" : `${n} units`);
      return { q: `A cuboid built from unit cubes has a front elevation that is ${unitsPhrase(a)} wide and ${unitsPhrase(b)} tall, and a plan view that is ${unitsPhrase(a)} wide and ${unitsPhrase(c)} deep. How many unit cubes make up the whole cuboid?`, a: need(vol) };
    },
  U385() {
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37], [9, 12, 15]];
      const [p, q, r] = choice(triples);
      const k = randInt(1, Math.max(1, Math.floor(100 / r)));
      const a = p * k, b = q * k, c = r * k;
      if (c > 100) throw 0;
      if (Math.random() < 0.5) return { q: `A right-angled triangle has legs of length ${a} cm and ${b} cm. Find the length of the hypotenuse, in cm.`, a: need(c) };
      return { q: `A right-angled triangle has a hypotenuse of length ${c} cm and one leg of length ${a} cm. Find the length of the other leg, in cm.`, a: need(b) };
    },
  U828() {
      const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37], [9, 12, 15]];
      const [p, q, r] = choice(triples);
      const k = randInt(1, Math.max(1, Math.floor(100 / r)));
      const a = p * k, b = q * k, c = r * k;
      if (c > 100) throw 0;
      const scenario = choice(["ladder", "diagonal", "distance"]);
      if (scenario === "ladder") return { q: `A ${c} m ladder leans against a vertical wall with its foot ${a} m from the base of the wall. How high up the wall does the ladder reach, in metres?`, a: need(b) };
      if (scenario === "diagonal") return { q: `A rectangular field is ${a} m long and ${b} m wide. Find the length of its diagonal, in metres.`, a: need(c) };
      return { q: `Point A is ${a} m east and ${b} m north of point B. What is the direct distance between A and B, in metres?`, a: need(c) };
    },
  U687() {
      let m = randInt(1, 12), n = randInt(1, 12);
      if (gcd(m, n) !== 1) throw 0;
      const k = randInt(2, 8);
      const a = m * k, b = n * k;
      if (Math.random() < 0.5) return { q: `Simplify the ratio ${a}:${b} to its simplest form, giving your answer as ?:${n}. What number replaces the ?`, a: need(m) };
      return { q: `Simplify the ratio ${a}:${b} to its simplest form, giving your answer as ${m}:?. What number replaces the ?`, a: need(n) };
    },
  U577() {
      const p = randInt(1, 9), q = randInt(1, 9);
      const steps = Math.floor(100 / (p + q));
      if (steps < 1) throw 0;
      const unit = randInt(1, steps);
      const total = (p + q) * unit;
      const shareA = p * unit, shareB = q * unit;
      const askA = Math.random() < 0.5;
      return { q: `£${total} is shared in the ratio ${p}:${q}. How much does the ${askA ? "first" : "second"} share receive, in £?`, a: need(askA ? shareA : shareB) };
    },
  U721() {
      const perUnit = randInt(1, 10);
      const n1 = randInt(1, 10), n2 = randInt(1, 10);
      if (n1 === n2) throw 0;
      const cost1 = perUnit * n1, cost2 = perUnit * n2;
      if (cost2 > 100) throw 0;
      return { q: `${n1} identical items cost £${cost1} in total. How much would ${n2} of the same items cost, in £?`, a: need(cost2) };
    },
  U357() {
      const w1 = randInt(1, 10), t1 = randInt(1, 12);
      const k = w1 * t1;
      const divisors = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30].filter((d) => k % d === 0 && d !== w1);
      if (!divisors.length) throw 0;
      const w2 = choice(divisors);
      const t2 = k / w2;
      if (t2 < 1 || t2 > 100) throw 0;
      const peoplePhrase = (n) => (n === 1 ? "1 person" : `${n} people`);
      const hoursPhrase = (n) => (n === 1 ? "1 hour" : `${n} hours`);
      return { q: `It takes ${peoplePhrase(w1)} ${hoursPhrase(t1)} to paint a fence, all working at the same rate. How many hours would it take ${peoplePhrase(w2)} to paint the same fence?`, a: need(t2) };
    },
  U610() {
      const rate10 = randInt(10, 19);
      const pounds = randInt(1, 5) * 10;
      const euros = (pounds / 10) * rate10;
      if (euros > 100) throw 0;
      return { q: `The exchange rate is £1 = €${(rate10 / 10).toFixed(1)}. Convert £${pounds} to euros.`, a: need(euros) };
    },
  U741() {
      const m = choice([-4, -3, -2, -1, 1, 2, 3, 4]);
      const c = randInt(-20, 20);
      const x = randInt(0, 10);
      const y = m * x + c;
      if (y < 0 || y > 100) throw 0;
      return { q: `To plot the graph of y = ${m}x ${signed(c)}, what is the y-coordinate when x = ${x}?`, a: need(y) };
    },
  U315() {
      const m = choice([1, 2, 3, -1, -2, -3, 4, 5]);
      const x1 = randInt(1, 10);
      const c = randInt(0, 50);
      const y1 = m * x1 + c;
      return { q: `A straight line has gradient ${m} and passes through the point (${x1}, ${y1}). Find the y-intercept (the value of c in y = ${m}x + c).`, a: need(c) };
    },
  U669() {
      const m = randInt(1, 20), c = randInt(0, 80);
      if (Math.random() < 0.5) return { q: `A straight line has equation y = ${m}x ${signed(c)}. What is its gradient?`, a: need(m) };
      return { q: `A straight line has equation y = ${m}x ${signed(c)}. What is its y-intercept?`, a: need(c) };
    },
  U151() {
      const speed = randInt(1, 100);
      const time = randInt(1, 5);
      const distance = speed * time;
      const mode = choice(["speed", "distance", "time"]);
      const hoursPhrase = (n) => (n === 1 ? "1 hour" : `${n} hours`);
      if (mode === "speed") return { q: `A car travels ${distance} km in ${hoursPhrase(time)} at a constant speed. What is its speed, in km/h?`, a: need(speed) };
      if (mode === "distance") { if (distance > 100) throw 0; return { q: `A car travels at a constant speed of ${speed} km/h for ${hoursPhrase(time)}. How far does it travel, in km?`, a: need(distance) }; }
      return { q: `A car travels ${distance} km at a constant speed of ${speed} km/h. How long does the journey take, in hours?`, a: need(time) };
    },
  U256() {
      const rate = randInt(1, 20);
      const time = randInt(1, 8);
      const total = rate * time;
      const minPhrase = (n) => (n === 1 ? "1 minute" : `${n} minutes`);
      if (Math.random() < 0.5) {
        if (total > 100) throw 0;
        return { q: `Water flows into a tank at a constant rate of ${rate} litres per minute. How many litres flow in ${minPhrase(time)}?`, a: need(total) };
      }
      return { q: `Water flows into a tank at a constant rate, filling ${total} litres in ${minPhrase(time)}. What is the rate of flow, in litres per minute?`, a: need(rate) };
    },
  U403() {
      const speed = randInt(1, 20);
      const time = randInt(1, 5);
      const distance = speed * time;
      if (distance > 100) throw 0;
      return { q: `A distance-time graph shows a journey at a constant speed of ${speed} km/h. What distance (in km) would be plotted at time = ${time} hours?`, a: need(distance) };
    },
  U914() {
      const speed = randInt(1, 50);
      const t1 = randInt(1, 4), t2 = t1 + randInt(1, 4);
      const d1 = speed * t1, d2 = speed * t2;
      return { q: `A distance-time graph passes through the points (${t1} h, ${d1} km) and (${t2} h, ${d2} km), showing a journey at constant speed. What is the speed, in km/h?`, a: need(speed) };
    },
  U462() {
      const time = choice([1, 2, 4, 5, 10]);
      const speed = randInt(1, Math.floor(100 / time));
      const distance = speed * time;
      const hoursPhrase = time === 1 ? "1 hour" : `${time} hours`;
      return { q: `A distance-time graph shows a straight line from the origin to the point (${hoursPhrase}, ${distance} km). What is the speed shown, in km/h?`, a: need(speed) };
    },
  U966() {
      const s1 = randInt(5, 20), t1 = randInt(1, 3);
      const s2 = randInt(5, 20), t2 = randInt(1, 3);
      const d1 = s1 * t1, d2 = s2 * t2;
      const total = d1 + d2;
      if (total > 100) throw 0;
      const hoursPhrase = (n) => (n === 1 ? "1 hour" : `${n} hours`);
      return { q: `A cyclist travels at ${s1} km/h for ${hoursPhrase(t1)}, then at ${s2} km/h for a further ${hoursPhrase(t2)}. To plot this on a distance-time graph, what total distance (in km) has been covered by the end of the journey?`, a: need(total) };
    },
  U989() {
      const b = randInt(-5, 5), c = randInt(-10, 10), x = randInt(-5, 5);
      const y = x * x + b * x + c;
      if (y < 0 || y > 100) throw 0;
      return { q: `To plot the graph of y = x² ${signed(b)}x ${signed(c)}, what is the y-coordinate when x = ${x}?`, a: need(y) };
    },
  U667() {
      const b = randInt(-9, 9), c = randInt(0, 100);
      return { q: `The graph of y = x² ${signed(b)}x ${signed(c)} crosses the y-axis at one point. What is the y-coordinate of that point?`, a: need(c) };
    },
  U525() {
      const shortOf = randInt(1, 100);
      const bearing = 360 - shortOf;
      return { q: `A bearing is measured with a protractor as ${bearing}°. How many degrees short of a full turn (360°) is this?`, a: need(shortOf) };
    },
  U107() {
      const b1 = randInt(0, 359);
      const diff = randInt(1, 100);
      const b2 = (b1 + diff) % 360;
      const fmt = (n) => String(n).padStart(3, "0");
      return { q: `From a point, the bearing of A is ${fmt(b1)}° and the bearing of B is ${fmt(b2)}°. What is the angle between the two bearings?`, a: need(diff) };
    },
  U196() {
      const x0 = randInt(0, 50), y0 = randInt(0, 50);
      const dx = randInt(-20, 20), dy = randInt(-20, 20);
      const x1 = x0 + dx, y1 = y0 + dy;
      if (x1 < 0 || x1 > 100 || y1 < 0 || y1 > 100) throw 0;
      const askX = Math.random() < 0.5;
      return { q: `Point P(${x0}, ${y0}) is translated by the vector (${dx}, ${dy}). What is the ${askX ? "x" : "y"}-coordinate of the image point?`, a: need(askX ? x1 : y1) };
    },
  U799() {
      const k = randInt(10, 40);
      const x0 = randInt(0, 60);
      const imgX = 2 * k - x0;
      if (imgX < 0 || imgX > 100) throw 0;
      const y0 = randInt(0, 80);
      return { q: `Point P(${x0}, ${y0}) is reflected in the line x = ${k}. What is the x-coordinate of the image point?`, a: need(imgX) };
    },
  U696() {
      const cx = randInt(10, 50), cy = randInt(10, 50);
      const x0 = randInt(0, 60), y0 = randInt(0, 60);
      const imgX = 2 * cx - x0, imgY = 2 * cy - y0;
      if (imgX < 0 || imgX > 100 || imgY < 0 || imgY > 100) throw 0;
      const askX = Math.random() < 0.5;
      return { q: `Point P(${x0}, ${y0}) is rotated 180° about the point (${cx}, ${cy}). What is the ${askX ? "x" : "y"}-coordinate of the image point?`, a: need(askX ? imgX : imgY) };
    },
  U519() {
      if (Math.random() < 0.5) {
        const cx = randInt(0, 20), cy = randInt(0, 20);
        const k = choice([2, 3, 4]);
        const x0 = randInt(0, 10), y0 = randInt(0, 10);
        const imgX = cx + k * (x0 - cx), imgY = cy + k * (y0 - cy);
        if (imgX < 0 || imgX > 100 || imgY < 0 || imgY > 100) throw 0;
        const askX = Math.random() < 0.5;
        return { q: `Point P(${x0}, ${y0}) is enlarged by scale factor ${k} about the centre (${cx}, ${cy}). What is the ${askX ? "x" : "y"}-coordinate of the image point?`, a: need(askX ? imgX : imgY) };
      }
      const original = randInt(2, 10);
      const k = randInt(2, 9);
      const image = original * k;
      if (image > 100) throw 0;
      return { q: `A shape is enlarged by a positive scale factor. A side of length ${original} cm becomes ${image} cm in the image. What is the scale factor?`, a: need(k) };
    },
  M881() {
      const x0 = randInt(0, 30), y0 = randInt(0, 30);
      const dx = randInt(-10, 10), dy = randInt(-10, 10);
      const x1 = x0 + dx, y1 = y0 + dy;
      if (x1 < 0 || y1 < 0) throw 0;
      const k = randInt(20, 50);
      const x2 = 2 * k - x1;
      if (x2 < 0 || x2 > 100) throw 0;
      return { q: `Point P(${x0}, ${y0}) is translated by the vector (${dx}, ${dy}), then the image is reflected in the line x = ${k}. What is the x-coordinate of the final image point?`, a: need(x2) };
    },
  U551() {
      const scale = choice([2, 3, 4, 5]);
      const side = randInt(1, 20);
      const imageSide = side * scale;
      if (imageSide > 100) throw 0;
      return { q: `Shape B is similar to shape A with scale factor ${scale}. A side of shape A is ${side} cm. What is the length of the corresponding side of shape B, in cm?`, a: need(imageSide) };
    },
  U578() {
      const scale = choice([2, 3, 4, 5]);
      const a = randInt(1, 15), c = a * scale;
      const b = randInt(1, 15), d = b * scale;
      if (d > 100) throw 0;
      return { q: `Two similar triangles have one pair of corresponding sides ${a} cm and ${c} cm. Another pair of corresponding sides are ${b} cm and x cm. Find x.`, a: need(d) };
    },
  U790() {
      const a = randInt(1, 30), b = randInt(1, 30);
      const low = Math.abs(a - b) + 1, high = a + b - 1;
      if (low > high) throw 0;
      const c = randInt(low, high);
      const perim = a + b + c;
      if (perim > 100) throw 0;
      return { q: `Triangle ABC has sides ${a} cm, ${b} cm and ${c} cm. Triangle DEF is congruent to triangle ABC. What is the perimeter of triangle DEF, in cm?`, a: need(perim) };
    },
  U866() {
      const A = randInt(40, 70), B = randInt(40, 70);
      const C = 180 - A - B;
      if (C < 0 || C > 100) throw 0;
      return { q: `Triangle ABC has angle A = ${A}° and angle B = ${B}°. Triangle DEF is congruent to triangle ABC, with angle D = angle A and angle E = angle B. What is angle F (in triangle DEF)?`, a: need(C) };
    },
  U187() {
      const a = randInt(1, 30), b = randInt(1, 30);
      const low = Math.abs(a - b) + 1, high = a + b - 1;
      if (low > high) throw 0;
      const c = randInt(low, high);
      const perim = a + b + c;
      if (perim > 100) throw 0;
      return { q: `A triangle is constructed with sides ${a} cm, ${b} cm and ${c} cm using a ruler and compasses. What is its perimeter, in cm?`, a: need(perim) };
    },
  U199() {
      const x = randInt(0, 100), y = randInt(0, 100);
      const askX = Math.random() < 0.5;
      return { q: `On a scatter graph plotting hours revised against test score, one student is plotted at (${x} hours, ${y}%). What ${askX ? "x" : "y"}-value does this represent?`, a: need(askX ? x : y) };
    },
  U277() {
      const m = randInt(1, 5), c = randInt(0, 50);
      const x = randInt(0, 10);
      const y = m * x + c;
      if (y > 100) throw 0;
      return { q: `A line of best fit on a scatter graph has equation y = ${m}x ${signed(c)}. Using this line, what value of y is predicted when x = ${x}?`, a: need(y) };
    },
  U128() {
      const x1 = randInt(0, 10), y1 = randInt(0, 50);
      const m = randInt(1, 5);
      const x2 = x1 + randInt(1, 5);
      const y2 = y1 + m * (x2 - x1);
      const xTarget = x2 + randInt(1, 5);
      const yTarget = y1 + m * (xTarget - x1);
      if (yTarget > 100) throw 0;
      return { q: `A line of best fit passes through (${x1}, ${y1}) and (${x2}, ${y2}). Using this line, estimate the y-value when x = ${xTarget}.`, a: need(yTarget) };
    },
  U322() {
      const discreteExamples = ["number of pets", "shoe size", "number of siblings", "goals scored", "number of cars in a car park", "number of pupils in a class"];
      const continuousExamples = ["height", "weight", "time taken to run 100m", "temperature", "volume of water", "length of a leaf"];
      const n = randInt(6, 12);
      const items = [];
      for (let i = 0; i < n; i++) {
        const type = choice(["discrete", "continuous"]);
        const t = choice(type === "discrete" ? discreteExamples : continuousExamples);
        items.push({ t, type });
      }
      const askType = choice(["discrete", "continuous"]);
      const count = items.filter((i) => i.type === askType).length;
      return { q: `Here is a list of data types: ${items.map((i) => i.t).join(", ")}. How many of these are examples of ${askType} data?`, a: need(count) };
    },
  U571() {
      const categories = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      const vals = categories.map(() => randInt(1, 20));
      const desc = categories.map((c, i) => `${c}: ${vals[i]}`).join(", ");
      if (Math.random() < 0.5) {
        const total = vals.reduce((a, b) => a + b, 0);
        if (total > 100) throw 0;
        return { q: `A bar chart shows the number of sales made each day: ${desc}. What is the total number of sales across the week?`, a: need(total) };
      }
      const diff = Math.max(...vals) - Math.min(...vals);
      return { q: `A bar chart shows the number of sales made each day: ${desc}. What is the difference between the highest and lowest daily sales?`, a: need(diff) };
    },
  U520() {
      const meanA = randInt(10, 80), meanB = randInt(10, 80);
      if (meanA === meanB) throw 0;
      const diff = Math.abs(meanA - meanB);
      return { q: `Class A has a mean test score of ${meanA}%, and Class B has a mean test score of ${meanB}%. By how many percentage points is the higher mean greater than the lower mean?`, a: need(diff) };
    },
  U717() {
      const vals = [randInt(1, 20), randInt(1, 20), randInt(1, 20), randInt(1, 20), randInt(60, 100)];
      const sorted = [...vals].sort((a, b) => a - b);
      const median = sorted[2];
      return { q: `A small data set is: ${vals.join(", ")}. Because of the outlier, the median is a more suitable average than the mean here. What is the median?`, a: need(median) };
    },
  U312() {
      const classes = ["0-10", "11-20", "21-30", "31-40"];
      const freqs = classes.map(() => randInt(1, 15));
      const total = freqs.reduce((a, b) => a + b, 0);
      if (total > 100) throw 0;
      const desc = classes.map((c, i) => `${c}: ${freqs[i]}`).join(", ");
      if (Math.random() < 0.5) return { q: `A grouped frequency table shows: ${desc}. What is the total frequency?`, a: need(total) };
      const idx = randInt(0, classes.length - 1);
      return { q: `A grouped frequency table shows: ${desc}. How many data values fall in the class ${classes[idx]}?`, a: need(freqs[idx]) };
    },
  U877() {
      const midpoints = [5, 15, 25, 35];
      const freqs = midpoints.map(() => randInt(1, 10));
      const totalFreq = freqs.reduce((a, b) => a + b, 0);
      const weightedSum = midpoints.reduce((acc, m, i) => acc + m * freqs[i], 0);
      const mean = weightedSum / totalFreq;
      const rounded = Math.round(mean);
      if (rounded < 0 || rounded > 100) throw 0;
      const desc = midpoints.map((m, i) => `midpoint ${m}, frequency ${freqs[i]}`).join("; ");
      return { q: `A grouped frequency table has these class midpoints and frequencies: ${desc}. Estimate the mean, to the nearest whole number.`, a: need(rounded) };
    },
  U840() {
      const midpoints = [5, 15, 25, 35, 45];
      const freqs = midpoints.map(() => randInt(1, 15));
      const desc = midpoints.map((m, i) => `(${m}, ${freqs[i]})`).join(", ");
      if (Math.random() < 0.5) {
        const total = freqs.reduce((a, b) => a + b, 0);
        if (total > 100) throw 0;
        return { q: `A frequency polygon is plotted using the points ${desc} (class midpoint, frequency). What is the total frequency represented?`, a: need(total) };
      }
      const idx = randInt(0, midpoints.length - 1);
      return { q: `A frequency polygon is plotted using the points ${desc} (class midpoint, frequency). What is the frequency at the point where the midpoint is ${midpoints[idx]}?`, a: need(freqs[idx]) };
    },
  U632() {
      const dx = randInt(-20, 20), dy = randInt(-20, 20);
      if (dx === 0 || dy === 0) throw 0;
      const askX = Math.random() < 0.5;
      const val = askX ? dx : dy;
      const axisDir = askX ? (val > 0 ? "right" : "left") : (val > 0 ? "up" : "down");
      return { q: `A translation is represented by the column vector (${dx}, ${dy}) — top number horizontal, bottom number vertical. How many units ${axisDir} does this translation move a point?`, a: need(Math.abs(val)) };
    },
  U903() {
      const ax = randInt(0, 50), ay = randInt(0, 50);
      const bx = randInt(0, 50), by = randInt(0, 50);
      const op = choice(["+", "-"]);
      const rx = op === "+" ? ax + bx : ax - bx;
      const ry = op === "+" ? ay + by : ay - by;
      if (rx < 0 || rx > 100 || ry < 0 || ry > 100) throw 0;
      const askX = Math.random() < 0.5;
      return { q: `a = (${ax}, ${ay}) and b = (${bx}, ${by}) are column vectors. Find the ${askX ? "horizontal" : "vertical"} component of a ${op} b.`, a: need(askX ? rx : ry) };
    },
  U564() {
      const ax = randInt(0, 20), ay = randInt(0, 20);
      const k = randInt(2, 5);
      const rx = ax * k, ry = ay * k;
      if (rx > 100 || ry > 100) throw 0;
      const askX = Math.random() < 0.5;
      return { q: `a = (${ax}, ${ay}) is a column vector. Find the ${askX ? "horizontal" : "vertical"} component of ${k}a.`, a: need(askX ? rx : ry) };
    },
  U660() {
      const ax = randInt(1, 10), ay = randInt(1, 10);
      const k = randInt(2, 9);
      const bx = ax * k, by = ay * k;
      if (Math.random() < 0.5) {
        if (k > 100) throw 0;
        return { q: `Vector a = (${ax}, ${ay}) and vector b = (${bx}, ${by}). Given that b is parallel to a, what is the scale factor relating a to b (i.e. b = ka, find k)?`, a: need(k) };
      }
      if (by > 100) throw 0;
      return { q: `Vector a = (${ax}, ${ay}) and vector b = (${bx}, ?) are parallel, with b = ${k}a. What is the missing (vertical) component of b?`, a: need(by) };
    },

  // ---------------------------------------------------------------- Y10 (SOW additions)
  U377() {
      const c1 = randInt(-20, 20);
      const m = randInt(1, 9);
      const c2 = randInt(0, 100);
      const x = randInt(-10, 10);
      const y = m * x + c2;
      return { q: `A line has equation y = ${m}x ${signed(c1)}. A second line is parallel to it and passes through (${x}, ${y}). What is the y-intercept of the second line?`, a: c2 };
    },
  U477() {
      const m = randInt(1, 9);
      const c = randInt(0, 100);
      const x = randInt(-10, 10);
      const y = m * x + c;
      return { q: `A line has gradient ${m} and passes through the point (${x}, ${y}). What is its y-intercept?`, a: c };
    },
  U848() {
      const m = randInt(1, 9);
      const c = randInt(-30, 30);
      let x1 = randInt(-10, 10), x2 = randInt(-10, 10);
      if (x1 === x2) throw 0;
      const y1 = m * x1 + c, y2 = m * x2 + c;
      return { q: `A straight line passes through (${x1}, ${y1}) and (${x2}, ${y2}). What is its gradient?`, a: m };
    },
  U898() {
      if (Math.random() < 0.5) {
        const m = randInt(1, 9), c1 = randInt(-20, 20), c2 = randInt(0, 100), x = randInt(-10, 10), y = m * x + c2;
        return { q: `A line has equation y = ${m}x ${signed(c1)}. A second line is parallel to it and passes through (${x}, ${y}). What is the y-intercept of the second line?`, a: c2 };
      }
      const p = randInt(1, 12), q = randInt(2, 12);
      if (U.gcd(p, q) !== 1) throw 0;
      return { q: `A line has gradient ${p}/${q}. A second line is perpendicular to it. Ignoring the sign, what is the numerator of the perpendicular line's gradient?`, a: q };
    },
  U652() {
      const c = randInt(0, 40);
      const m = randInt(1, 5);
      const x = randInt(1, 10);
      const fare = c + m * x;
      if (fare > 100) throw 0;
      return { q: `A taxi journey graph shows a straight line starting at a £${c} fixed charge, then rising by £${m} per mile. Reading the graph, what is the total fare for a ${x}-mile journey, in pounds?`, a: fare };
    },
  U862() {
      const fixed = randInt(0, 40);
      const m = randInt(1, 9);
      const x1 = randInt(1, 8), x2 = x1 + randInt(1, 8);
      const y1 = fixed + m * x1, y2 = fixed + m * x2;
      if (y2 > 200) throw 0;
      return { q: `A real-life graph shows total cost (£) against number of items bought, passing through (${x1}, ${y1}) and (${x2}, ${y2}). What is the gradient of the graph (the cost per item, in £)?`, a: m };
    },
  U896() {
      const r = randInt(2, 10);
      const t = randInt(1, 10);
      const c = r * t;
      if (c > 100) throw 0;
      return { q: `Water flows into an empty tank at a constant rate of ${r} litres per minute, shown as a straight-line graph. After ${t} minutes, how many litres are in the tank?`, a: c };
    },
  U748() {
      const both = randInt(2, 15);
      const onlyA = randInt(2, 20);
      const onlyB = randInt(2, 20);
      const neither = randInt(2, 20);
      const totalF = onlyA + both, totalS = onlyB + both, total = onlyA + onlyB + both + neither;
      const options = [
        { label: "n(F ∩ S)", val: both },
        { label: "n(F ∪ S)", val: onlyA + onlyB + both },
        { label: "n(F')", val: onlyB + neither },
        { label: "n(F ∪ S)'", val: neither },
      ];
      const pick = choice(options);
      return { q: `In a survey of ${total} people, ${totalF} like Football (F) and ${totalS} like Swimming (S); ${both} like both. Using set notation, find ${pick.label}.`, a: pick.val };
    },
  U296() {
      const n = randInt(10, 60);
      const a = randInt(2, 6);
      let b = randInt(2, 6);
      if (a === b) b = b === 6 ? 2 : b + 1;
      const countA = Math.floor(n / a), countB = Math.floor(n / b);
      const lcmAB = a * b / U.gcd(a, b);
      const countBoth = Math.floor(n / lcmAB);
      const options = [
        { label: "n(A)", val: countA },
        { label: "n(B)", val: countB },
        { label: "n(A ∩ B)", val: countBoth },
        { label: "n(A ∪ B)", val: countA + countB - countBoth },
        { label: "n(A')", val: n - countA },
      ];
      const pick = choice(options);
      need(pick.val);
      return { q: `ξ = {1, 2, 3, ..., ${n}}. A = {multiples of ${a}}, B = {multiples of ${b}}. Using set notation, find ${pick.label}.`, a: pick.val };
    },
  U558() {
      const opts = [10, 20, 25, 40, 50, 60, 75, 80, 90, 100];
      const p1 = choice(opts), p2 = choice(opts);
      const val = p1 * p2 / 100;
      if (!Number.isInteger(val) || val > 100) throw 0;
      return { q: `Two independent events happen with probabilities ${p1}% and ${p2}%. Using a tree diagram, what is the probability (as a percentage) that both happen?`, a: val };
    },
  U729() {
      const n = randInt(4, 12);
      const r = randInt(2, n - 1);
      const pct = r * (r - 1) * 100 / (n * (n - 1));
      if (!Number.isInteger(pct)) throw 0;
      return { q: `A bag contains ${n} counters, of which ${r} are red. Two counters are drawn at random without replacement. Using a tree diagram, what is the probability (as a percentage) that both are red?`, a: pct };
    },
  U910() {
      const d = randInt(1, 10), v = randInt(1, 10);
      const m = d * v;
      if (m > 100) throw 0;
      const type = choice(["density", "mass", "volume"]);
      if (type === "density") return { q: `A block has mass ${m} g and volume ${v} cm³. Find its density, in g/cm³.`, a: d };
      if (type === "mass") return { q: `A block has density ${d} g/cm³ and volume ${v} cm³. Find its mass, in g.`, a: m };
      return { q: `A block has mass ${m} g and density ${d} g/cm³. Find its volume, in cm³.`, a: v };
    },
  U527() {
      const p = randInt(1, 10), area = randInt(1, 10);
      const f = p * area;
      if (f > 100) throw 0;
      const type = choice(["pressure", "force", "area"]);
      if (type === "pressure") return { q: `A force of ${f} N acts on an area of ${area} m². Find the pressure, in N/m².`, a: p };
      if (type === "force") return { q: `A pressure of ${p} N/m² acts over an area of ${area} m². Find the force, in N.`, a: f };
      return { q: `A force of ${f} N produces a pressure of ${p} N/m². Find the area, in m².`, a: area };
    },
  U921() {
      const qb1 = choice([2, 3, 4]);
      let qb2 = choice([2, 3, 4]);
      const p = randInt(1, 6), r = randInt(1, 6);
      const L = qb1 * qb2 / U.gcd(qb1, qb2);
      const scale1 = L / qb1, scale2 = L / qb2;
      const A2 = p * scale1, C2 = r * scale2;
      if (A2 > 100 || C2 > 100 || A2 < 1) throw 0;
      if (p === qb1 || qb2 === r) throw 0; // avoid an unsimplified-looking ratio like 4:4
      return { q: `The ratio of red to blue counters is ${p}:${qb1}, and the ratio of blue to green counters is ${qb2}:${r}. If there are ${C2} green counters, how many red counters are there?`, a: Math.round(A2) };
    },
  U676() {
      const a = randInt(2, 9);
      let b = randInt(2, 9);
      if (a === b) throw 0;
      const k = randInt(2, 10);
      const p = randInt(1, 20);
      const x = a * k - p;
      if (x < 0 || x > 100) throw 0;
      const q = b * k - x;
      return { q: `(x ${signed(p)}) : (x ${signed(q)}) = ${a} : ${b}. What is x?`, a: x };
    },
  U865() {
      const a = randInt(2, 6), b = randInt(2, 6);
      if (a === b) throw 0;
      const k = randInt(2, 8);
      const boys = a * k, girls = b * k;
      const d = randInt(1, 20);
      const newGirls = girls + d;
      const g = U.gcd(boys, newGirls);
      const newA = boys / g, newB = newGirls / g;
      if (newB > 100 || newB < 1) throw 0;
      return { q: `The ratio of boys to girls in a club is ${a}:${b}, so there are ${boys} boys and ${girls} girls. ${d} more girls join. What is the new, fully simplified ratio of boys to girls, expressed as ${newA}:? — find the number that replaces the ?`, a: newB };
    },
  U562() {
      const a = randInt(1, 10), t = randInt(1, 10);
      const dv = a * t;
      if (dv > 100) throw 0;
      const v0 = randInt(0, 20);
      return { q: `A velocity-time graph shows velocity increasing from ${v0} m/s to ${v0 + dv} m/s over ${t} seconds. What is the acceleration, in m/s²?`, a: a };
    },
  U937() {
      const v0 = randInt(0, 50), a = randInt(1, 5), t = randInt(1, 10);
      const v = v0 + a * t;
      if (v > 100) throw 0;
      return { q: `An object starts at ${v0} m/s and accelerates at ${a} m/s², shown as a straight-line velocity-time graph. What is its velocity after ${t} seconds?`, a: v };
    },
  U980() {
      const x = randInt(0, 4), c = randInt(0, 20);
      const y = x * x * x + c;
      if (y > 100) throw 0;
      return { q: `For the curve y = x³ ${signed(c)}, what is y when x = ${x}?`, a: y };
    },
  U593() {
      const x = randInt(2, 10), y = randInt(1, 10);
      const k = x * y;
      return { q: `The graph of y = ${k}/x is drawn. What is y when x = ${x}?`, a: y };
    },
  U229() {
      const b = choice([2, 3]);
      const a = b === 2 ? randInt(1, 5) : randInt(1, 3);
      const x = b === 2 ? randInt(0, 4) : randInt(0, 3);
      const y = a * Math.pow(b, x);
      if (y > 100) throw 0;
      return { q: `The graph of y = ${a} × ${b}^x is drawn. What is y when x = ${x}?`, a: y };
    },
  U498() {
      const target = randInt(0, 100), m = randInt(2, 9), n = randInt(1, 15);
      const c = target - m * n;
      const rule = c === 0 ? `${m}n` : `${m}n ${signed(c)}`;
      return { q: `The nth term of a sequence is ${rule}. What is the ${ordinalSuffix(n)} term?`, a: target };
    },
  U978() {
      const m = randInt(2, 9), c = randInt(0, 15);
      const start = m + c;
      const terms = [start, start + m, start + 2 * m];
      const n = randInt(5, 10);
      const nthTerm = m * n + c;
      if (nthTerm > 100) throw 0;
      return { q: `A pattern has ${terms.join(", ")} tiles in its first three terms, growing by the same number of tiles each time. How many tiles will the ${ordinalSuffix(n)} term have?`, a: nthTerm };
    },
  U958() {
      const r = choice([2, 3]);
      const a = randInt(1, 5);
      const maxN = r === 2 ? 6 : 4;
      const n = randInt(1, maxN);
      const term = a * Math.pow(r, n - 1);
      if (term > 100) throw 0;
      return { q: `A geometric sequence has first term ${a} and common ratio ${r}. What is the ${ordinalSuffix(n)} term?`, a: term };
    },
  U162() {
      const q = randInt(2, 10);
      let p = randInt(1, q - 1);
      if (U.gcd(p, q) !== 1) throw 0;
      const basePop = randInt(5, 20);
      const N = q * basePop, stratumSize = p * basePop;
      const m = randInt(2, 10);
      const sampleSize = q * m;
      const answer = p * m;
      if (sampleSize >= N || answer > 100) throw 0;
      return { q: `A school has ${N} students, of which ${stratumSize} are in Year 10. A stratified sample of ${sampleSize} students is taken from the whole school. How many Year 10 students should be in the sample?`, a: answer };
    },
  U640() {
      const k = randInt(2, 9), x1 = randInt(1, 10), x2 = randInt(1, 10);
      const y1 = k * x1, y2 = k * x2;
      if (y1 > 100 || y2 > 100) throw 0;
      return { q: `The equation y = ${k}x shows direct proportion between x and y. When x = ${x1}, y = ${y1}. What is y when x = ${x2}?`, a: y2 };
    },
  U364() {
      const y2 = randInt(1, 100), x2 = randInt(1, 10);
      const k = x2 * y2;
      return { q: `The equation y = ${k}/x shows inverse proportion between x and y. What is y when x = ${x2}?`, a: y2 };
    },
  U238() {
      if (Math.random() < 0.5) {
        const k = randInt(2, 9), x = randInt(1, 11);
        const y = k * x;
        if (y > 100) throw 0;
        return { q: `A straight-line graph shows direct proportion between x and y, passing through the point (${x}, ${y}). What is the gradient of the graph?`, a: k };
      }
      const k = randInt(2, 100), x = choice([1, 2, 3, 4, 5, 6, 8, 10].filter((d) => k % d === 0));
      const y = k / x;
      return { q: `A reciprocal graph has equation y = ${k}/x. What is y when x = ${x}?`, a: y };
    },
  U766() {
      const x0 = randInt(-20, 20), y0 = randInt(-20, 20);
      const target = randInt(0, 100);
      const b = target + y0;
      const a = randInt(-20, 20);
      return { q: `Point P(${x0}, ${y0}) is reflected in the x-axis, then translated by the vector (${a}, ${b}). What is the y-coordinate of the image?`, a: target };
    },
  U235() {
      const base = choice([2, 3, 4, 5, 10]);
      const m = randInt(2, 6), n = randInt(2, 4);
      const result = m * n;
      if (result <= 0 || result > 100) throw 0;
      return { q: `Simplify (${base}^${m})^${n}, giving your answer as ${base}^? — what is the index?`, a: result };
    },
  U694() {
      const m = randInt(1, 5), n = randInt(m + 1, 9);
      const result = n - m;
      if (result <= 0 || result > 100) throw 0;
      return { q: `Simplify x^${m} ÷ x^${n}, giving your answer as x^-?. What number replaces the ? (the missing index)?`, a: result };
    },
  U768() {
      const a = randInt(1, 6), b = randInt(1, 6);
      const p = randInt(1, 9) * choice([1, -1]);
      const q = randInt(1, 9) * choice([1, -1]);
      const constant = p * q, coeffX = a * q + b * p;
      const options = [];
      if (constant >= 0 && constant <= 100) options.push({ label: "constant term", val: constant });
      if (coeffX >= 0 && coeffX <= 100) options.push({ label: "coefficient of x", val: coeffX });
      if (!options.length) throw 0;
      const pick = choice(options);
      return { q: `Expand and simplify (${xTerm(a, "x")} ${signed(p)})(${xTerm(b, "x")} ${signed(q)}). What is the ${pick.label} in the expanded expression?`, a: pick.val };
    },
  U200() {
      const n = randInt(6, 12);
      const values = [];
      for (let i = 0; i < n; i++) values.push(randInt(10, 99));
      const stems = [...new Set(values.map((v) => Math.floor(v / 10)))];
      const stem = choice(stems);
      const count = values.filter((v) => Math.floor(v / 10) === stem).length;
      return { q: `A data set is: ${values.join(", ")}. If these are drawn as a stem-and-leaf diagram (stem = tens digit), how many values would be on the stem ${stem} row (i.e. ${stem}0–${stem}9)?`, a: count };
    },
  U909() {
      const numStems = randInt(2, 4);
      const stemVals = new Set();
      while (stemVals.size < numStems) stemVals.add(randInt(1, 9));
      const stems = [...stemVals];
      const allValues = [];
      const descriptions = stems.map((s) => {
        const leafCount = randInt(2, 5);
        const leaves = []; for (let i = 0; i < leafCount; i++) leaves.push(randInt(0, 9));
        leaves.sort((x, y) => x - y);
        leaves.forEach((l) => allValues.push(s * 10 + l));
        return `stem ${s} (leaves ${leaves.join(", ")})`;
      });
      const max = Math.max(...allValues), min = Math.min(...allValues);
      const range = max - min;
      if (range > 100) throw 0;
      return { q: `A stem-and-leaf diagram (stem = tens digit) shows: ${descriptions.join("; ")}. What is the range of the data?`, a: range };
    },
  U590() {
      const n = randInt(4, 8);
      const values = []; for (let i = 0; i < n; i++) values.push(randInt(0, 100));
      const hourAsked = randInt(1, n);
      const readout = values.map((v, i) => `Hour ${i + 1}: ${v}`).join(", ");
      return { q: `The table shows the temperature (°C) recorded each hour: ${readout}. To plot this as a line graph, what value would be plotted at Hour ${hourAsked}?`, a: values[hourAsked - 1] };
    },
  U193() {
      const n = randInt(4, 8);
      const values = []; for (let i = 0; i < n; i++) values.push(randInt(0, 100));
      let d1 = randInt(1, n), d2 = randInt(1, n);
      if (d1 === d2) throw 0;
      const diff = Math.abs(values[d1 - 1] - values[d2 - 1]);
      const readout = values.map((v, i) => `Day ${i + 1}: ${v}`).join(", ");
      return { q: `A line graph shows the number of ice creams sold each day: ${readout}. What is the difference between the number sold on Day ${d1} and Day ${d2}?`, a: diff };
    },
  U206() {
      const a = randInt(1, 3);
      const b = randInt(1, 5) * choice([1, -1]);
      const c = randInt(1, 10) * choice([1, -1]);
      const n = randInt(1, 8);
      const term = a * n * n + b * n + c;
      if (!Number.isInteger(term) || term < 0 || term > 100) throw 0;
      return { q: `The nth term of a sequence is ${xTerm(a, "n²")} ${signed(b)}n ${signed(c)}. What is the ${ordinalSuffix(n)} term?`, a: term };
    },
  U680() {
      const type = choice(["triangular", "square", "cube"]);
      if (type === "triangular") { const n = randInt(1, 13); return { q: `What is the ${ordinalSuffix(n)} triangular number?`, a: n * (n + 1) / 2 }; }
      if (type === "square") { const n = randInt(1, 10); return { q: `What is the ${ordinalSuffix(n)} square number?`, a: n * n }; }
      const n = randInt(1, 4); return { q: `What is the ${ordinalSuffix(n)} cube number?`, a: n * n * n };
    },
  U328() {
      const N = randInt(20, 100);
      const divisors = [];
      for (let d = 2; d <= 20; d++) if (N % d === 0) divisors.push(d);
      if (!divisors.length) throw 0;
      const n1 = choice(divisors);
      const q0 = N / n1;
      const m = randInt(1, Math.min(n1, 10));
      const n2 = q0 * m;
      if (n2 < 1 || n2 > 300) throw 0;
      return { q: `In a capture-recapture survey, ${n1} fish are caught, tagged, and released. Later, ${n2} fish are caught, of which ${m} are found to be tagged. Using N = (first sample × second sample) ÷ tagged recaptured, estimate the total population N.`, a: N };
    },
  U407() {
      const k = randInt(2, 9), x = randInt(1, 10);
      const y = k * x;
      return { q: `y is directly proportional to x. When x = ${x}, y = ${y}. Writing the equation connecting y and x in the form y = kx, what is the value of k?`, a: k };
    },
  U138() {
      const k = randInt(2, 100);
      const divisors = [1, 2, 3, 4, 5, 6, 8, 10].filter((d) => k % d === 0);
      const x = choice(divisors);
      const y = k / x;
      return { q: `y is inversely proportional to x. When x = ${x}, y = ${y}. Writing the equation connecting y and x in the form y = k/x, what is the value of k?`, a: k };
    },
  U134() {
      const k = choice([-3, -2, 2, 3]);
      const maxAbsX = Math.floor(100 / Math.abs(k));
      const x0 = k > 0 ? randInt(0, maxAbsX) : randInt(-maxAbsX, 0);
      const y0 = randInt(-10, 10);
      const imageX = k * x0;
      if (imageX < 0 || imageX > 100) throw 0;
      return { q: `Point P(${x0}, ${y0}) is enlarged by scale factor ${k} about the origin. What is the x-coordinate of the image?`, a: imageX };
    },
  U587() {
      const askUpper = Math.random() < 0.5;
      if (Math.random() < 0.5) {
        const roundedVal = randInt(1, 9) * 10;
        const bound = askUpper ? roundedVal + 5 : roundedVal - 5;
        if (bound < 0 || bound > 100) throw 0;
        return { q: `A length is measured as ${roundedVal} cm, correct to the nearest 10 cm. What is the ${askUpper ? "upper" : "lower"} bound of the actual length, in cm?`, a: bound };
      }
      const val1 = randInt(1, 5) * 10, val2 = randInt(1, 5) * 10;
      const bound1 = askUpper ? val1 + 5 : val1 - 5;
      const bound2 = askUpper ? val2 + 5 : val2 - 5;
      const total = bound1 + bound2;
      if (total < 0 || total > 100) throw 0;
      return { q: `Two lengths are measured as ${val1} cm and ${val2} cm, each correct to the nearest 10 cm. What is the ${askUpper ? "upper" : "lower"} bound for their total length, in cm?`, a: total };
    },
  U299() {
      if (Math.random() < 0.5) {
        const n = randInt(2, 99);
        if (U.isPerfectSquare(n)) throw 0;
        return { q: `√${n} lies between two consecutive whole numbers. What is the smaller one?`, a: Math.floor(Math.sqrt(n)) };
      }
      const n = randInt(2, 99);
      const cr = Math.round(Math.cbrt(n));
      if (Math.pow(cr, 3) === n) throw 0;
      return { q: `The cube root of ${n} lies between two consecutive whole numbers. What is the smaller one?`, a: Math.floor(Math.cbrt(n)) };
    },
  U985() {
      const n = choice([2, 3, 4]);
      const r = randInt(2, 5);
      const a = Math.pow(r, n);
      return { q: `${a}^(1/${n}) = ?`, a: r };
    },
  U772() {
      const n = choice([2, 3]);
      const r = randInt(2, 4);
      const m = n === 2 ? 3 : 2;
      const a = Math.pow(r, n);
      const result = Math.pow(r, m);
      if (result > 100) throw 0;
      return { q: `${a}^(${m}/${n}) = ?`, a: result };
    },
  U550() {
      const d = choice([3, 6, 7, 9, 11, 13]);
      const n = randInt(1, d - 1);
      if (U.gcd(n, d) !== 1) throw 0;
      let remainder = n;
      const digits = [];
      for (let i = 0; i < 12; i++) { remainder *= 10; digits.push(Math.floor(remainder / d)); remainder %= d; }
      const pos = randInt(1, 8);
      return { q: `Convert ${n}/${d} to a decimal using a written method. What is the ${ordinalSuffix(pos)} digit after the decimal point?`, a: digits[pos - 1] };
    },
  U689() {
      if (Math.random() < 0.5) {
        const r = randInt(1, 8);
        const [, den] = simplifyFraction(r, 9);
        return { q: `Write the recurring decimal 0.${r}${r}${r}... (the digit ${r} recurring) as a fraction in its simplest form. What is the denominator?`, a: den };
      }
      const ab = randInt(10, 98);
      const [, den] = simplifyFraction(ab, 99);
      return { q: `Write the recurring decimal 0.${ab}${ab}... (the two digits ${ab} recurring) as a fraction in its simplest form. What is the denominator?`, a: den };
    },
  U606() {
      const p = randInt(1, 5), q = randInt(1, 5), r = randInt(1, 5);
      const constant = p * q * r, coeffX2 = p + q + r;
      if (Math.random() < 0.5) {
        if (constant > 100) throw 0;
        return { q: `Expand and simplify (x + ${p})(x + ${q})(x + ${r}). What is the constant term?`, a: constant };
      }
      return { q: `Expand and simplify (x + ${p})(x + ${q})(x + ${r}). What is the coefficient of x²?`, a: coeffX2 };
    },
  U397() {
      const half = randInt(1, 10);
      const b = 2 * half;
      const k = randInt(0, 100);
      const c = k + half * half;
      return { q: `x² + ${b}x + ${c} can be written in the form (x + ${half})² + k. What is the value of k?`, a: k };
    },
  U858() {
      const p = randInt(1, 4), r = randInt(1, 4);
      const q = randInt(1, 9), s = randInt(1, 9);
      const a = p * r, b = p * s + q * r, c = q * s;
      if (c > 100) throw 0;
      return { q: `${xTerm(a, "x²")} ${signed(b)}x + ${c} = (${xTerm(p, "x")} + ${q})(${xTerm(r, "x")} + ?). What number replaces the ?`, a: s };
    },
  U769() {
      const half = randInt(1, 10);
      const b = 2 * half * choice([1, -1]);
      const minY = randInt(0, 100);
      const c = minY + half * half;
      return { q: `The graph of y = x² ${signed(b)}x + ${c} has a minimum turning point (found by completing the square). What is the y-coordinate of the turning point?`, a: minY };
    },
  U182() {
      const freqs = [randInt(1, 20), randInt(1, 20), randInt(1, 20), randInt(1, 20)];
      const total = freqs.reduce((s, f) => s + f, 0);
      if (total > 100) throw 0;
      const boundaries = [10, 20, 30, 40];
      const k = randInt(1, 4);
      const cum = freqs.slice(0, k).reduce((s, f) => s + f, 0);
      return { q: `A grouped frequency table has these frequencies: 0–10: ${freqs[0]}, 10–20: ${freqs[1]}, 20–30: ${freqs[2]}, 30–40: ${freqs[3]}. When drawing a cumulative frequency graph, what cumulative frequency would be plotted at ${boundaries[k - 1]}?`, a: cum };
    },
  U642() {
      const total = choice([40, 50, 60, 80, 100]);
      const cf1 = randInt(1, total - 1);
      const cf2 = randInt(cf1 + 1, total);
      const x1 = randInt(10, 40), x2 = x1 + randInt(10, 40);
      return { q: `A cumulative frequency graph reaches a total frequency of ${total}. At x = ${x1}, the cumulative frequency is ${cf1}; at x = ${x2}, it is ${cf2}. How many data values lie between x = ${x1} and x = ${x2}?`, a: cf2 - cf1 };
    },
  U879() {
      const n = choice([7, 9, 11]);
      const values = []; for (let i = 0; i < n; i++) values.push(randInt(1, 100));
      values.sort((x, y) => x - y);
      return { q: `To draw a box plot, this data set is used: ${values.join(", ")}. What is the median?`, a: values[(n - 1) / 2] };
    },
  U837() {
      const min = randInt(0, 20);
      const q1 = min + randInt(1, 20);
      const med = q1 + randInt(1, 20);
      const q3 = med + randInt(1, 20);
      const max = q3 + randInt(1, 20);
      if (max > 100) throw 0;
      if (Math.random() < 0.5) {
        return { q: `A box plot shows: minimum = ${min}, lower quartile = ${q1}, median = ${med}, upper quartile = ${q3}, maximum = ${max}. What is the interquartile range (IQR) of the data?`, a: q3 - q1 };
      }
      return { q: `A box plot shows: minimum = ${min}, lower quartile = ${q1}, median = ${med}, upper quartile = ${q3}, maximum = ${max}. What is the range of the data?`, a: max - min };
    },
  U507() {
      const medA = randInt(0, 100);
      const medB = randInt(0, 100);
      return { q: `Box plot A has median ${medA} and box plot B has median ${medB}. What is the difference between the two medians?`, a: Math.abs(medA - medB) };
    },

  // ---------------------------------------------------------------- Y11 (SOW additions)
  U771: () => {
      if (Math.random() < 0.5) {
        const r = randInt(1, 3), l = randInt(r + 1, r + 8), sa = Math.PI * r * (r + l);
        const rounded = Math.round(sa); if (rounded > 100) throw 0;
        return { q: `Find the surface area of a cone with radius ${r} cm and slant height ${l} cm, to the nearest whole number (use π).`, a: rounded };
      }
      const r = randInt(1, 2), sa = 4 * Math.PI * r * r, rounded = Math.round(sa);
      if (rounded > 100) throw 0;
      return { q: `Find the surface area of a sphere with radius ${r} cm, to the nearest whole number (use π).`, a: rounded };
    },
  U426: () => {
      if (Math.random() < 0.5) {
        const r = randInt(1, 3), h = randInt(2, 10), vol = (1 / 3) * Math.PI * r * r * h, rounded = Math.round(vol);
        if (rounded > 100) throw 0;
        return { q: `Find the volume of a cone with radius ${r} cm and height ${h} cm, to the nearest whole number (use π).`, a: rounded };
      }
      const r = randInt(1, 2), vol = (4 / 3) * Math.PI * Math.pow(r, 3), rounded = Math.round(vol);
      if (rounded > 100) throw 0;
      return { q: `Find the volume of a sphere with radius ${r} cm, to the nearest whole number (use π).`, a: rounded };
    },
  U508: () => {
      const total = choice(PIE_DIVISORS), unitAngle = 360 / total;
      const maxF = Math.floor(100 / unitAngle);
      if (maxF < 1) throw 0;
      const f = randInt(1, Math.min(total - 1, maxF));
      const angle = f * unitAngle;
      need(angle);
      const peoplePhrase = f === 1 ? "1 person" : `${f} people`;
      return { q: `A survey of ${total} people is shown on a pie chart. ${peoplePhrase} chose a particular option. What angle, in degrees, should be drawn for that option's sector?`, a: angle };
    },
  U172: () => {
      const f = randInt(1, 100);
      const k = choice([2, 3, 4, 5, 6, 8, 9, 10]);
      const total = f * k, angle = 360 / k;
      return { q: `A pie chart shows the results of a survey of ${total} people. One sector, representing a particular option, has an angle of ${angle}°. How many people chose that option?`, a: f };
    },
  U683: () => {
      const pA = randInt(5, 45), pB = randInt(5, 45);
      if (pA + pB > 100) throw 0;
      if (Math.random() < 0.5) {
        return { q: `Events A and B are mutually exclusive. P(A) = ${pA}% and P(B) = ${pB}%. What is P(A or B), as a percentage?`, a: pA + pB };
      }
      return { q: `Events A and B are mutually exclusive. P(A) = ${pA}% and P(B) = ${pB}%. What is the percentage probability that neither A nor B happens?`, a: 100 - pA - pB };
    },
  U104: () => {
      const a = randInt(2, 10), b = randInt(2, 10), total = a * b;
      if (total > 100) throw 0;
      return { q: `A sample space diagram is drawn for two spinners: one with ${a} equally likely sections and one with ${b} equally likely sections. How many equally likely outcomes are there in total in the sample space?`, a: total };
    },
  U781: () => {
      const a1 = randInt(0, 100), b1raw = randInt(0, 100);
      let b1 = b1raw; if ((a1 + b1) % 2 !== 0) b1 = b1 < 100 ? b1 + 1 : b1 - 1;
      const mx = (a1 + b1) / 2; need(mx);
      const a2 = randInt(-20, 20), b2 = randInt(-20, 20);
      return { q: `In triangle OAB, the position vectors of A and B relative to O are a = (${a1}, ${a2}) and b = (${b1}, ${b2}). M is the midpoint of AB. What is the x-coordinate of the position vector of M?`, a: mx };
    },
  U633: () => {
      const bases = [2, 3, 5, 6, 7, 10, 11, 13];
      const k = choice(bases);
      if (Math.random() < 0.5) {
        const p = randInt(1, 9), q = randInt(1, 9), ans = p * q * k;
        need(ans);
        return { q: `Simplify ${p}√${k} × ${q}√${k}, giving your answer as an integer.`, a: ans };
      }
      const q = randInt(1, 6), mult = randInt(1, 6), p = q * mult;
      return { q: `Simplify ${p}√${k} ÷ ${q}√${k}, giving your answer as an integer.`, a: mult };
    },
  U338: () => {
      const squarefree = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];
      const k = randInt(2, 10), m = choice(squarefree), a = k * k * m;
      return { q: `√${a} simplifies to k√${m}. What is k?`, a: k };
    },
  U872: () => {
      const bases = [2, 3, 5, 6, 7, 10, 11, 13];
      const k = choice(bases), p = randInt(1, 50), q = randInt(1, 50);
      if (Math.random() < 0.5) {
        const ans = p + q; need(ans);
        return { q: `${p}√${k} + ${q}√${k} = ?√${k}. What number replaces the ?`, a: ans };
      }
      if (p === q) throw 0;
      const ans = Math.abs(p - q); need(ans);
      return { q: `${Math.max(p, q)}√${k} - ${Math.min(p, q)}√${k} = ?√${k}. What number replaces the ?`, a: ans };
    },
  U499: () => {
      const p = randInt(2, 12), k = randInt(2, 50);
      if (U.isPerfectSquare(k)) throw 0;
      const ans = p * p - k; need(ans);
      return { q: `Expand and simplify (${p} + √${k})(${p} - √${k}). Give your answer as an integer.`, a: ans };
    },
  U707: () => {
      const k = randInt(2, 20);
      if (U.isPerfectSquare(k)) throw 0;
      const m = randInt(1, 10), c = m * k;
      return { q: `Rationalise the denominator of ${c}/√${k}, giving your answer in the form m√${k}. What is m?`, a: m };
    },
  U281: () => {
      const p = randInt(2, 12), k = randInt(2, 50);
      if (U.isPerfectSquare(k)) throw 0;
      const den = p * p - k; need(den);
      return { q: `The fraction 1/(${p} + √${k}) is rationalised by multiplying top and bottom by (${p} - √${k}). What is the resulting denominator?`, a: den };
    },
  U437: () => {
      const k = randInt(2, 9), m = randInt(1, 20);
      return { q: `Simplify (${k}x + ${k * m})/${k} by factorising the numerator. The result is x + ?. What number replaces the ?`, a: need(m) };
    },
  U294: () => {
      const p = randInt(1, 20), q = randInt(1, 20);
      if (p === q) throw 0;
      const b = p + q, c = p * q; need(q);
      return { q: `Simplify (x² + ${b}x + ${c})/(x + ${p}) by factorising the numerator. The result is x + ?. What number replaces the ?`, a: q };
    },
  U685: () => {
      const a = randInt(2, 6), b = randInt(2, 6);
      if (a === b) throw 0;
      const p = randInt(1, 9), q = randInt(1, 9);
      const numerator = p * b + q * a; need(numerator);
      return { q: `Write ${p}/(${a}x) + ${q}/(${b}x) as a single fraction: ?/(${a * b}x). What is the numerator?`, a: numerator };
    },
  U457: () => {
      const a = randInt(1, 9), b = randInt(1, 9), c = randInt(1, 9), d = randInt(1, 9);
      const num = a * c, den = b * d;
      const [, dd] = simplifyFraction(num, den); need(dd);
      return { q: `Simplify (${a}x)/${b} × ${c}/(${d}x), giving your answer as a fraction in its simplest form. What is the denominator?`, a: dd };
    },
  U824: () => {
      const a = randInt(1, 9), b = randInt(1, 9), c = randInt(1, 9), d = randInt(1, 9);
      const num = a * d, den = b * c;
      const [, dd] = simplifyFraction(num, den); need(dd);
      return { q: `Simplify (${a}x)/${b} ÷ (${c}x)/${d}, giving your answer as a fraction in its simplest form. What is the denominator?`, a: dd };
    },
  U960: () => {
      const x1 = randInt(-5, 12), x2r = randInt(-5, 12);
      if (x1 === x2r) throw 0;
      const a = randInt(2, 4);
      const b = -a * (x1 + x2r), c = a * x1 * x2r;
      const ans = Math.max(x1, x2r); need(ans);
      return { q: `Solve: ${a}x² ${signed(b)}x ${signed(c)} = 0. What is the larger solution for x?`, a: ans };
    },
  U589: () => {
      const m = randInt(-9, 9), k = randInt(1, 9);
      const c = m * m - k * k, b = 2 * m, q = k * k;
      return { q: `x² ${signed(b)}x ${signed(c)} = 0 is to be solved by completing the square, giving (x ${signed(m)})² = q. What is q?`, a: need(q) };
    },
  U665: () => {
      const a = randInt(1, 5), b = randInt(-15, 15), c = randInt(-15, 15);
      const d = b * b - 4 * a * c; need(d);
      return { q: `The equation ${a}x² ${signed(b)}x ${signed(c)} = 0 is to be solved using the quadratic formula. What is the value of the discriminant, b² - 4ac?`, a: d };
    },
  U150: () => {
      const k = randInt(1, 99);
      const N = k * (k + 1);
      return { q: `Two consecutive positive integers multiply together to give ${N}. By constructing and solving a quadratic equation, find the larger of the two integers.`, a: need(k + 1) };
    },
  U547: () => {
      const x1 = randInt(-8, 12), x2 = randInt(-8, 12);
      if (x1 === x2) throw 0;
      const m = x1 + x2, c = -(x1 * x2);
      const ans = Math.max(x1, x2); need(ans);
      return { q: `Solve simultaneously: y = x² and y = ${m}x ${signed(c)}. What is the larger value of x where the two graphs intersect?`, a: ans };
    },
  U875: () => {
      const x1 = randInt(0, 49), x2 = randInt(0, 49);
      if (x1 === x2) throw 0;
      const m = x1 + x2, c = -(x1 * x2);
      need(m);
      return { q: `The graphs of y = x² and y = ${m}x ${signed(c)} intersect at two points. What is the sum of the x-coordinates of the two intersection points?`, a: m };
    },
  U319: () => {
      const table = [
        ["sin", 0, 0], ["sin", 30, 25], ["sin", 45, 50], ["sin", 60, 75], ["sin", 90, 100],
        ["cos", 0, 100], ["cos", 30, 75], ["cos", 45, 50], ["cos", 60, 25], ["cos", 90, 0],
      ];
      const [func, angle, pct] = choice(table);
      return { q: `Without using a calculator, evaluate ${func}²(${angle}°) as a percentage.`, a: pct };
    },
  U450: () => {
      const func = choice(["sin", "cos", "tan"]);
      const period = func === "tan" ? 180 : 360;
      const base = randInt(0, Math.min(100, period - 1));
      const k = randInt(1, 3);
      const x = base + period * k;
      return { q: `The graph of y = ${func}(x°) repeats every ${period}°. If x = ${x}°, at what smaller value of x (between 0° and ${period}°) does ${func}(x°) have the same value?`, a: base };
    },
  U952: () => {
      const A = randInt(20, 80), maxB = 179 - A;
      if (maxB < 20) throw 0;
      const B = randInt(20, Math.min(120, maxB));
      const a = randInt(10, 90);
      const b = a * Math.sin(B * Math.PI / 180) / Math.sin(A * Math.PI / 180);
      const rounded = Math.round(b); need(rounded);
      return { q: `In triangle ABC, angle A = ${A}°, angle B = ${B}°, and side a (opposite angle A) = ${a} cm. Use the sine rule to find side b (opposite angle B), to the nearest whole number.`, a: rounded };
    },
  U591: () => {
      const a = randInt(5, 40), b = randInt(5, 40), C = randInt(20, 150);
      const c2 = a * a + b * b - 2 * a * b * Math.cos(C * Math.PI / 180);
      if (c2 < 0) throw 0;
      const rounded = Math.round(Math.sqrt(c2)); need(rounded);
      return { q: `In triangle ABC, side a = ${a} cm, side b = ${b} cm, and the angle between them, C, = ${C}°. Use the cosine rule to find side c, to the nearest whole number.`, a: rounded };
    },
  U592: () => {
      const a = randInt(3, 20), b = randInt(3, 20), C = randInt(10, 170);
      const area = 0.5 * a * b * Math.sin(C * Math.PI / 180);
      const rounded = Math.round(area); need(rounded);
      return { q: `Triangle ABC has side a = ${a} cm, side b = ${b} cm, and the angle between them, C, = ${C}°. Find its area, to the nearest whole number, using the formula Area = ½ab sin(C).`, a: rounded };
    },
  U541: () => {
      const [l, w, h, d] = choice(CUBOID_TRIPLES);
      return { q: `A cuboid has dimensions ${l} cm × ${w} cm × ${h} cm. Find the length of its longest diagonal (the space diagonal), in cm.`, a: d };
    },
  U170: () => {
      const l = randInt(2, 20), w = randInt(2, 20), h = randInt(2, 20);
      const base = Math.sqrt(l * l + w * w);
      const angle = Math.atan(h / base) * 180 / Math.PI;
      const rounded = Math.round(angle); need(rounded);
      return { q: `A cuboid has a base ${l} cm by ${w} cm and height ${h} cm. Find the angle between the cuboid's space diagonal and its base, to the nearest whole number.`, a: rounded };
    },
  U459: () => {
      if (Math.random() < 0.5) {
        const x = randInt(10, 50);
        return { q: `Points A, B and C lie on a circle with centre O. The angle at the circumference, angle ACB, is ${x}°. What is the angle at the centre, angle AOB?`, a: need(2 * x) };
      }
      const y = randInt(10, 45) * 2;
      return { q: `Points A, B and C lie on a circle with centre O. The angle at the centre, angle AOB, is ${y}°. What is the angle at the circumference, angle ACB?`, a: y / 2 };
    },
  U251: () => {
      if (Math.random() < 0.5) {
        const other = randInt(80, 100);
        const known = 180 - other;
        return { q: `ABCD is a cyclic quadrilateral. Angle A = ${known}°. What is the size of angle C, the angle opposite it?`, a: need(other) };
      }
      const x = randInt(5, 100);
      return { q: `Points A, B, C and D lie on a circle. Angle ACB and angle ADB are angles in the same segment, both subtended by arc AB. If angle ACB = ${x}°, what is angle ADB?`, a: x };
    },
  U489: () => {
      const ans = randInt(10, 100);
      const central = 180 - ans;
      return { q: `Two tangents are drawn from an external point P to a circle with centre O, touching the circle at A and B. The angle AOB at the centre is ${central}°. Given that a tangent meets a radius at 90°, find the angle APB between the two tangents.`, a: ans };
    },
  U130: () => {
      const x = randInt(5, 100);
      return { q: `A tangent touches a circle at point A, and a chord AB is drawn from A. The angle between the tangent and the chord AB is ${x}°. By the alternate segment theorem, what is the angle in the alternate segment (angle ACB, for a point C on the major arc)?`, a: x };
    },
  U185: () => {
      const w = choice([2, 4, 5, 10]), density = randInt(1, 20);
      const freq = density * w;
      return { q: `A histogram with equal class widths of ${w} is being drawn. A class has a frequency of ${freq}. What is the frequency density (the height of the bar)?`, a: need(density) };
    },
  U814: () => {
      const w = randInt(2, 10), density = randInt(1, 10);
      const freq = w * density; need(freq);
      return { q: `A histogram bar has class width ${w} and frequency density ${density}. What is the frequency represented by the bar?`, a: freq };
    },
  U983: () => {
      const w1 = randInt(2, 8), d1 = randInt(1, 8), w2 = randInt(2, 8), d2 = randInt(1, 8);
      const total = w1 * d1 + w2 * d2; need(total);
      return { q: `A histogram has a bar of width ${w1} and frequency density ${d1}, and another bar of width ${w2} and frequency density ${d2}. What is the total frequency represented by these two bars?`, a: total };
    },
  U267: () => {
      const a = randInt(4, 20), b = randInt(4, 20), d1 = randInt(1, 6), d2 = randInt(1, 6);
      const f1 = a * d1, f2 = b * d2, m1 = a / 2, m2 = a + b / 2;
      const mean = (f1 * m1 + f2 * m2) / (f1 + f2);
      const rounded = Math.round(mean); need(rounded);
      return { q: `A histogram has two classes: 0–${a} (frequency density ${d1}) and ${a}–${a + b} (frequency density ${d2}). Estimate the mean of the data, using the midpoint of each class, to the nearest whole number.`, a: rounded };
    },
  U246: () => {
      const n = choice([4, 5, 10, 20, 25, 50, 100]);
      const pct = choice([0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100]);
      const k = pct * n / 100;
      if (!Number.isInteger(k)) throw 0;
      return { q: `A two-way table shows exam results: of ${n} students who revised, ${k} passed. If a student who revised is picked at random, what is the probability they passed, as a percentage?`, a: pct };
    },
  U699: () => {
      const totalB = choice([4, 5, 10, 20, 25, 50]);
      const k = randInt(1, totalB);
      const pct = k / totalB * 100;
      if (!Number.isInteger(pct)) throw 0;
      const itemPhrase = k === 1 ? "1 item" : `${k} items`;
      return { q: `A Venn diagram shows sets A and B. There ${k === 1 ? "is" : "are"} ${itemPhrase} in both A and B, and ${totalB} items in total in B. If an item is picked at random from B, what is the probability it is also in A, as a percentage?`, a: pct };
    },
  U821: () => {
      const pB = choice([10, 20, 25, 40, 50, 60, 80]);
      const pAgivenB = choice([10, 20, 25, 40, 50, 60, 75, 80, 90]);
      const prod = pB * pAgivenB / 100;
      if (!Number.isInteger(prod) || prod > 100) throw 0;
      return { q: `P(B) = ${pB}% and P(A|B) = ${pAgivenB}%. Using P(A ∩ B) = P(A|B) × P(B), find P(A ∩ B) as a percentage.`, a: prod };
    },
  U806: () => {
      const den = choice([4, 5, 8, 10, 20, 25]);
      const numerator = randInt(0, den - 1);
      const pct = numerator * 100 / den;
      if (!Number.isInteger(pct)) throw 0;
      const R = numerator + 1, N = den + 1;
      const B = N - R;
      const redPhrase = R === 1 ? "1 red ball" : `${R} red balls`;
      const bluePhrase = B === 1 ? "1 blue ball" : `${B} blue balls`;
      return { q: `A bag contains ${redPhrase} and ${bluePhrase} (${N} in total). A red ball is picked and not replaced. Using a tree diagram, what is the probability that the second ball picked is also red, as a percentage?`, a: pct };
    },
  U369: () => {
      const a = randInt(2, 10), b = randInt(2, 10);
      const product = a * b; if (product > 100) throw 0;
      return { q: `A restaurant menu has ${a} starters and ${b} main courses. Using the product rule for counting, how many different starter-and-main combinations are possible?`, a: product };
    },
  U747: () => {
      if (Math.random() < 0.5) {
        const m = randInt(-9, 9), c = randInt(0, 100);
        return { q: `The inequality y ≥ ${m}x + ${c} is shown by shading a region on a graph. What is the y-intercept of the boundary line?`, a: c };
      }
      const m = randInt(1, 9), c = randInt(0, 90);
      return { q: `The inequality y ≤ ${m}x + ${c} is shown by shading a region on a graph. What is the gradient of the boundary line?`, a: m };
    },
  U133: () => {
      const p = randInt(-20, 20), gap = randInt(2, 100);
      const q = p + gap;
      const count = q - p - 1; need(count);
      const b = -(p + q), c = p * q;
      return { q: `Solve the inequality x² ${signed(b)}x ${signed(c)} < 0. How many integer values of x satisfy this?`, a: count };
    },
  U637: () => {
      if (Math.random() < 0.5) {
        const a = randInt(1, 9), b = randInt(-30, 30), x = randInt(0, 15);
        const val = a * x + b; need(val);
        return { q: `f(x) = ${a}x ${signed(b)}. Find f(${x}).`, a: val };
      }
      const b = randInt(-30, 30), x = randInt(0, 8);
      const val = x * x + b; need(val);
      return { q: `f(x) = x² ${signed(b)}. Find f(${x}).`, a: val };
    },
  U895: () => {
      const a = randInt(1, 5), b = randInt(-10, 10), c = randInt(1, 5), d = randInt(-10, 10), x = randInt(0, 10);
      const gval = c * x + d, fgval = a * gval + b; need(fgval);
      return { q: `f(x) = ${a}x ${signed(b)} and g(x) = ${c}x ${signed(d)}. Find f(g(${x})).`, a: fgval };
    },
  U448: () => {
      const a = randInt(1, 9), b = randInt(-50, 50), c = randInt(1, 9), d = randInt(-20, 20);
      const constTerm = a * d + b; need(constTerm);
      const slope = a * c;
      return { q: `f(x) = ${a}x ${signed(b)} and g(x) = ${c}x ${signed(d)}. Simplify fg(x) = f(g(x)) to the form ${slope}x + k. What is k?`, a: constTerm };
    },
  U996: () => {
      const a = randInt(1, 9), b = randInt(-30, 30), x0 = randInt(0, 100);
      const k = a * x0 + b;
      return { q: `f(x) = ${a}x ${signed(b)}. Find f⁻¹(${k}), the inverse function evaluated at ${k}.`, a: x0 };
    },
  U598: () => {
      const x0 = randInt(0, 60), y0 = randInt(0, 60), h = randInt(-30, 30), k = randInt(-30, 30);
      const askX = Math.random() < 0.5;
      const ans = askX ? x0 + h : y0 + k; need(ans);
      return { q: `The point (${x0}, ${y0}) lies on the graph of y = f(x). The graph is translated by the vector (${h}, ${k}). What is the ${askX ? "x" : "y"}-coordinate of the image of this point?`, a: ans };
    },
  U487: () => {
      const k = randInt(0, 50), orig = randInt(0, 100);
      const image = 2 * k - orig; need(image);
      const vertical = Math.random() < 0.5;
      if (vertical) return { q: `The graph of y = f(x) is reflected in the vertical line x = ${k}. A point on the original graph has x-coordinate ${orig}. What is the x-coordinate of its image?`, a: image };
      return { q: `The graph of y = f(x) is reflected in the horizontal line y = ${k}. A point on the original graph has y-coordinate ${orig}. What is the y-coordinate of its image?`, a: image };
    },
  U455: () => {
      const type = choice(["vshift", "hshift", "vstretch"]);
      if (type === "vshift") {
        const x0 = randInt(0, 60), y0 = randInt(0, 60), k = randInt(-30, 30);
        const ans = y0 + k; need(ans);
        return { q: `The graph of y = f(x) passes through the point (${x0}, ${y0}). What point does the graph of y = f(x) + ${k} pass through, at the same x-coordinate? Give the y-coordinate.`, a: ans };
      }
      if (type === "hshift") {
        const x0 = randInt(0, 60), y0 = randInt(0, 60), k = randInt(-30, 30);
        const ans = x0 + k; need(ans);
        return { q: `The graph of y = f(x) passes through the point (${x0}, ${y0}). The graph of y = f(x - ${k}) passes through a corresponding point with the same y-coordinate. What is the x-coordinate of that point?`, a: ans };
      }
      const x0 = randInt(0, 60), y0 = randInt(0, 25), a = randInt(1, 4);
      const ans = a * y0; need(ans);
      return { q: `The graph of y = f(x) passes through the point (${x0}, ${y0}). What is the y-coordinate of the corresponding point on the graph of y = ${a}f(x)?`, a: ans };
    },
  U171: () => {
      const a = randInt(1, 3), b = randInt(-15, 15), x1 = randInt(0, 20);
      const x2 = a * x1 + b; need(x2);
      return { q: `A sequence is defined by the recurrence x_(n+1) = ${a}x_n ${signed(b)}, with x_1 = ${x1}. Find x_2.`, a: x2 };
    },
  U434: () => {
      const c = randInt(2, 9), a = randInt(1, 9), xn = randInt(0, 40), k = randInt(0, 100);
      const b = k * c - a * xn;
      return { q: `An iterative formula is x_(n+1) = (${a}x_n ${signed(b)}) / ${c}. If x_n = ${xn}, find x_(n+1).`, a: k };
    },
  U168: () => {
      const c = randInt(1, 50), d = randInt(2, 9), x0 = randInt(0, 50);
      const x1 = (x0 + c) / d, x2 = (x1 + c) / d;
      const rounded = Math.round(x2); need(rounded);
      return { q: `The iterative formula x_(n+1) = (x_n + ${c}) / ${d} is used to find an approximate solution to an equation, starting with x_1 = ${x0}. Find x_3 (after two iterations), rounded to the nearest whole number.`, a: rounded };
    },
  U582: () => {
      const n = randInt(0, 100);
      return { q: `As part of an algebraic proof, (2n + 1)² - (2n - 1)² is shown to simplify to 8n for any integer n. If n = ${n}, what is the value of (2n + 1)² - (2n - 1)², divided by 8?`, a: n };
    },
  U630: () => {
      if (Math.random() < 0.5) {
        const k = randInt(2, 4), p1 = randInt(5, Math.floor(100 / k));
        const p2 = p1 * k; need(p2);
        return { q: `Two similar shapes have a linear scale factor of ${k}. The smaller shape has a perimeter of ${p1} cm. What is the perimeter of the larger shape?`, a: p2 };
      }
      const k = randInt(2, 3), maxA1 = Math.floor(100 / (k * k));
      if (maxA1 < 1) throw 0;
      const a1 = randInt(1, maxA1), a2 = a1 * k * k; need(a2);
      return { q: `Two similar shapes have a linear scale factor of ${k}. The smaller shape has an area of ${a1} cm². What is the area of the larger shape?`, a: a2 };
    },
  U110: () => {
      if (Math.random() < 0.5) {
        const k = randInt(2, 3), maxSA1 = Math.floor(100 / (k * k));
        if (maxSA1 < 1) throw 0;
        const sa1 = randInt(1, maxSA1), sa2 = sa1 * k * k; need(sa2);
        return { q: `Two similar solids have a linear scale factor of ${k}. The smaller solid has a surface area of ${sa1} cm². What is the surface area of the larger solid?`, a: sa2 };
      }
      const k = randInt(2, 3), maxV1 = Math.floor(100 / (k * k * k));
      if (maxV1 < 1) throw 0;
      const v1 = randInt(1, maxV1), v2 = v1 * k * k * k; need(v2);
      return { q: `Two similar solids have a linear scale factor of ${k}. The smaller solid has a volume of ${v1} cm³. What is the volume of the larger solid?`, a: v2 };
    },
  U560: () => {
      const ab = randInt(1, 50) * 2;
      return { q: `In triangle OAB, M and N are the midpoints of OA and OB. Using vectors, it can be shown that MN = ½AB (the midpoint theorem). If AB = ${ab} cm, find the length of MN.`, a: need(ab / 2) };
    },
  U471: () => {
      const a = randInt(10, 60), b = randInt(10, 60);
      const ext = a + b; need(ext);
      return { q: `In triangle ABC, angle A = ${a}° and angle B = ${b}°. Using the exterior angle theorem (proved using angle facts), the exterior angle at C equals the sum of the two opposite interior angles. Find the exterior angle at C.`, a: ext };
    },
  U887: () => {
      const x = randInt(1, 100);
      return { q: `Triangle ABC is proved congruent to triangle DEF (for example, by SSS). If side AB = ${x} cm, what is the length of the corresponding side DE?`, a: x };
    },
  U807: () => {
      const apex = randInt(10, 160);
      if ((180 - apex) % 2 !== 0) throw 0;
      const base = (180 - apex) / 2; need(base);
      return { q: `A proof of the "angle at the centre" circle theorem uses the isosceles triangle OAB, where O is the centre and OA = OB (both radii). If angle AOB = ${apex}°, what is the size of angle OAB, one of the two equal base angles?`, a: base };
    },
  U800: () => {
      const x1 = randInt(0, 20), x2 = x1 + randInt(1, 10), m = randInt(0, 10);
      const y1 = randInt(0, 50), y2 = y1 + m * (x2 - x1);
      return { q: `A tangent is drawn to a curve at a point. The tangent passes through (${x1}, ${y1}) and (${x2}, ${y2}). Estimate the gradient of the curve at that point.`, a: need(m) };
    },
  U611: () => {
      const shape = choice(["rectangle", "triangle", "trapezium"]);
      if (shape === "rectangle") {
        const time = randInt(2, 20), v = randInt(1, 5);
        const dist = time * v; need(dist);
        return { q: `A velocity-time graph shows a constant velocity of ${v} m/s for ${time} s. What distance is travelled (the area under the graph)?`, a: dist };
      }
      if (shape === "triangle") {
        const maxV = randInt(1, 10) * 2, time = randInt(2, 10);
        const dist = 0.5 * time * maxV; if (!Number.isInteger(dist)) throw 0; need(dist);
        return { q: `A velocity-time graph shows velocity increasing steadily from 0 to ${maxV} m/s over ${time} s. What distance is travelled (the area under the graph, a triangle)?`, a: dist };
      }
      const t = randInt(2, 20);
      const v1 = randInt(1, 10);
      let v2 = randInt(1, 10);
      if (v2 === v1) v2 = v2 === 10 ? v2 - 1 : v2 + 1;
      const dist = 0.5 * (v1 + v2) * t;
      if (!Number.isInteger(dist)) throw 0; need(dist);
      return { q: `A velocity-time graph shows velocity changing steadily from ${v1} m/s to ${v2} m/s over ${t} s. What distance is travelled (the area under the graph, a trapezium)?`, a: dist };
    },
  U882: () => {
      const h = randInt(1, 5), y0 = randInt(0, 15), y1 = randInt(0, 15), y2 = randInt(0, 15);
      const sum = y0 + 2 * y1 + y2;
      const area = h * sum / 2;
      if (!Number.isInteger(area)) throw 0; need(area);
      return { q: `Using the trapezium rule with 2 strips of equal width ${h}, and heights y0 = ${y0}, y1 = ${y1}, y2 = ${y2}, estimate the area under the curve using Area ≈ (h/2)(y0 + 2y1 + y2).`, a: area };
    },
  U567: () => {
      const [p, q, r] = choice(CIRCLE_TRIPLES);
      return { q: `The point (${p}, ${q}) lies on the circle with equation x² + y² = r². What is the value of r?`, a: r };
    },
  };

  if (typeof module !== "undefined") module.exports = { GENERATORS };
  else self.GENERATORS = GENERATORS;
})();
