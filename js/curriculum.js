/*
 * Maths Bingo — curriculum data
 * Structured from the Y7–Y10 (GCSE resit) scheme of work.
 * Each subtopic's `code` is used to look up its question generator in generators.js.
 * `prereqs` are the subtopic names a student should already know (shown as a tooltip only —
 * not enforced by the game).
 */

const CURRICULUM = [
  // ---------------------------------------------------------------- Y7
  {
    year: "Y7", strand: "Number sense", topic: "7.4: Place value, ordering integers and decimals",
    subtopics: [
      { name: "Using number lines", code: "M763", prereqs: [] },
      { name: "Integer place value", code: "M704", prereqs: [] },
      { name: "Decimal place value", code: "M522", prereqs: [] },
      { name: "Ordering negative numbers", code: "M527", prereqs: [] },
      { name: "Rounding integers", code: "M111", prereqs: [] },
      { name: "Rounding decimals", code: "M431", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Adding and subtracting", topic: "7.6: Solving problems with addition and subtraction",
    subtopics: [
      { name: "Adding integers", code: "M928", prereqs: ["Integer place value"] },
      { name: "Adding decimals", code: "M429", prereqs: ["Decimal place value"] },
      { name: "Subtracting integers", code: "M347", prereqs: [] },
      { name: "Subtracting decimals", code: "M152", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Multiplying", topic: "7.7: Solving problems with multiplication and division",
    subtopics: [
      { name: "Multiplying and dividing by 10, 100 and 1000", code: "M113", prereqs: ["Times tables"] },
      { name: "Multiplying using place value", code: "M911", prereqs: ["Integer place value"] },
      { name: "Using a written method to multiply integers", code: "M187", prereqs: ["Decimal place value"] },
      { name: "Using a written method to multiply decimals", code: "M803", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Dividing", topic: "7.7: Solving problems with multiplication and division",
    subtopics: [
      { name: "Dividing numbers into equal groups", code: "M462", prereqs: ["Times tables"] },
      { name: "Using a written method to divide integers", code: "M354", prereqs: ["Integer place value"] },
      { name: "Dividing with remainder", code: "M873", prereqs: ["Decimal place value"] },
      { name: "Using a written method to divide by integers to get a decimal answer", code: "M262", prereqs: [] },
      { name: "Using a written method to divide by decimals", code: "M491", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Calculating with negative numbers", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Adding and subtracting with negative numbers", code: "M106", prereqs: ["Times tables"] },
      { name: "Multiplying and dividing with negative numbers", code: "M288", prereqs: ["Using number lines", "Ordering negative numbers"] },
    ],
  },
  {
    year: "Y7", strand: "Order of operations", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Calculating with roots and powers", code: "M135", prereqs: ["Times tables"] },
      { name: "Using the correct order of operations", code: "M521", prereqs: ["Adding", "Subtracting"] },
      { name: "Using the commutative laws", code: "M952", prereqs: ["Multiplying"] },
      { name: "Using the associative laws", code: "M409", prereqs: ["Dividing", "Calculating with negative numbers"] },
    ],
  },

  // ---------------------------------------------------------------- Y8
  {
    year: "Y8", strand: "Percentages", topic: "Percentages of amounts",
    subtopics: [
      { name: "Finding percentages of amounts without a calculator", code: "M437", prereqs: ["Converting between fractions, decimals and percentages"] },
      { name: "Finding percentages of amounts with a calculator", code: "M905", prereqs: ["Fractions of amounts without a calculator", "Fractions of amounts with a calculator"] },
    ],
  },
  {
    year: "Y8", strand: "Percentages", topic: "Percentage change",
    subtopics: [
      { name: "Percentage change without a calculator", code: "M476", prereqs: ["Finding percentages of amounts without a calculator"] },
      { name: "Percentage change with a calculator", code: "M533", prereqs: ["Finding percentages of amounts with a calculator"] },
    ],
  },
  {
    year: "Y8", strand: "Money", topic: "Calculating with money",
    subtopics: [
      { name: "Value for money", code: "M681", prereqs: ["Solving proportion problems", "Adding decimals", "Subtracting decimals", "Using a written method to multiply decimals", "Using a written method to divide by integers to get a decimal answer"] },
    ],
  },
  {
    year: "Y8", strand: "Indices", topic: "Index laws",
    subtopics: [
      { name: "Index rules with positive indices", code: "M608", prereqs: ["Calculating with roots and powers"] },
      { name: "Index rules with negative indices", code: "M150", prereqs: ["Simplifying fractions"] },
      { name: "Simplifying expressions using index laws", code: "M120", prereqs: ["Algebraic notation"] },
      { name: "Simplifying algebraic fractions by cancelling common factors", code: "M568", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Equations", topic: "Solving equations",
    subtopics: [
      { name: "Solving equations of the form (x+a)/b=c", code: "M401", prereqs: ["Solving equations with one step"] },
      { name: "Solving linear equations involving brackets", code: "M902", prereqs: ["Expanding single brackets"] },
      { name: "Solving equations with the unknown on both sides", code: "M554", prereqs: ["Solving equations of the form ax+b=c"] },
      { name: "Solving equations with the unknown in the denominator", code: "M387", prereqs: ["Solving equations of the form x/a+b=c"] },
      { name: "Constructing and solving equations", code: "M957", prereqs: ["Simplifying expressions containing a single variable", "Substituting into expressions with multiple operations"] },
    ],
  },
  {
    year: "Y8", strand: "Sequences", topic: "Term-to-term rules",
    subtopics: [
      { name: "Term-to-term rules for numerical sequences", code: "M381", prereqs: ["Using number lines"] },
      { name: "Term-to-term rules for sequences of patterns", code: "M241", prereqs: ["Adding and subtracting with negative numbers", "Multiplying and dividing with negative numbers"] },
    ],
  },
  {
    year: "Y8", strand: "Sequences", topic: "Position-to-term rules",
    subtopics: [
      { name: "Substituting into position-to-term rules", code: "M166", prereqs: ["Term-to-term rules for numerical sequences"] },
      { name: "Position-to-term rules for arithmetic sequences", code: "M991", prereqs: ["Term-to-term rules for sequences of patterns"] },
      { name: "Position-to-term rules for sequences of patterns", code: "M866", prereqs: ["Solving equations of the form ax+b=c", "Substituting into expressions with multiple operations"] },
    ],
  },

  // ---------------------------------------------------------------- Y9
  {
    year: "Y9", strand: "Fractions and percentages", topic: "Fractions, decimals and percentages review",
    subtopics: [
      { name: "Converting between fractions, decimals and percentages", code: "U888", prereqs: ["Finding equivalent fractions"] },
      { name: "Ordering fractions, decimals and percentages", code: "U594", prereqs: ["Ordering fractions"] },
      { name: "Finding fractions of amounts without a calculator", code: "U881", prereqs: ["Multiplying fractions"] },
      { name: "Finding fractions of amounts with a calculator", code: "U916", prereqs: [] },
      { name: "Finding percentages of amounts without a calculator", code: "U554", prereqs: [] },
      { name: "Finding percentages of amounts with a calculator", code: "U349", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Fractions and percentages", topic: "Percentage change",
    subtopics: [
      { name: "Percentage change without a calculator", code: "U773", prereqs: ["Finding percentages of amounts without a calculator"] },
      { name: "Percentage change with a calculator", code: "U671", prereqs: ["Finding percentages of amounts with a calculator"] },
      { name: "Finding original values in percentage calculations", code: "U286", prereqs: [] },
      { name: "Finding the percentage an amount has been changed by", code: "U278", prereqs: [] },
      { name: "Simple interest calculations", code: "U533", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Probability", topic: "Theoretical and experimental probability",
    subtopics: [
      { name: "Expected results from repeated experiments", code: "U166", prereqs: ["Writing probabilities as fractions, decimals and percentages"] },
      { name: "Calculating experimental probabilities", code: "U580", prereqs: ["Probabilities of mutually exclusive events"] },
      { name: "Frequency trees", code: "U280", prereqs: ["Finding fractions of amounts", "Finding percentages of amounts"] },
    ],
  },
  {
    year: "Y9", strand: "Standard form", topic: "Calculations with standard form",
    subtopics: [
      { name: "Multiplying and dividing numbers in standard form", code: "U264", prereqs: ["Using standard form with positive indices"] },
      { name: "Adding and subtracting numbers in standard form", code: "U290", prereqs: ["Using standard form with negative indices"] },
      { name: "Standard form with a calculator", code: "U161", prereqs: ["Index rules with positive indices", "Index rules with negative indices"] },
    ],
  },
  {
    year: "Y9", strand: "Inequalities", topic: "Linear inequalities",
    subtopics: [
      { name: "Solving inequalities with the unknown on both sides", code: "U738", prereqs: ["Reading and drawing inequalities on number lines"] },
      { name: "Solving double inequalities", code: "U145", prereqs: ["Solving single inequalities"] },
      { name: "Constructing and solving inequalities", code: "U337", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Quadratic equations", topic: "Factorising and solving quadratic equations",
    subtopics: [
      { name: "Factorising quadratic equations of the form x^2+bx+c", code: "U178", prereqs: ["Expanding double brackets"] },
      { name: "Factorising the difference of two squares", code: "U963", prereqs: ["Factorising into one bracket"] },
      { name: "Factorising to solve quadratic equations of the form x^2+bx+c=0", code: "U228", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Formulae", topic: "Rearranging formulae",
    subtopics: [
      { name: "Changing the subjects of formulae with one step", code: "U675", prereqs: ["Solving equations with two or more steps"] },
      { name: "Changing the subjects of formulae with two or more steps", code: "U181", prereqs: ["Solving equations with the variable on both sides", "Solving equations with the variable in the denominator"] },
    ],
  },
  {
    year: "Y9", strand: "Constructions", topic: "Constructing bisectors and perpendicular lines",
    subtopics: [
      { name: "Constructing bisectors of angles", code: "U787", prereqs: ["Using a ruler"] },
      { name: "Constructing perpendicular bisectors and lines", code: "U245", prereqs: ["Using a pair of compasses"] },
    ],
  },
  {
    year: "Y9", strand: "Circles", topic: "Circles and cylinders",
    subtopics: [
      { name: "Finding the arc length of sectors", code: "U221", prereqs: ["Identifying parts of circles"] },
      { name: "Finding the area of sectors", code: "U373", prereqs: ["Finding the circumference of circles"] },
      { name: "Finding the surface area of cylinders", code: "U464", prereqs: ["Finding the area of circles"] },
      { name: "Finding the volume of cylinders", code: "U915", prereqs: ["Finding the surface area of prisms", "Finding the volume of prisms"] },
    ],
  },

  // ---------------------------------------------------------------- Y10
  {
    year: "Y10", strand: "Percentages", topic: "Repeated percentage change",
    subtopics: [
      { name: "Compound interest calculations", code: "U332", prereqs: ["Percentage change with a calculator"] },
      { name: "Growth and decay", code: "U988", prereqs: ["Finding original values in percentage calculations"] },
    ],
  },
  {
    year: "Y10", strand: "Surface area and volume", topic: "Surface area",
    subtopics: [
      { name: "Finding the surface area of pyramids", code: "U871", prereqs: ["Finding the surface area of cubes and cuboids"] },
      { name: "Finding the surface area of cones", code: "U523", prereqs: ["Finding the surface area of prisms"] },
      { name: "Finding the surface area of spheres", code: "U893", prereqs: ["Finding the surface area of cylinders"] },
      { name: "Finding the surface area of frustums*", code: "U334", prereqs: [] },
      { name: "Finding the surface area of composite shapes*", code: "U561", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Surface area and volume", topic: "Volume",
    subtopics: [
      { name: "Finding the volume of pyramids", code: "U484", prereqs: ["Finding the volume of cubes and cuboids"] },
      { name: "Finding the volume of cones", code: "U116", prereqs: ["Finding the volume of prisms"] },
      { name: "Finding the volume of spheres", code: "U617", prereqs: ["Finding the volume of cylinders"] },
      { name: "Finding the volume of frustums*", code: "U350", prereqs: [] },
      { name: "Finding the volume of composite shapes*", code: "U543", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Simultaneous equations", topic: "Linear simultaneous equations",
    subtopics: [
      { name: "Solving simultaneous equations using elimination", code: "U760", prereqs: ["Solving equations with two or more steps"] },
      { name: "Solving simultaneous equations using substitution", code: "U757", prereqs: ["Solving equations with the unknown on both sides"] },
      { name: "Solving simultaneous equations graphically", code: "U836", prereqs: ["Constructing and solving equations"] },
      { name: "Constructing and solving simultaneous equations", code: "U137", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Formulae", topic: "Rearranging formulae",
    subtopics: [
      { name: "Changing the subjects of formulae with two or more steps", code: "U181", prereqs: ["Changing the subjects of formulae with one step"] },
      { name: "Changing the subject when the subject appears more than once", code: "U191", prereqs: ["Solving equations with two or more steps", "Solving equations with the unknown on both sides", "Solving equations with the unknown in the denominator", "Expanding and factorising brackets"] },
    ],
  },
  {
    year: "Y10", strand: "Trigonometry", topic: "Right-angled trigonometry",
    subtopics: [
      { name: "Understanding sin, cos, tan", code: "U605", prereqs: ["Solving equations with two or more steps"] },
      { name: "Finding unknown sides in right-angled triangles", code: "U283", prereqs: ["Changing the subjects of formulae with two or more steps"] },
      { name: "Finding unknown angles in right-angled triangles", code: "U545", prereqs: ["Angles in triangles"] },
      { name: "Using the exact values of trigonometric ratios", code: "U627", prereqs: ["Measuring and drawing bearings"] },
      { name: "Angles of elevation and depression*", code: "U967", prereqs: [] },
      { name: "Calculating with trigonometry and bearings*", code: "U164", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Constructions", topic: "Constructions and loci",
    subtopics: [
      { name: "Constructing loci", code: "U820", prereqs: ["Constructing bisectors of angles", "Constructing perpendicular bisectors and lines"] },
    ],
  },

  // ---------------------------------------------------------------- Y11
  {
    year: "Y11", strand: "Factors, multiples and primes", topic: "HCF and LCM",
    subtopics: [
      { name: "Finding the lowest common multiple", code: "U751", prereqs: ["Finding factors and using divisibility tests"] },
      { name: "Finding the highest common factor", code: "U529", prereqs: ["Finding prime numbers"] },
      { name: "Prime factor decomposition", code: "U739", prereqs: ["Venn diagrams"] },
      { name: "Finding the HCF and LCM using prime factor decomposition", code: "U250", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Fractions", topic: "Fractions and mixed numbers",
    subtopics: [
      { name: "Ordering fractions and mixed numbers", code: "U439", prereqs: ["Simplifying fractions"] },
      { name: "Adding and subtracting mixed numbers", code: "U793", prereqs: ["Ordering fractions"] },
      { name: "Multiplying with mixed numbers", code: "U224", prereqs: ["Converting between mixed numbers and improper fractions"] },
      { name: "Dividing with mixed numbers", code: "U538", prereqs: ["Adding and subtracting fractions", "Multiplying fractions", "Dividing fractions"] },
    ],
  },
  {
    year: "Y11", strand: "Expressions", topic: "Simplifying expressions",
    subtopics: [
      { name: "Simplifying expressions using index laws", code: "U662", prereqs: ["Index rules with positive indices"] },
      { name: "Simplifying algebraic fractions by cancelling common factors", code: "U103", prereqs: ["Index rules with negative indices", "Simplifying expressions by collecting like terms", "Simplifying fractions"] },
    ],
  },
  {
    year: "Y11", strand: "Equations", topic: "Solving equations",
    subtopics: [
      { name: "Solving equations with two or more steps", code: "U325", prereqs: ["Solving equations with one step"] },
      { name: "Solving equations with the unknown on both sides", code: "U870", prereqs: ["Factorising quadratic expressions of the form x^2+bx+c"] },
      { name: "Solving equations with the unknown in the denominator", code: "U505", prereqs: [] },
      { name: "Constructing and solving equations", code: "U599", prereqs: [] },
      { name: "Factorising to solve quadratic equations of the form x^2+bx+c=0", code: "U228", prereqs: [] },
      { name: "Solving quadratic equations graphically", code: "U601", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Equations", topic: "Simultaneous equations",
    subtopics: [
      { name: "Solving simultaneous equations using elimination", code: "U760", prereqs: ["Plotting straight line graphs"] },
      { name: "Solving simultaneous equations using substitution", code: "U757", prereqs: ["Substituting into algebraic formulae"] },
      { name: "Solving simultaneous equations graphically", code: "U836", prereqs: ["Changing the subjects of formulae with two or more steps"] },
      { name: "Constructing and solving simultaneous equations", code: "U137", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Angles", topic: "Finding unknown angles",
    subtopics: [
      { name: "Combining angle facts", code: "U655", prereqs: ["Angles on a line and about a point"] },
      { name: "Angles on parallel lines", code: "U826", prereqs: ["Vertically opposite angles"] },
      { name: "Using quadrilateral properties to find angles", code: "U329", prereqs: ["Angles in triangles"] },
      { name: "Angles in polygons", code: "U427", prereqs: ["Angles in quadrilaterals", "Line and shape properties"] },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { CURRICULUM };
