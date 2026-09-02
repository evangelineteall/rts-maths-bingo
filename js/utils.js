/*
 * Maths Bingo — shared math/random helpers used by every question generator.
 */

function randInt(min, max) {
  // inclusive of both ends
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randSign() {
  return Math.random() < 0.5 ? -1 : 1;
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

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

function simplifyFraction(num, den) {
  if (den < 0) { num = -num; den = -den; }
  const g = gcd(num, den);
  return [num / g, den / g];
}

function fractionStr(num, den) {
  const [n, d] = simplifyFraction(num, den);
  if (d === 1) return `${n}`;
  return `${n}/${d}`;
}

// Round to `dp` decimal places and format without trailing zeros beyond what's needed,
// but keep it as a plain number-like string for answer matching.
function roundTo(n, dp) {
  const f = Math.pow(10, dp);
  return Math.round((n + Number.EPSILON) * f) / f;
}

// A random decimal with exactly `dp` decimal places, between min and max (inclusive-ish).
function randDecimal(min, max, dp) {
  const f = Math.pow(10, dp);
  const lo = Math.round(min * f);
  const hi = Math.round(max * f);
  return Math.round(randInt(lo, hi)) / f;
}

function formatMoney(n) {
  return `£${roundTo(n, 2).toFixed(2)}`;
}

function formatPercent(n) {
  return `${n}%`;
}

// Pick `n` distinct integers from [min, max] inclusive.
function distinctInts(min, max, n) {
  const pool = [];
  for (let i = min; i <= max; i++) pool.push(i);
  return shuffle(pool).slice(0, n);
}

// nth root helper for perfect powers
function isPerfectSquare(n) {
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
}

function nChoiceExcluding(arr, exclude) {
  const filtered = arr.filter((x) => !exclude.includes(x));
  return choice(filtered.length ? filtered : arr);
}

// "1st", "2nd", "3rd", "4th", ...
function ordinalSuffix(n) {
  const j = n % 10, k = n % 100;
  if (j === 1 && k !== 11) return `${n}st`;
  if (j === 2 && k !== 12) return `${n}nd`;
  if (j === 3 && k !== 13) return `${n}rd`;
  return `${n}th`;
}

// "+ 7" or "- 7" — for building "x + 7" / "x - 7" style expressions from a signed number.
function signed(n) {
  return n >= 0 ? `+ ${n}` : `- ${Math.abs(n)}`;
}

// Wraps negative numbers in parentheses for display in arithmetic expressions, e.g. (-3).
function paren(n) {
  return n < 0 ? `(${n})` : `${n}`;
}

// --- Question pool builder -------------------------------------------------
// Calls `genFn` repeatedly until it collects `count` questions with distinct
// answers (as strings), or gives up after `maxAttempts` tries.
function buildPool(genFn, count, maxAttempts = 400) {
  const seen = new Set();
  const pool = [];
  let attempts = 0;
  while (pool.length < count && attempts < maxAttempts) {
    attempts++;
    let item;
    try {
      item = genFn();
    } catch (e) {
      continue;
    }
    if (!item || item.q == null || item.a == null) continue;
    const key = String(item.a).trim();
    if (key === "" || key === "NaN" || key === "undefined") continue;
    if (seen.has(key)) continue;
    seen.add(key);
    pool.push({ q: item.q, a: key });
  }
  return pool;
}

if (typeof module !== "undefined") {
  module.exports = {
    randInt, randSign, choice, shuffle, gcd, simplifyFraction, fractionStr,
    roundTo, randDecimal, formatMoney, formatPercent, distinctInts,
    isPerfectSquare, nChoiceExcluding, buildPool, ordinalSuffix, signed, paren,
  };
}
