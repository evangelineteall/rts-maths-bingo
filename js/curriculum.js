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

  // ---------------------------------------------------------------- Y7 (SOW additions)
  {
    year: "Y7", strand: "Expressions", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Algebraic notation", code: "M813", prereqs: ["Times tables"] },
      { name: "Algebraic terminology", code: "M830", prereqs: ["Using the correct order of operations"] },
      { name: "Simplifying expressions containing a single variable", code: "M795", prereqs: ["Using the commutative laws"] },
      { name: "Simplifying expressions containing multiple variables", code: "M531", prereqs: ["Using the associative laws"] },
      { name: "Simplifying expressions containing non-linear terms", code: "M949", prereqs: ["Calculating with negative numbers"] },
    ],
  },
  {
    year: "Y7", strand: "Substitution", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Substituting into expressions with one operation", code: "M417", prereqs: ["Times tables"] },
      { name: "Substituting into expressions with multiple operations", code: "M327", prereqs: ["Using the correct order of operations"] },
      { name: "Substituting into algebraic formulae", code: "M208", prereqs: ["Calculating with negative numbers"] },
      { name: "Substituting into real-life formulae", code: "M979", prereqs: ["Algebraic notation"] },
    ],
  },
  {
    year: "Y7", strand: "Solving equations", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Solving equations with one step", code: "M707", prereqs: ["Function machines"] },
      { name: "Solving equations of the form ax+b=c", code: "M634", prereqs: ["Algebraic notation"] },
      { name: "Solving equations of the form x/a+b=c", code: "M647", prereqs: ["Substituting into expressions"] },
    ],
  },
  {
    year: "Y7", strand: "Time", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Converting units of time", code: "M515", prereqs: [] },
      { name: "Using clocks", code: "M892", prereqs: [] },
      { name: "Calculating with time", code: "M627", prereqs: [] },
      { name: "Using timetables", code: "M963", prereqs: [] },
      { name: "Using calendars", code: "M747", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Measures", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Estimating and measuring length, mass and capacity", code: "M828", prereqs: ["Multiplying and dividing by 10, 100 and 1000"] },
      { name: "Converting units of length, mass and capacity", code: "M774", prereqs: ["Using number lines"] },
      { name: "Using appropriate units", code: "M487", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Line and shape properties", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Line properties", code: "M814", prereqs: [] },
      { name: "Shape properties", code: "M276", prereqs: [] },
      { name: "Symmetry", code: "M523", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Perimeter", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Finding perimeters using grids", code: "M920", prereqs: ["Adding"] },
      { name: "Finding the perimeter of rectangles and simple shapes", code: "M635", prereqs: ["Line properties"] },
      { name: "Finding the perimeter of compound shapes", code: "M690", prereqs: ["Shape properties"] },
    ],
  },
  {
    year: "Y7", strand: "Area", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Finding areas using grids", code: "M900", prereqs: ["Multiplying"] },
      { name: "Finding the area of rectangles", code: "M390", prereqs: ["Line properties"] },
      { name: "Finding the area of compound shapes", code: "M269", prereqs: ["Shape properties"] },
      { name: "Finding the area of triangles", code: "M610", prereqs: [] },
      { name: "Finding the area of compound shapes containing triangles", code: "M996", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Coordinates and shapes", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Reading and plotting coordinates", code: "M618", prereqs: ["Shape properties"] },
      { name: "Solving shape problems involving coordinates", code: "M230", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Factors and multiples", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Finding the lowest common multiple", code: "M227", prereqs: ["Times tables"] },
      { name: "Finding factors and using divisibility tests", code: "M823", prereqs: ["Dividing numbers into equal groups"] },
      { name: "Finding the highest common factor", code: "M698", prereqs: ["Using a written method to divide integers"] },
    ],
  },
  {
    year: "Y7", strand: "Primes", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Finding prime numbers", code: "M322", prereqs: ["Times tables"] },
      { name: "Prime factor decomposition", code: "M108", prereqs: ["Finding factors and using divisibility tests"] },
    ],
  },
  {
    year: "Y7", strand: "Writing and comparing fractions", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Finding fractions of shapes", code: "M158", prereqs: ["Finding the lowest common multiple"] },
      { name: "Constructing fractions", code: "M939", prereqs: ["Finding the highest common factor"] },
      { name: "Finding equivalent fractions", code: "M410", prereqs: [] },
      { name: "Simplifying fractions", code: "M671", prereqs: [] },
      { name: "Ordering fractions", code: "M335", prereqs: [] },
      { name: "Converting between mixed numbers and improper fractions", code: "M601", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Adding and subtracting fractions", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Adding and subtracting fractions", code: "M835", prereqs: ["Finding the lowest common multiple"] },
      { name: "Adding and subtracting mixed numbers", code: "M931", prereqs: ["Finding the highest common factor"] },
    ],
  },
  {
    year: "Y7", strand: "Single brackets", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Using the distributive law", code: "M637", prereqs: ["Algebraic notation"] },
      { name: "Expanding single brackets", code: "M237", prereqs: ["Simplifying expressions containing a single variable"] },
      { name: "Expanding single brackets and simplifying expressions", code: "M792", prereqs: ["Finding the highest common factor"] },
      { name: "Factorising into one bracket", code: "M100", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Angles", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Types of angles", code: "M502", prereqs: [] },
      { name: "Estimating angles", code: "M541", prereqs: [] },
      { name: "Measuring angles", code: "M780", prereqs: [] },
      { name: "Drawing angles", code: "M331", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Finding unknown angles", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Angles on a line and about a point", code: "M818", prereqs: ["Types of angles"] },
      { name: "Vertically opposite angles", code: "M163", prereqs: ["Solving equations with one step"] },
      { name: "Angles in triangles", code: "M351", prereqs: ["Solving equations of the form ax + b = c"] },
    ],
  },
  {
    year: "Y7", strand: "Averages and range", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Calculating the range", code: "M328", prereqs: ["Place value"] },
      { name: "Calculating the median", code: "M934", prereqs: ["Adding"] },
      { name: "Finding the mode", code: "M841", prereqs: ["Subtracting"] },
      { name: "Calculating the mean", code: "M940", prereqs: ["Multiplying"] },
    ],
  },
  {
    year: "Y7", strand: "Tables and charts", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Interpreting frequency tables and two-way tables", code: "M899", prereqs: [] },
      { name: "Drawing and interpreting tally charts", code: "M597", prereqs: [] },
      { name: "Drawing and interpreting pictograms", code: "M644", prereqs: [] },
      { name: "Drawing bar charts", code: "M460", prereqs: [] },
      { name: "Interpreting bar charts", code: "M738", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Collecting and presenting data", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Collecting and recording data using tables", code: "M945", prereqs: ["Averages and the range"] },
      { name: "Finding averages from frequency tables", code: "M127", prereqs: ["Interpreting frequency tables and two-way tables"] },
      { name: "Choosing suitable averages and solving problems", code: "M440", prereqs: ["Drawing and interpreting tally charts"] },
    ],
  },
  {
    year: "Y7", strand: "Proportion word problems", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Solving proportion problems", code: "M478", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Multiplying and dividing fractions", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Reciprocals", code: "M216", prereqs: ["Simplifying fractions"] },
      { name: "Multiplying fractions", code: "M157", prereqs: ["Converting between mixed numbers and improper fractions"] },
      { name: "Dividing fractions", code: "M110", prereqs: [] },
      { name: "Multiplying with mixed numbers", code: "M197", prereqs: [] },
      { name: "Dividing with mixed numbers", code: "M265", prereqs: [] },
    ],
  },
  {
    year: "Y7", strand: "Fractions of amounts", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Fractions of amounts without a calculator", code: "M695", prereqs: ["Multiplying fractions"] },
      { name: "Fractions of amounts with a calculator", code: "M684", prereqs: ["Solving proportion problems"] },
    ],
  },
  {
    year: "Y7", strand: "Fractions, decimals and percentages", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Converting between fractions and decimals", code: "M958", prereqs: ["Constructing fractions"] },
      { name: "Converting between fractions, decimals and percentages", code: "M264", prereqs: ["Finding equivalent fractions"] },
      { name: "Ordering fractions, decimals and percentages", code: "M553", prereqs: ["Simplifying fractions"] },
      { name: "Writing numbers as percentages of other numbers", code: "M235", prereqs: ["Ordering fractions"] },
    ],
  },
  {
    year: "Y7", strand: "Theoretical probability ", topic: "7.9: Operations and equations with directed number",
    subtopics: [
      { name: "Using probability phrases", code: "M655", prereqs: ["Constructing fractions"] },
      { name: "Writing probabilities as fractions", code: "M941", prereqs: ["Adding and subtracting fractions"] },
      { name: "Writing probabilities as fractions, decimals and percentages", code: "M938", prereqs: ["Converting between fractions, decimals and percentages"] },
      { name: "Probabilities of mutually exclusive events", code: "M755", prereqs: ["Ordering fractions, decimals and percentages"] },
      { name: "Sample space diagrams", code: "M718", prereqs: ["Writing numbers as percentages of other numbers"] },
    ],
  },

  // ---------------------------------------------------------------- Y8 (SOW additions)
  {
    year: "Y8", strand: "Ratio", topic: "Ratio",
    subtopics: [
      { name: "Writing and simplifying ratios", code: "M885", prereqs: ["Finding the highest common factor"] },
      { name: "Writing ratios in the form 1:n", code: "M543", prereqs: ["Constructing fractions"] },
      { name: "Converting between ratios, fractions and percentages", code: "M267", prereqs: ["Writing numbers as percentages of other numbers"] },
      { name: "Using equivalent ratios to find unknown amounts", code: "M801", prereqs: [] },
      { name: "Sharing amounts in a given ratio", code: "M525", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Ratio", topic: "Scale diagrams",
    subtopics: [
      { name: "Drawing and interpreting scale diagrams", code: "M112", prereqs: ["Writing and simplifying ratios"] },
    ],
  },
  {
    year: "Y8", strand: "Rounding", topic: "Significant figures",
    subtopics: [
      { name: "Rounding integers using significant figures", code: "M994", prereqs: [] },
      { name: "Rounding decimals using significant figures", code: "M131", prereqs: [] },
      { name: "Estimating calculations", code: "M878", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Coordinates", topic: "Coordinates and midpoints",
    subtopics: [
      { name: "Calculating midpoints", code: "M622", prereqs: ["Reading and plotting coordinates"] },
      { name: "Mixed problems: Coordinates and midpoints", code: "M311", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Area", topic: "Area and units",
    subtopics: [
      { name: "Finding the area of parallelograms", code: "M291", prereqs: ["Finding the area of rectangles"] },
      { name: "Finding the area of trapeziums", code: "M705", prereqs: ["Finding the area of compound shapes"] },
      { name: "Converting units of area", code: "M728", prereqs: ["Finding the area of triangles"] },
    ],
  },
  {
    year: "Y8", strand: "Circles", topic: "Area and circumference",
    subtopics: [
      { name: "Identifying parts of circles", code: "M595", prereqs: ["Calculating with roots and powers"] },
      { name: "Finding the circumference of circles", code: "M169", prereqs: ["Substituting into algebraic formulae"] },
      { name: "Finding the area of circles", code: "M231", prereqs: ["Rounding decimals"] },
    ],
  },
  {
    year: "Y8", strand: "Standard form", topic: "Standard form and ordinary numbers ",
    subtopics: [
      { name: "Using standard form with positive indices", code: "M719", prereqs: ["Multiplying and dividing by 10, 100 and 1000"] },
      { name: "Using standard form with negative indices", code: "M678", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Venn diagrams", topic: "Venn diagrams",
    subtopics: [
      { name: "Venn diagrams", code: "M829", prereqs: ["Writing probabilities as fractions"] },
      { name: "Probabilities from Venn diagrams", code: "M419", prereqs: ["Writing probabilities as fractions, decimals and percentages"] },
    ],
  },
  {
    year: "Y8", strand: "Venn diagrams", topic: "Factors, multiples and primes",
    subtopics: [
      { name: "Finding the HCF and LCM using prime factor decomposition", code: "M365", prereqs: ["Venn diagrams"] },
    ],
  },
  {
    year: "Y8", strand: "3D shapes", topic: "Nets",
    subtopics: [
      { name: "Properties of 3D shapes", code: "M767", prereqs: ["Shape properties"] },
      { name: "Nets of 3D shapes", code: "M518", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Surface area and volume", topic: "Surface area",
    subtopics: [
      { name: "Finding the surface area from a net", code: "M884", prereqs: ["Nets of 3D shapes"] },
      { name: "Finding the surface area of cubes and cuboids", code: "M534", prereqs: ["Finding the area of compound shapes"] },
      { name: "Finding the surface area of prisms", code: "M661", prereqs: ["Finding the area of compound shapes containing triangles"] },
    ],
  },
  {
    year: "Y8", strand: "Surface area and volume", topic: "Volume",
    subtopics: [
      { name: "Finding the volume of cubes and cuboids", code: "M765", prereqs: ["Finding the area of compound shapes"] },
      { name: "Finding the volume of prisms", code: "M722", prereqs: ["Finding the area of compound shapes containing triangles"] },
      { name: "Converting units of volume", code: "M465", prereqs: ["Converting units of length"] },
    ],
  },
  {
    year: "Y8", strand: "Linear graphs", topic: "Plotting graphs and finding equations",
    subtopics: [
      { name: "Plotting horizontal, vertical and diagonal lines", code: "M797", prereqs: ["Reading and plotting coordinates"] },
      { name: "Plotting straight line graphs", code: "M932", prereqs: ["Substituting into algebraic formulae"] },
      { name: "Finding equations of straight line graphs", code: "M544", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Transformations", topic: "Transforming shapes",
    subtopics: [
      { name: "Translation", code: "M139", prereqs: ["Reading and plotting coordinates"] },
      { name: "Reflection", code: "M290", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Angles", topic: "Finding unknown angles",
    subtopics: [
      { name: "Angles in quadrilaterals", code: "M679", prereqs: ["Angles on a line and about a point"] },
      { name: "Combining angle facts", code: "M319", prereqs: ["Vertically opposite angles"] },
      { name: "Angles on parallel lines", code: "M606", prereqs: ["Angles in triangles"] },
      { name: "Using quadrilateral properties to find angles", code: "M393", prereqs: [] },
      { name: "Angles in polygons", code: "M653", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Statistical diagrams", topic: "Drawing and interpreting statistical diagrams",
    subtopics: [
      { name: "Drawing pie charts", code: "M574", prereqs: ["Drawing angles"] },
      { name: "Interpreting pie charts", code: "M165", prereqs: ["Angles on a line and about a point"] },
      { name: "Drawing line graphs", code: "M140", prereqs: ["Fractions of amounts without a calculator"] },
      { name: "Interpreting line graphs", code: "M183", prereqs: ["Averages and range"] },
      { name: "Drawing stem-and-leaf diagrams", code: "M648", prereqs: [] },
      { name: "Interpreting stem-and-leaf diagrams", code: "M210", prereqs: [] },
      { name: "Finding averages from diagrams", code: "U854", prereqs: [] },
    ],
  },
  {
    year: "Y8", strand: "Inequalities", topic: "Linear inequalities",
    subtopics: [
      { name: "Reading and drawing linear inequalities on number lines", code: "M384", prereqs: ["Using number lines"] },
      { name: "Solving single inequalities", code: "M118", prereqs: ["Solving equations with one step"] },
    ],
  },
  {
    year: "Y8", strand: "Brackets", topic: "Double brackets",
    subtopics: [
      { name: "Expanding double brackets", code: "M960", prereqs: ["Expanding single brackets and simplifying expressions"] },
    ],
  },
  {
    year: "Y8", strand: "Algebraic fractions", topic: "Fractions review",
    subtopics: [
      { name: "Calculating with fractions", code: "M645", prereqs: ["Adding and subtracting fractions"] },
      { name: "Calculating with mixed numbers", code: "M619", prereqs: ["Adding and subtracting mixed numbers"] },
    ],
  },
  {
    year: "Y8", strand: "Algebraic fractions", topic: "Algebraic fractions ",
    subtopics: [
      { name: "Simplifying algebraic fractions by factorising", code: "M754", prereqs: ["Calculating with fractions"] },
      { name: "Adding and subtracting algebraic fractions", code: "M336", prereqs: ["Simplifying algebraic fractions by cancelling common factors"] },
    ],
  },
  {
    year: "Y8", strand: "Recurring decimals", topic: "Fractions and recurring decimals ",
    subtopics: [
      { name: "Using recurring decimal notation", code: "M701", prereqs: ["Using a written method to divide by integers to get a decimal answer"] },
      { name: "Converting fractions to recurring decimals", code: "M922", prereqs: ["Converting between fractions, decimals and percentages"] },
    ],
  },

  // ---------------------------------------------------------------- Y9 (SOW additions)
  {
    year: "Y9", strand: "Rounding", topic: "Error intervals",
    subtopics: [
      { name: "Finding error intervals", code: "U657", prereqs: ["Rounding integers"] },
      { name: "Truncating decimals", code: "U108", prereqs: ["Rounding decimals"] },
      { name: "Finding error intervals for truncated numbers", code: "U301", prereqs: ["Rounding integers using significant figures"] },
    ],
  },
  {
    year: "Y9", strand: "3D shapes", topic: "Representations of 3D shapes",
    subtopics: [
      { name: "Plans and elevations", code: "U743", prereqs: ["Properties of 3D shapes"] },
    ],
  },
  {
    year: "Y9", strand: "Pythagoras' theorem", topic: "Pythagoras' theorem in 2D",
    subtopics: [
      { name: "Using Pythagoras' theorem in 2D", code: "U385", prereqs: ["Calculating with roots and powers"] },
      { name: "Applying Pythagoras' theorem in 2D", code: "U828", prereqs: ["Solving equations with two or more steps"] },
    ],
  },
  {
    year: "Y9", strand: "Ratio and proportion", topic: "Ratio",
    subtopics: [
      { name: "Writing and simplifying ratios", code: "U687", prereqs: ["Finding the highest common factor"] },
      { name: "Sharing amounts in a given ratio", code: "U577", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Ratio and proportion", topic: "Proportion word problems",
    subtopics: [
      { name: "Solving direct proportion word problems", code: "U721", prereqs: [] },
      { name: "Solving inverse proportion word problems", code: "U357", prereqs: [] },
      { name: "Currency conversion", code: "U610", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Linear graphs", topic: "Plotting graphs and finding equations",
    subtopics: [
      { name: "Plotting straight line graphs", code: "U741", prereqs: ["Reading and plotting coordinates"] },
      { name: "Finding equations of straight line graphs", code: "U315", prereqs: ["Plotting horizontal, vertical and diagonal lines"] },
      { name: "Interpreting equations of straight line graphs", code: "U669", prereqs: ["Plotting straight line graphs"] },
    ],
  },
  {
    year: "Y9", strand: "Compound measures", topic: "Speed and rates",
    subtopics: [
      { name: "Calculating with speed", code: "U151", prereqs: ["Substituting into formulae"] },
      { name: "Calculating with rates", code: "U256", prereqs: ["Solving equations with two or more steps"] },
    ],
  },
  {
    year: "Y9", strand: "Motion-time graphs", topic: "Distance-time graphs",
    subtopics: [
      { name: "Plotting distance-time graphs", code: "U403", prereqs: ["Calculating with speed"] },
      { name: "Interpreting distance-time graphs", code: "U914", prereqs: ["Finding equations of straight line graphs"] },
      { name: "Calculating speed from distance-time graphs", code: "U462", prereqs: [] },
      { name: "Plotting distance-time graphs using speeds", code: "U966", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Quadratic graphs", topic: "Plotting and interpreting quadratic graphs",
    subtopics: [
      { name: "Plotting graphs of quadratic functions", code: "U989", prereqs: ["Substituting into algebraic formulae"] },
      { name: "Interpreting graphs of quadratic functions", code: "U667", prereqs: ["Plotting straight line graphs"] },
      { name: "Solving quadratic equations graphically", code: "U601", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Angles and bearings", topic: "Angles",
    subtopics: [
      { name: "Combining angle facts", code: "U655", prereqs: ["Angles on a line and about a point"] },
      { name: "Angles on parallel lines", code: "U826", prereqs: ["Vertically opposite angles"] },
      { name: "Using quadrilateral properties to find angles", code: "U329", prereqs: ["Angles in triangles"] },
      { name: "Angles in polygons", code: "U427", prereqs: ["Angles in quadrilaterals"] },
    ],
  },
  {
    year: "Y9", strand: "Angles and bearings", topic: "Bearings",
    subtopics: [
      { name: "Measuring and drawing bearings", code: "U525", prereqs: ["Types of angles","Measuring angles","Drawing angles"] },
      { name: "Calculating bearings", code: "U107", prereqs: ["Combining angle facts"] },
    ],
  },
  {
    year: "Y9", strand: "Transformations", topic: "Transforming shapes",
    subtopics: [
      { name: "Translation", code: "U196", prereqs: ["Translation"] },
      { name: "Reflection", code: "U799", prereqs: ["Reflection"] },
      { name: "Rotation", code: "U696", prereqs: [] },
      { name: "Enlargement by a positive scale factor", code: "U519", prereqs: [] },
      { name: "Mixed transformations", code: "M881", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Similarity and congruence", topic: "Similarity",
    subtopics: [
      { name: "Understanding similarity", code: "U551", prereqs: ["Solving direct proportion word problems"] },
      { name: "Finding unknown sides in similar shapes", code: "U578", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Similarity and congruence", topic: "Congruence",
    subtopics: [
      { name: "Understanding congruence", code: "U790", prereqs: [] },
      { name: "Congruent triangles", code: "U866", prereqs: [] },
      { name: "Constructing triangles", code: "U187", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Handling data and statistical diagrams", topic: "Scatter graphs",
    subtopics: [
      { name: "Plotting scatter graphs", code: "U199", prereqs: ["Reading and plotting coordinates"] },
      { name: "Interpreting scatter graphs", code: "U277", prereqs: ["Finding equations of straight line graphs"] },
      { name: "Using lines of best fit", code: "U128", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Handling data and statistical diagrams", topic: "Collecting and presenting data",
    subtopics: [
      { name: "Types of data", code: "U322", prereqs: ["Averages and range"] },
      { name: "Presenting data and making conclusions", code: "U571", prereqs: ["Interpreting graphs and charts"] },
      { name: "Comparing populations using diagrams", code: "U520", prereqs: [] },
      { name: "Choosing suitable averages and solving problems", code: "U717", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Handling data and statistical diagrams", topic: "Grouped data",
    subtopics: [
      { name: "Interpreting frequency tables with grouped data", code: "U312", prereqs: ["Interpreting frequency tables and two-way tables"] },
      { name: "Finding averages from grouped data", code: "U877", prereqs: ["Finding averages from frequency tables"] },
      { name: "Drawing and interpreting frequency polygons", code: "U840", prereqs: [] },
    ],
  },
  {
    year: "Y9", strand: "Vectors", topic: "Column vectors",
    subtopics: [
      { name: "Understanding column vectors", code: "U632", prereqs: [] },
      { name: "Adding and subtracting column vectors", code: "U903", prereqs: [] },
      { name: "Multiplying column vectors by a scalar", code: "U564", prereqs: [] },
      { name: "Identifying parallel vectors", code: "U660", prereqs: [] },
    ],
  },

  // ---------------------------------------------------------------- Y10 (SOW additions)
  {
    year: "Y10", strand: "Linear graphs", topic: "Equations of linear graphs",
    subtopics: [
      { name: "Equations of parallel lines", code: "U377", prereqs: ["Finding equations of straight line graphs"] },
      { name: "Finding the equation of a straight line from its gradient and a point", code: "U477", prereqs: ["Interpreting equations of straight line graphs"] },
      { name: "Finding the equation of a straight line from two points on the line", code: "U848", prereqs: [] },
      { name: "Equations of parallel and perpendicular lines*", code: "U898", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Real-life graphs", topic: "Plotting and interpreting real-life graphs",
    subtopics: [
      { name: "Plotting linear real-life graphs", code: "U652", prereqs: ["Plotting straight line graphs"] },
      { name: "Using and finding equations of linear real-life graphs", code: "U862", prereqs: ["Finding equations of straight line graphs"] },
      { name: "Sketch graphs of water flows", code: "U896", prereqs: ["Interpreting equations of straight line graphs"] },
    ],
  },
  {
    year: "Y10", strand: "Set notation", topic: "Venn diagrams and set notation",
    subtopics: [
      { name: "Venn diagrams with set notation", code: "U748", prereqs: ["Venn diagrams"] },
      { name: "Using set notation", code: "U296", prereqs: ["Writing probabilities as fractions, decimals and percentages"] },
    ],
  },
  {
    year: "Y10", strand: "Tree diagrams", topic: "Independent and dependent events",
    subtopics: [
      { name: "Tree diagrams for independent events", code: "U558", prereqs: ["Multiplying fractions"] },
      { name: "Tree diagrams for dependent events", code: "U729", prereqs: ["Writing probabilities as fractions, decimals and percentages"] },
    ],
  },
  {
    year: "Y10", strand: "Compound measures", topic: "Density and pressure",
    subtopics: [
      { name: "Calculating with density", code: "U910", prereqs: ["Substituting"] },
      { name: "Calculating with pressure", code: "U527", prereqs: ["Converting units"] },
    ],
  },
  {
    year: "Y10", strand: "Ratio", topic: "Working with ratios and algebra",
    subtopics: [
      { name: "Combining ratios", code: "U921", prereqs: ["Writing and simplifying ratios"] },
      { name: "Calculating with ratios and algebra", code: "U676", prereqs: ["Using equivalent ratios to find unknown amounts"] },
      { name: "Changing ratios", code: "U865", prereqs: ["Sharing amounts in a given ratio"] },
    ],
  },
  {
    year: "Y10", strand: "Graphs", topic: "Velocity-time graphs",
    subtopics: [
      { name: "Calculating acceleration from velocity-time graphs", code: "U562", prereqs: ["Plotting distance-time graphs"] },
      { name: "Plotting velocity-time graphs", code: "U937", prereqs: ["Interpreting distance-time graphs"] },
    ],
  },
  {
    year: "Y10", strand: "Graphs", topic: "Cubic, reciprocal and exponential graphs",
    subtopics: [
      { name: "Graphs of cubic functions", code: "U980", prereqs: ["Plotting graphs of quadratic functions"] },
      { name: "Graphs of reciprocal functions", code: "U593", prereqs: ["Interpreting graphs of quadratic functions"] },
      { name: "Graphs of exponential functions*", code: "U229", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Sequences", topic: "Arithmetic and geometric sequences",
    subtopics: [
      { name: "Position-to-term rules for arithmetic sequences", code: "U498", prereqs: ["Term-to-term rules"] },
      { name: "Position-to-term rules for sequences of patterns", code: "U978", prereqs: ["Substituting into position-to-term rules"] },
      { name: "Position-to-term rules for geometric sequences", code: "U958", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Handling data", topic: "Sampling",
    subtopics: [
      { name: "Sampling and bias", code: "U162", prereqs: ["Solving direct proportion word problems"] },
    ],
  },
  {
    year: "Y10", strand: "Proportion", topic: "Direct and inverse proportion",
    subtopics: [
      { name: "Interpreting direct proportion equations", code: "U640", prereqs: ["Solving direct proportion word problems"] },
      { name: "Interpreting inverse proportion equations", code: "U364", prereqs: ["Solving inverse proportion word problems"] },
      { name: "Graphs of direct and inverse proportion", code: "U238", prereqs: ["Graphs of reciprocal functions"] },
    ],
  },
  {
    year: "Y10", strand: "Transformations", topic: "Transforming shapes",
    subtopics: [
      { name: "Combining transformations", code: "U766", prereqs: ["Translation"] },
    ],
  },
  {
    year: "Y10", strand: "Rounding", topic: "Error intervals",
    subtopics: [
      { name: "Finding error intervals", code: "U657", prereqs: ["Rounding integers"] },
      { name: "Finding error intervals for truncated numbers", code: "U301", prereqs: ["Rounding decimals"] },
    ],
  },
  {
    year: "Y10", strand: "Indices", topic: "Index laws",
    subtopics: [
      { name: "Index rules with positive indices", code: "U235", prereqs: ["Calculating with roots and powers"] },
      { name: "Index rules with negative indices", code: "U694", prereqs: ["Simplifying fractions"] },
      { name: "Simplifying expressions using index laws", code: "U662", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Brackets", topic: "Expanding and factorising brackets",
    subtopics: [
      { name: "Expanding double brackets", code: "U768", prereqs: ["Using algebraic notation"] },
      { name: "Factorising quadratic expressions of the form x^2+bx+c=0", code: "U178", prereqs: ["Simplifying expressions by collecting like terms"] },
      { name: "Factorising the difference of two squares", code: "U963", prereqs: ["Finding the highest common factor"] },
      { name: "Factorising to solve quadratic equations of the form x^2+bx+c=0", code: "U228", prereqs: ["Expanding single brackets"] },
    ],
  },
  {
    year: "Y10", strand: "Handling data and statistical diagrams", topic: "Grouped data",
    subtopics: [
      { name: "Interpreting frequency tables with grouped data", code: "U312", prereqs: ["Interpreting frequency tables and two-way tables"] },
      { name: "Finding averages from grouped data", code: "U877", prereqs: ["Finding averages from frequency tables"] },
    ],
  },
  {
    year: "Y10", strand: "Handling data and statistical diagrams", topic: "Drawing and interpreting statistical diagrams",
    subtopics: [
      { name: "Drawing stem-and-leaf diagrams", code: "U200", prereqs: ["Reading and plotting coordinates"] },
      { name: "Interpreting stem-and-leaf diagrams", code: "U909", prereqs: ["Drawing bar charts"] },
      { name: "Drawing line graphs", code: "U590", prereqs: ["Interpreting bar charts"] },
      { name: "Interpreting line graphs", code: "U193", prereqs: [] },
      { name: "Drawing and interpreting frequency polygons", code: "U840", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Sequences", topic: "Quadratic and geometric sequences",
    subtopics: [
      { name: "Position-to-term rules for quadratic sequences", code: "U206", prereqs: ["Term-to-term rules"] },
      { name: "Special sequences", code: "U680", prereqs: ["Position-to-term rules for arithmetic sequences"] },
    ],
  },
  {
    year: "Y10", strand: "Handling data", topic: "Sampling",
    subtopics: [
      { name: "Capture-recapture", code: "U328", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Proportion", topic: "Direct and inverse proportion",
    subtopics: [
      { name: "Constructing direct proportion equations", code: "U407", prereqs: ["Solving direct proportion word problems"] },
      { name: "Constructing inverse proportion equations", code: "U138", prereqs: ["Solving inverse proportion word problems"] },
    ],
  },
  {
    year: "Y10", strand: "Transformations", topic: "Transforming shapes",
    subtopics: [
      { name: "Enlargement by a positive or negative scale factor", code: "U134", prereqs: ["Translation"] },
    ],
  },
  {
    year: "Y10", strand: "Rounding", topic: "Bounds",
    subtopics: [
      { name: "Finding bounds for calculations", code: "U587", prereqs: ["Finding error intervals"] },
    ],
  },
  {
    year: "Y10", strand: "Indices", topic: "Index laws",
    subtopics: [
      { name: "Estimating roots and powers", code: "U299", prereqs: ["Calculating with roots and powers"] },
      { name: "Indices of the form 1/a", code: "U985", prereqs: ["Index rules with positive indices"] },
      { name: "Indices of the form a/b", code: "U772", prereqs: ["Index rules with negative indices"] },
    ],
  },
  {
    year: "Y10", strand: "Recurring decimals", topic: "Fractions and recurring decimals",
    subtopics: [
      { name: "Converting fractions to recurring decimals", code: "U550", prereqs: ["Using a written method to divide with decimals"] },
      { name: "Converting recurring decimals to fractions", code: "U689", prereqs: ["Solving equations with two or more steps"] },
    ],
  },
  {
    year: "Y10", strand: "Brackets", topic: "Expanding and factorising brackets",
    subtopics: [
      { name: "Expanding triple brackets", code: "U606", prereqs: ["Expanding double brackets"] },
      { name: "Completing the square", code: "U397", prereqs: ["Factorising quadratic expressions of the form x^2+bx+c"] },
      { name: "Factorising quadratic expressions of the form ax^2+bx+c", code: "U858", prereqs: ["Factorising the difference of two squares"] },
      { name: "Finding the turning point of a quadratic graph by completing the square", code: "U769", prereqs: ["Factorising to solve quadratic equations of the form x^2+bx+c=0"] },
    ],
  },
  {
    year: "Y10", strand: "Handling data and statistical diagrams", topic: "Cumulative frequency graphs",
    subtopics: [
      { name: "Drawing cumulative frequency graphs", code: "U182", prereqs: ["Interpreting frequency tables with grouped data"] },
      { name: "Interpreting cumulative frequency graphs", code: "U642", prereqs: [] },
    ],
  },
  {
    year: "Y10", strand: "Handling data and statistical diagrams", topic: "Box plots",
    subtopics: [
      { name: "Drawing box plots", code: "U879", prereqs: ["Calculating the median"] },
      { name: "Interpreting box plots", code: "U837", prereqs: ["Finding the mode"] },
      { name: "Comparing populations using box plots and cumulative frequency graphs", code: "U507", prereqs: [] },
    ],
  },

  // ---------------------------------------------------------------- Y11 (SOW additions)
  {
    year: "Y11", strand: "Right-angled triangles", topic: "Pythagoras' theorem and trigonometry",
    subtopics: [
      { name: "Using Pythagoras' theorem in 2D", code: "U385", prereqs: ["Calculating with roots and powers"] },
      { name: "Applying Pythagoras' theorem in 2D", code: "U828", prereqs: ["Solving equations with two or more steps"] },
      { name: "Finding unknown sides in right-angled triangles", code: "U283", prereqs: ["Changing the subjects of formulae with two or more steps"] },
      { name: "Finding unknown angles in right-angled triangles", code: "U545", prereqs: ["Angles in triangles"] },
      { name: "Using the exact values of trigonometric ratios", code: "U627", prereqs: ["Angles on parallel lines"] },
      { name: "Angles of elevation and depression", code: "U967", prereqs: ["Understanding sin, cos and tan"] },
      { name: "Calculating bearings", code: "U107", prereqs: ["Measuring and drawing bearings"] },
      { name: "Calculating with trigonometry and bearings", code: "U164", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Surface area and volume", topic: "Surface area",
    subtopics: [
      { name: "Finding the surface area of cones and spheres", code: "U771", prereqs: ["Finding the surface area of cubes and cuboids"] },
      { name: "Finding the surface area of frustums", code: "U334", prereqs: ["Finding the surface area of prisms"] },
      { name: "Finding the surface area of composite shapes", code: "U561", prereqs: ["Finding the surface area of pyramids"] },
    ],
  },
  {
    year: "Y11", strand: "Surface area and volume", topic: "Volume",
    subtopics: [
      { name: "Finding the volume of cones and spheres", code: "U426", prereqs: ["Finding the volume of cubes and cuboids"] },
      { name: "Finding the volume of frustums", code: "U350", prereqs: ["Finding the volume of prisms"] },
      { name: "Finding the volume of composite shapes", code: "U543", prereqs: ["Finding the volume of pyramids"] },
    ],
  },
  {
    year: "Y11", strand: "Statistical diagrams", topic: "Drawing and interpreting statistical diagrams",
    subtopics: [
      { name: "Drawing pie charts", code: "U508", prereqs: ["Angles on a line and about a point"] },
      { name: "Interpreting pie charts", code: "U172", prereqs: ["Finding fractions of amounts"] },
      { name: "Plotting scatter graphs", code: "U199", prereqs: ["Bar charts"] },
      { name: "Interpreting scatter graphs", code: "U277", prereqs: ["Line graphs"] },
      { name: "Using lines of best fit", code: "U128", prereqs: ["Interpreting frequency tables with grouped data"] },
    ],
  },
  {
    year: "Y11", strand: "Probability", topic: "Theoretical and experimental probability",
    subtopics: [
      { name: "Probabilities of mutually exclusive events", code: "U683", prereqs: ["Writing probabilities as fractions, decimals and percentages"] },
      { name: "Sample space diagrams", code: "U104", prereqs: ["Venn diagrams"] },
      { name: "Expected results from repeated experiments", code: "U166", prereqs: ["Frequency trees"] },
      { name: "Venn diagrams with set notation", code: "U748", prereqs: ["Calculations with fractions"] },
      { name: "Using set notation", code: "U296", prereqs: [] },
      { name: "Tree diagrams for independent events", code: "U558", prereqs: [] },
      { name: "Tree diagrams for dependent events", code: "U729", prereqs: [] },
      { name: "Experimental probabilities", code: "U580", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Inequalities", topic: "Linear inequalities",
    subtopics: [
      { name: "Solving inequalities with the unknown on both sides", code: "U738", prereqs: ["Reading and drawing inequalities on number lines"] },
      { name: "Solving double inequalities", code: "U145", prereqs: ["Solving single inequalities"] },
      { name: "Constructing and solving inequalities", code: "U337", prereqs: ["Solving equations with the unknown on both sides"] },
    ],
  },
  {
    year: "Y11", strand: "Vectors", topic: "Vector problems",
    subtopics: [
      { name: "Adding and subtracting column vectors", code: "U903", prereqs: ["Understanding column vectors"] },
      { name: "Multiplying column vectors by a scalar", code: "U564", prereqs: [] },
      { name: "Identifying parallel vectors", code: "U660", prereqs: [] },
      { name: "Solving geometric problems using vectors", code: "U781", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Percentages", topic: "Percentage change",
    subtopics: [
      { name: "Percentage change with a calculator", code: "U671", prereqs: ["Finding percentages of amounts without a calculator"] },
      { name: "Finding original amounts in percentage calculations", code: "U286", prereqs: ["Finding percentages of amounts with a calculator"] },
      { name: "Finding the percentage an amount has been changed by", code: "U278", prereqs: ["Percentage change without a calculator"] },
      { name: "Compound interest calculations", code: "U332", prereqs: [] },
      { name: "Growth and decay", code: "U988", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Compound measures", topic: "Calculating with compound measures",
    subtopics: [
      { name: "Calculating with speed", code: "U151", prereqs: ["Substituting into formulae"] },
      { name: "Calculating with rates", code: "U256", prereqs: ["Solving equations"] },
      { name: "Calculating with density", code: "U910", prereqs: ["Changing the subjects of formulae with two or more steps"] },
      { name: "Calculating with pressure", code: "U527", prereqs: ["Reading, converting and calculating with time"] },
    ],
  },
  {
    year: "Y11", strand: "Ratio and proportion", topic: "Working with ratios and algebra",
    subtopics: [
      { name: "Combining ratios", code: "U921", prereqs: ["Writing and simplifying ratios"] },
      { name: "Calculating with ratios and algebra", code: "U676", prereqs: ["Using equivalent ratios to find unknown amounts"] },
      { name: "Changing ratios", code: "U865", prereqs: ["Sharing amounts in a given ratio"] },
    ],
  },
  {
    year: "Y11", strand: "Ratio and proportion", topic: "Proportion word problems",
    subtopics: [
      { name: "Solving direct proportion word problems", code: "U721", prereqs: [] },
      { name: "Solving inverse proportion word problems", code: "U357", prereqs: [] },
      { name: "Currency conversion", code: "U610", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Standard form", topic: "Calculating with standard form",
    subtopics: [
      { name: "Multiplying and dividing numbers in standard form", code: "U264", prereqs: ["Using standard form with positive indices"] },
      { name: "Adding and subtracting numbers in standard form", code: "U290", prereqs: ["Using standard form with negative indices"] },
      { name: "Standard form with a calculator", code: "U161", prereqs: ["Index rules with positive indices"] },
    ],
  },
  {
    year: "Y11", strand: "Sequences", topic: "Arithmetic and geometric sequences",
    subtopics: [
      { name: "Position-to-term rules for arithmetic sequences", code: "U498", prereqs: ["Term-to-term rules"] },
      { name: "Position-to-term rules for sequences of patterns", code: "U978", prereqs: ["Substituting into position-to-term rules"] },
      { name: "Position-to-term rules for geometric sequences", code: "U958", prereqs: [] },
      { name: "Special sequences", code: "U680", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Linear graphs", topic: "Equations of linear graphs",
    subtopics: [
      { name: "Plotting straight line graphs", code: "U741", prereqs: ["Reading and plotting coordinates"] },
      { name: "Finding equations of straight line graphs", code: "U315", prereqs: [] },
      { name: "Interpreting equations of straight line graphs", code: "U669", prereqs: [] },
      { name: "Equations of parallel lines", code: "U377", prereqs: [] },
      { name: "Finding the equation of a straight line from its gradient and a point", code: "U477", prereqs: [] },
      { name: "Finding the equation of a straight line from two points on the line", code: "U848", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Surds", topic: "Calculating with surds",
    subtopics: [
      { name: "Multiplying and dividing surds", code: "U633", prereqs: ["Calculating with roots and powers"] },
      { name: "Simplifying surds", code: "U338", prereqs: ["Simplifying expressions by collecting like terms"] },
      { name: "Adding and subtracting surds", code: "U872", prereqs: ["Expanding single brackets"] },
      { name: "Expanding brackets with surds", code: "U499", prereqs: ["Expanding double brackets"] },
    ],
  },
  {
    year: "Y11", strand: "Surds", topic: "Rationalising denominators",
    subtopics: [
      { name: "Rationalising denominators containing a single term", code: "U707", prereqs: ["Multiplying and dividing surds"] },
      { name: "Rationalising denominators containing two terms", code: "U281", prereqs: ["Simplifying surds"] },
    ],
  },
  {
    year: "Y11", strand: "Algebraic fractions", topic: "Calculating with algebraic fractions",
    subtopics: [
      { name: "Simplifying algebraic fractions by factorising into one bracket", code: "U437", prereqs: ["Calculations with fractions"] },
      { name: "Simplifying algebraic fractions by factorising into two brackets", code: "U294", prereqs: ["Simplifying algebraic fractions by cancelling common factors"] },
      { name: "Adding and subtracting algebraic fractions", code: "U685", prereqs: ["Factorising into one bracket"] },
      { name: "Multiplying algebraic fractions", code: "U457", prereqs: ["Factorising quadratic expressions of the form x^2+bx+c"] },
      { name: "Dividing algebraic fractions", code: "U824", prereqs: ["Factorising quadratic expressions of the form ax^2+bx+c"] },
    ],
  },
  {
    year: "Y11", strand: "Equations", topic: "Solving quadratic equations",
    subtopics: [
      { name: "Factorising to solve quadratic equations of the form ax^2+bx+c=0", code: "U960", prereqs: ["Factorising quadratic expressions of the form ax^2+bx+c"] },
      { name: "Solving quadratic equations by completing the square", code: "U589", prereqs: ["Factorising to solve quadratic equations of the form x^2+bx+c=0"] },
      { name: "Solving quadratic equations using the quadratic formula", code: "U665", prereqs: ["Completing the square"] },
      { name: "Constructing and solving quadratic equations", code: "U150", prereqs: ["Substituting into algebraic formulae"] },
    ],
  },
  {
    year: "Y11", strand: "Equations", topic: "Simultaneous equations",
    subtopics: [
      { name: "Solving simultaneous equations involving quadratics", code: "U547", prereqs: ["Solving simultaneous equations using elimination"] },
      { name: "Solving simultaneous equations involving quadratics graphically", code: "U875", prereqs: ["Solving simultaneous equations using substitution"] },
    ],
  },
  {
    year: "Y11", strand: "Pythagoras' theorem and trigonometry", topic: "Trigonometric ratios and graphs",
    subtopics: [
      { name: "Using the exact values of trigonometric ratios - Higher", code: "U319", prereqs: ["Understanding sin, cos and tan"] },
      { name: "Using trigonometric graphs", code: "U450", prereqs: ["Finding unknown sides in right-angled triangles"] },
    ],
  },
  {
    year: "Y11", strand: "Pythagoras' theorem and trigonometry", topic: "Non right-angled trigonometry",
    subtopics: [
      { name: "The sine rule", code: "U952", prereqs: ["Understanding sin, cos and tan"] },
      { name: "The cosine rule", code: "U591", prereqs: ["Finding unknown sides in right-angled triangles"] },
      { name: "The area rule", code: "U592", prereqs: ["Finding unknown angles in right-angled triangles"] },
    ],
  },
  {
    year: "Y11", strand: "Pythagoras' theorem and trigonometry", topic: "3D Pythagoras' theorem and trigonometry",
    subtopics: [
      { name: "Using Pythagoras' theorem in 3D", code: "U541", prereqs: ["Using Pythagoras' theorem in 2D"] },
      { name: "Trigonometry in 3D shapes", code: "U170", prereqs: ["Applying Pythagoras' theorem in 2D"] },
    ],
  },
  {
    year: "Y11", strand: "Circle geometry", topic: "Circle theorems",
    subtopics: [
      { name: "Angles subtended at the centre or circumference of a circle", code: "U459", prereqs: ["Combining angle facts"] },
      { name: "Angles in segments and cyclic quadrilaterals", code: "U251", prereqs: [] },
      { name: "Circle theorems for chords and tangents", code: "U489", prereqs: [] },
      { name: "Alternate segment theorem", code: "U130", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Statistical diagrams", topic: "Histograms",
    subtopics: [
      { name: "Drawing histograms with equal class widths", code: "U185", prereqs: ["Interpreting frequency tables with grouped data"] },
      { name: "Drawing histograms with unequal class widths", code: "U814", prereqs: ["Finding averages from grouped data"] },
      { name: "Interpreting histograms", code: "U983", prereqs: [] },
      { name: "Calculating averages from histograms", code: "U267", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Probability", topic: "Conditional probability",
    subtopics: [
      { name: "Conditional probabilities from tables", code: "U246", prereqs: ["Probabilities of mutually exclusive events"] },
      { name: "Conditional probabilities from Venn diagrams", code: "U699", prereqs: ["Venn diagrams"] },
      { name: "Using the conditional probability formula", code: "U821", prereqs: ["Tree diagrams for independent events"] },
      { name: "Conditional probabilities from tree diagrams", code: "U806", prereqs: ["Tree diagrams for dependent events"] },
      { name: "Using the product rule for counting", code: "U369", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Inequalities", topic: "Linear and quadratic inequalities",
    subtopics: [
      { name: "Graphs of linear inequalities", code: "U747", prereqs: ["Solving linear inequalities"] },
      { name: "Solving quadratic inequalities", code: "U133", prereqs: ["Factorising to solve quadratic equations of the form x^2+bx+c=0"] },
    ],
  },
  {
    year: "Y11", strand: "Functions", topic: "Substituting into functions",
    subtopics: [
      { name: "Substituting into functions", code: "U637", prereqs: ["Substituting into algebraic formulae"] },
      { name: "Substituting into composite functions", code: "U895", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Functions", topic: "Finding composite and inverse functions",
    subtopics: [
      { name: "Finding composite functions", code: "U448", prereqs: ["Substituting into functions"] },
      { name: "Finding inverse functions", code: "U996", prereqs: ["Substituting into composite functions"] },
    ],
  },
  {
    year: "Y11", strand: "Transformations", topic: "Transforming graphs",
    subtopics: [
      { name: "Translating graphs", code: "U598", prereqs: ["Substituting into functions"] },
      { name: "Reflecting graphs", code: "U487", prereqs: ["Translation"] },
      { name: "Transforming graphs", code: "U455", prereqs: ["Reflection"] },
    ],
  },
  {
    year: "Y11", strand: "Iteration", topic: "Using iterative formulae",
    subtopics: [
      { name: "Using recurrence relations", code: "U171", prereqs: ["Substituting into algebraic formulae"] },
      { name: "Substituting into iterative formulae", code: "U434", prereqs: ["Changing the subjects of formulae with two or more steps"] },
      { name: "Finding approximate solutions to equations using iteration", code: "U168", prereqs: [] },
    ],
  },
  {
    year: "Y11", strand: "Algebraic proof", topic: "Writing algebraic proofs",
    subtopics: [
      { name: "Writing algebraic proofs", code: "U582", prereqs: ["Expanding double brackets"] },
    ],
  },
  {
    year: "Y11", strand: "Similarity", topic: "Area and volume of similar shapes",
    subtopics: [
      { name: "Finding the perimeter and area of similar shapes", code: "U630", prereqs: ["Finding unknown sides in similar shapes"] },
      { name: "Finding the surface area and volume of similar shapes", code: "U110", prereqs: ["Converting units of area"] },
    ],
  },
  {
    year: "Y11", strand: "Geometric proof", topic: "Vector proofs",
    subtopics: [
      { name: "Geometric proofs with vectors", code: "U560", prereqs: ["Multiplying column vectors by a scalar"] },
    ],
  },
  {
    year: "Y11", strand: "Geometric proof", topic: "Writing geometric proofs",
    subtopics: [
      { name: "Geometric proofs with angle facts", code: "U471", prereqs: ["Finding unknown angles"] },
      { name: "Geometric proofs with congruence and similarity", code: "U887", prereqs: ["Similarity and congruence"] },
      { name: "Proving the circle theorems", code: "U807", prereqs: ["Circle theorems"] },
    ],
  },
  {
    year: "Y11", strand: "Graphs", topic: "Non-linear graphs",
    subtopics: [
      { name: "Estimating gradients of non-linear graphs using tangents", code: "U800", prereqs: ["Equations of parallel and perpendicular lines"] },
      { name: "Calculating distances from velocity-time graphs", code: "U611", prereqs: ["Interpreting graphs of quadratic functions"] },
      { name: "Estimating areas under non-linear graphs", code: "U882", prereqs: ["Graphs of cubic functions"] },
      { name: "Equations of circles and tangents", code: "U567", prereqs: ["Graphs of reciprocal functions"] },
    ],
  },
];

if (typeof module !== "undefined") module.exports = { CURRICULUM };
