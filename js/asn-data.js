/*
 * Maths Bingo — "Always, Sometimes, Never" statement bank.
 * Each statement is hand-written (unlike the bingo generators, these can't be produced
 * algorithmically — they need genuine mathematical judgement to be a *good* statement,
 * i.e. one that's actually debatable and teaches something when discussed).
 *
 * Shape: { id, level, strand, statement, answer, explanation }
 *   - level: the year group it's most naturally pitched at (Transition/Y7-Y11) — a rough
 *     guide for filtering, not a hard rule; many statements work across a range of years.
 *   - strand: broad topic area, used for filtering.
 *   - answer: "Always" | "Sometimes" | "Never"
 *   - explanation: read aloud after reveal — the reasoning/example that makes the
 *     classification click, not just a bare assertion.
 */

const ASN_STATEMENTS = [
  // ---------------------------------------------------------------- Number
  {
    id: "ASN001", level: "Transition", strand: "Number",
    statement: "A negative number is smaller than a positive number.",
    answer: "Always",
    explanation: "Every negative number sits to the left of 0 on the number line, and every positive number sits to the right — so a negative number is always smaller than a positive one, however close each is to 0.",
  },
  {
    id: "ASN002", level: "Y7", strand: "Number",
    statement: "Multiplying a number by 10 makes it bigger.",
    answer: "Sometimes",
    explanation: "True for positive numbers (5 × 10 = 50). False for negative numbers, where multiplying by 10 makes it more negative — smaller, not bigger (−5 × 10 = −50). And 0 × 10 = 0, no change at all.",
  },
  {
    id: "ASN003", level: "Y7", strand: "Number",
    statement: "The sum of two odd numbers is even.",
    answer: "Always",
    explanation: "An odd number is 'one away' from a multiple of 2. Add two of them and the two leftover 1s combine to make another whole 2 — so the total is always even. (3 + 5 = 8, 7 + 9 = 16.)",
  },
  {
    id: "ASN004", level: "Y8", strand: "Number",
    statement: "The sum of two prime numbers is even.",
    answer: "Sometimes",
    explanation: "Every prime except 2 is odd, and odd + odd = even, so most prime pairs give an even sum (3 + 5 = 8). But 2 is prime and even, so 2 + 3 = 5, which is odd.",
  },
  {
    id: "ASN005", level: "Transition", strand: "Number",
    statement: "A number that ends in 0 is divisible by 10.",
    answer: "Always",
    explanation: "That's exactly what the divisibility rule for 10 means — every whole number ending in 0 is a multiple of 10, no exceptions.",
  },
  {
    id: "ASN006", level: "Y7", strand: "Number",
    statement: "A number that's divisible by 4 is also divisible by 2.",
    answer: "Always",
    explanation: "4 = 2 × 2, so any multiple of 4 is automatically a multiple of 2 as well (12 = 4 × 3 = 2 × 6).",
  },
  {
    id: "ASN007", level: "Y7", strand: "Number",
    statement: "A number that's divisible by 2 is also divisible by 4.",
    answer: "Sometimes",
    explanation: "Works for some even numbers (8 is divisible by 2 and by 4) but not others (6 is divisible by 2 but not by 4).",
  },
  {
    id: "ASN008", level: "Transition", strand: "Number",
    statement: "Rounding a number to the nearest 10 makes it bigger.",
    answer: "Sometimes",
    explanation: "Depends which way it rounds: 24 rounds down to 20 (smaller), but 27 rounds up to 30 (bigger).",
  },
  {
    id: "ASN009", level: "Y7", strand: "Number",
    statement: "Doubling a number and then halving it gets you back to the original number.",
    answer: "Always",
    explanation: "×2 then ÷2 always undoes itself, for any number — positive, negative, whole or decimal.",
  },
  {
    id: "ASN010", level: "Y9", strand: "Number",
    statement: "The square of a number is bigger than the number itself.",
    answer: "Sometimes",
    explanation: "True for numbers bigger than 1 (3² = 9 > 3) and for all negative numbers (since squaring makes them positive: (−3)² = 9 > −3). False for numbers between 0 and 1 (0.5² = 0.25 < 0.5) — squaring a fraction makes it smaller.",
  },
  {
    id: "ASN011", level: "Y8", strand: "Number",
    statement: "A fraction with a bigger denominator is a smaller fraction.",
    answer: "Sometimes",
    explanation: "True when the numerators match (1/8 < 1/4). False when they don't — 3/4 has a smaller denominator than 1/8 but is still the bigger fraction (0.75 vs 0.125).",
  },
  {
    id: "ASN012", level: "Transition", strand: "Number",
    statement: "Every whole number is either odd or even.",
    answer: "Always",
    explanation: "There's no third option — every whole number leaves either remainder 0 (even) or remainder 1 (odd) when divided by 2.",
  },
  {
    id: "ASN013", level: "Y8", strand: "Number",
    statement: "An even number multiplied by an odd number gives an even number.",
    answer: "Always",
    explanation: "The even number already contributes a factor of 2, and multiplying by anything else can't remove it — so the product always stays even (6 × 5 = 30, 4 × 7 = 28).",
  },
  {
    id: "ASN014", level: "Y9", strand: "Number",
    statement: "The product of two numbers is always bigger than either number on its own.",
    answer: "Sometimes",
    explanation: "True for two whole numbers bigger than 1 (3 × 4 = 12, bigger than both). False if one of the numbers is a fraction less than 1 (4 × 0.5 = 2, smaller than 4) — multiplying by a fraction between 0 and 1 shrinks a number.",
  },
  {
    id: "ASN015", level: "Y9", strand: "Number",
    statement: "A prime number is odd.",
    answer: "Sometimes",
    explanation: "True for every prime except one: 2 is prime and even — the only even prime number there is. Every other prime (3, 5, 7, 11, ...) is odd.",
  },
  {
    id: "ASN016", level: "Y7", strand: "Number",
    statement: "Every multiple of 5 ends in a 5.",
    answer: "Sometimes",
    explanation: "Multiples of 5 end in either 0 or 5 (5, 10, 15, 20, 25, ...) — so only every other one actually ends in a 5.",
  },
  {
    id: "ASN017", level: "Transition", strand: "Number",
    statement: "Rounding two numbers before adding them gives the same answer as adding them first and then rounding.",
    answer: "Sometimes",
    explanation: "Sometimes lines up (12 + 13 rounds to 10 + 10 = 20, and 25 itself rounds to 30 — hm, try 4.6 + 4.6: add first = 9.2, which rounds to 9; round first = 5 + 5 = 10. Different answers — rounding errors can build up.",
  },
  {
    id: "ASN018", level: "Y10", strand: "Number",
    statement: "A number squared is always bigger than the same number cubed.",
    answer: "Sometimes",
    explanation: "For a fraction like 0.5: squared = 0.25, cubed = 0.125, so squared is bigger. For a whole number like 2: squared = 4, cubed = 8, so cubed is bigger instead. It flips depending on the number.",
  },
  {
    id: "ASN019", level: "Y7", strand: "Number",
    statement: "You can't have a negative percentage.",
    answer: "Never",
    explanation: "Negative percentages are a normal, useful way to describe a decrease — e.g. 'sales fell by −10%' — so the claim that you can't have one is never actually true.",
  },

  // ---------------------------------------------------------------- Algebra
  {
    id: "ASN020", level: "Y8", strand: "Algebra",
    statement: "Multiplying two negative numbers gives a positive answer.",
    answer: "Always",
    explanation: "This is a fixed rule of arithmetic — negative × negative = positive, every single time (−3 × −4 = 12).",
  },
  {
    id: "ASN021", level: "Y9", strand: "Algebra",
    statement: "x² is always positive.",
    answer: "Sometimes",
    explanation: "True for every value of x except one: when x = 0, x² = 0, which is neither positive nor negative. So x² is always non-negative, but not quite always positive.",
  },
  {
    id: "ASN022", level: "Y9", strand: "Algebra",
    statement: "If you substitute a negative number into 'x²', you get a negative answer.",
    answer: "Never",
    explanation: "Squaring any real number — positive or negative — always gives a result of 0 or above, because negative × negative = positive. (−5)² = 25, never −25.",
  },
  {
    id: "ASN023", level: "Y9", strand: "Algebra",
    statement: "Doubling the sides of a square doubles its area.",
    answer: "Never",
    explanation: "Area scales with the square of the side length, so doubling the sides always quadruples the area, not doubles it (a 2 cm square has area 4; double the sides to 4 cm and the area becomes 16 — four times as much).",
  },
  {
    id: "ASN024", level: "Transition", strand: "Algebra",
    statement: "An expression with a letter in it is called an equation.",
    answer: "Never",
    explanation: "It's called an expression (like 3x + 2) unless it has an equals sign — an equation needs an '=' (like 3x + 2 = 11). Mixing these two words up is a really common slip worth catching early.",
  },
  {
    id: "ASN025", level: "Y8", strand: "Algebra",
    statement: "Two algebraic expressions are equivalent if they give the same value for every value of x.",
    answer: "Always",
    explanation: "That's the actual definition of 'equivalent' — e.g. 2(x + 3) and 2x + 6 always match, whatever number you substitute for x.",
  },
  {
    id: "ASN026", level: "Y8", strand: "Algebra",
    statement: "Solving a linear equation always gives exactly one solution.",
    answer: "Sometimes",
    explanation: "Usually true (2x + 1 = 7 gives x = 3, just one answer). But some equations have no solution at all (x = x + 1 is never true), and some are true for every value of x (2x = 2x) — infinitely many solutions.",
  },
  {
    id: "ASN027", level: "Y11", strand: "Algebra",
    statement: "If you square both sides of an equation, you get an equivalent equation.",
    answer: "Sometimes",
    explanation: "Squaring can introduce extra 'solutions' that weren't valid before: x = −2 has one solution, but x² = 4 also allows x = 2, which wasn't a solution to the original equation. Always check squared solutions against the original.",
  },
  {
    id: "ASN028", level: "Transition", strand: "Algebra",
    statement: "You can collect like terms in the expression 3x + 4y.",
    answer: "Never",
    explanation: "x and y are different letters, standing for (possibly) different things — they aren't 'like terms', so 3x + 4y can't be simplified any further. It stays as it is.",
  },
  {
    id: "ASN029", level: "Y10", strand: "Algebra",
    statement: "Expanding brackets always makes an expression longer.",
    answer: "Sometimes",
    explanation: "Usually true (expanding 3(x + 2) gives the longer 3x + 6). But not always — (x + 1)(x − 1) expands to x² − 1, which is actually shorter, because the middle terms cancel out.",
  },

  // ---------------------------------------------------------------- Geometry
  {
    id: "ASN030", level: "Y7", strand: "Geometry",
    statement: "A square is a rectangle.",
    answer: "Always",
    explanation: "A rectangle just needs four right angles and opposite sides equal — a square ticks both boxes, so every square counts as a (special) rectangle.",
  },
  {
    id: "ASN031", level: "Y7", strand: "Geometry",
    statement: "A rectangle is a square.",
    answer: "Sometimes",
    explanation: "Only when all four sides happen to be equal length too. A 3×3 rectangle is a square; a 3×5 rectangle isn't.",
  },
  {
    id: "ASN032", level: "Y8", strand: "Geometry",
    statement: "All triangles have at least two acute angles.",
    answer: "Always",
    explanation: "The three angles in a triangle add up to 180°. At most one angle can be 90° or more, so the other two must each be under 90° — acute — however the triangle is shaped.",
  },
  {
    id: "ASN033", level: "Transition", strand: "Geometry",
    statement: "The angles in a triangle add up to 180°.",
    answer: "Always",
    explanation: "This is a fixed property of triangles — true for every triangle, no matter how it's shaped or sized.",
  },
  {
    id: "ASN034", level: "Y8", strand: "Geometry",
    statement: "A shape with 4 equal sides is a square.",
    answer: "Sometimes",
    explanation: "A square works, but so does a rhombus (like a squashed diamond) — it has 4 equal sides too, just without the right angles. Equal sides alone isn't enough to guarantee a square.",
  },
  {
    id: "ASN035", level: "Y9", strand: "Geometry",
    statement: "Doubling the radius of a circle doubles its circumference.",
    answer: "Always",
    explanation: "Circumference = 2πr — radius and circumference are directly proportional, so doubling r always exactly doubles the circumference.",
  },
  {
    id: "ASN036", level: "Y9", strand: "Geometry",
    statement: "Doubling the radius of a circle doubles its area.",
    answer: "Never",
    explanation: "Area = πr² — because the radius is squared, doubling it always quadruples the area instead, the same pattern as doubling a square's sides.",
  },
  {
    id: "ASN037", level: "Y9", strand: "Geometry",
    statement: "Two shapes with the same area have the same perimeter.",
    answer: "Sometimes",
    explanation: "Only guaranteed if the shapes are actually identical (congruent). Otherwise it usually fails — a 2×8 rectangle and a 4×4 square both have area 16, but perimeters of 20 and 16.",
  },
  {
    id: "ASN038", level: "Y8", strand: "Geometry",
    statement: "If two shapes are congruent, they have the same area.",
    answer: "Always",
    explanation: "Congruent means identical in shape and size — if every measurement matches, the area has to match too.",
  },
  {
    id: "ASN039", level: "Y9", strand: "Geometry",
    statement: "If two shapes have the same area, they are congruent.",
    answer: "Sometimes",
    explanation: "Only true if they genuinely are copies of each other. It's easy to find two very differently-shaped figures with matching areas (a thin rectangle and a square, say) that clearly aren't congruent.",
  },
  {
    id: "ASN040", level: "Y10", strand: "Geometry",
    statement: "A triangle can have two right angles.",
    answer: "Never",
    explanation: "The three angles must add up to 180°. Two right angles alone already use up all 180°, leaving nothing for the third angle — so this can never happen.",
  },
  {
    id: "ASN041", level: "Y9", strand: "Geometry",
    statement: "The diagonals of a rectangle are equal in length.",
    answer: "Always",
    explanation: "It's one of the defining properties of a rectangle — both diagonals always come out the same length, however long or thin the rectangle is.",
  },
  {
    id: "ASN042", level: "Y9", strand: "Geometry",
    statement: "The diagonals of a parallelogram are equal in length.",
    answer: "Sometimes",
    explanation: "Only for the special parallelograms that are also rectangles. A general 'leaning' parallelogram has diagonals of different lengths.",
  },
  {
    id: "ASN043", level: "Y10", strand: "Geometry",
    statement: "Similar shapes are congruent.",
    answer: "Sometimes",
    explanation: "Similar means the same shape, possibly at a different size. If the scale factor between them happens to be exactly 1, they're actually the same size too — congruent. Any other scale factor and they aren't.",
  },

  // ---------------------------------------------------------------- Statistics & Probability
  {
    id: "ASN044", level: "Y8", strand: "Statistics & Probability",
    statement: "The mean of a data set is one of the values in the data set.",
    answer: "Sometimes",
    explanation: "For 1, 2, 3 the mean is 2, which is in the set. For 1, 2, 4 the mean is 2.33, which isn't one of the original values at all.",
  },
  {
    id: "ASN045", level: "Y8", strand: "Statistics & Probability",
    statement: "The median of a data set is one of the values in the data set.",
    answer: "Sometimes",
    explanation: "For an odd number of values, the median is the actual middle value. For an even number of values, it's the average of the two middle values — which might land between them and not be an original value at all.",
  },
  {
    id: "ASN046", level: "Y9", strand: "Statistics & Probability",
    statement: "Adding an outlier to a data set increases the mean.",
    answer: "Sometimes",
    explanation: "Only if the outlier is unusually high — that pulls the mean up. An unusually LOW outlier pulls the mean down instead.",
  },
  {
    id: "ASN047", level: "Y11", strand: "Statistics & Probability",
    statement: "Two events that are mutually exclusive are also independent.",
    answer: "Never",
    explanation: "Mutually exclusive means they can never both happen (P(A and B) = 0). Independent events would need P(A and B) = P(A) × P(B) — which can't be 0 unless one event is already impossible. So genuinely mutually exclusive events (both with a real chance of happening) are never independent — one happening always rules the other out.",
  },
  {
    id: "ASN048", level: "Y7", strand: "Statistics & Probability",
    statement: "The probability of an event happening plus the probability of it not happening equals 1.",
    answer: "Always",
    explanation: "These are the only two possibilities — the event happens, or it doesn't — so together they must account for the whole of the probability, which is 1.",
  },
  {
    id: "ASN049", level: "Y8", strand: "Statistics & Probability",
    statement: "If you roll a fair die twice, you're more likely to get two sixes than a six followed by a five.",
    answer: "Never",
    explanation: "Both outcomes have exactly the same probability: 1/6 × 1/6 = 1/36. It feels like 'six then six' should be rarer or more special, but every specific sequence of two rolls is equally likely.",
  },
  {
    id: "ASN050", level: "Y7", strand: "Statistics & Probability",
    statement: "A pie chart can be used to show a data set with negative values.",
    answer: "Never",
    explanation: "A pie chart shows each category as a slice, sized by its share of the total — that only makes sense if every value is zero or positive. A negative value can't be drawn as a sensible slice of a circle.",
  },

  // ---------------------------------------------------------------- Ratio & Proportion
  {
    id: "ASN051", level: "Y8", strand: "Ratio & Proportion",
    statement: "Increasing a number by 50% and then decreasing the result by 50% gets you back to the original number.",
    answer: "Never",
    explanation: "The two 50%s aren't undoing each other, because the second 50% is taken off a bigger number. £100 → +50% → £150 → −50% → £75. You always end up lower than where you started.",
  },
  {
    id: "ASN052", level: "Transition", strand: "Ratio & Proportion",
    statement: "A ratio can be simplified by dividing both parts by the same number.",
    answer: "Always",
    explanation: "That's the definition of simplifying a ratio — dividing every part by a shared factor always gives an equivalent, simpler ratio (10:15 becomes 2:3 by dividing both by 5).",
  },
  {
    id: "ASN053", level: "Y7", strand: "Ratio & Proportion",
    statement: "Doubling the numerator of a fraction doubles the value of the fraction.",
    answer: "Always",
    explanation: "a/b becoming 2a/b is exactly twice the original value, whatever a and b are — the denominator hasn't changed, only the numerator has doubled.",
  },
  {
    id: "ASN054", level: "Y9", strand: "Ratio & Proportion",
    statement: "If two quantities are in direct proportion, doubling one doubles the other.",
    answer: "Always",
    explanation: "That's what direct proportion means (y = kx) — whatever you do to one quantity happens to the other in exactly the same way, so doubling one always doubles the other.",
  },
  {
    id: "ASN055", level: "Y9", strand: "Ratio & Proportion",
    statement: "If two quantities are in inverse proportion, doubling one doubles the other.",
    answer: "Never",
    explanation: "In inverse proportion (y = k/x), doubling one quantity always HALVES the other, never doubles it — that's the whole point of the relationship being inverse rather than direct.",
  },
];

if (typeof module !== "undefined") module.exports = { ASN_STATEMENTS };
else self.ASN_STATEMENTS = ASN_STATEMENTS;
