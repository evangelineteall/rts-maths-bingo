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
    randInt, choice, roundTo, randDecimal, formatMoney, simplifyFraction,
    fractionStr, distinctInts, ordinalSuffix, signed,
  } = U;

  function inRange(n) { return Number.isFinite(n) && Number.isInteger(n) && n >= 0 && n <= 100; }
  function need(n) { if (!inRange(n)) throw 0; return n; }

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
  };

  if (typeof module !== "undefined") module.exports = { GENERATORS };
  else self.GENERATORS = GENERATORS;
})();
