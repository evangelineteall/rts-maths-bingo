# RTS Maths Bingo

A free, curriculum-linked whole-class revision game for Y7–Y11 / GCSE resit maths, covering
number sense, calculating, fractions, decimals, percentages, and a wide range of other topics
through to trigonometry, quadratics, HCF/LCM and angle facts. Styled in Ralph Thoresby School's
blue and gold.

**[Try it out locally by opening `index.html` in a browser](index.html)** — no installation,
no build step, no server needed. It's a plain HTML/CSS/JS site, which makes it perfect for
free hosting on GitHub Pages.

## How the game works

1. Each student draws a grid on their own whiteboard (e.g. 4×4 or 5×5) and fills it with any
   numbers they like from **0 to 100**.
2. The teacher opens the site, picks **one** topic to review (topics are single-select — picking
   a new one automatically deselects the previous one), and presses **Start game**.
3. The site calls out a maths question at a time. Students work it out on their whiteboard and,
   if the answer is a number on their grid, cross it off.
4. The teacher presses **Reveal number** to confirm the answer, then **Next question** to
   continue. A live 0–100 grid on screen highlights every number called so far — glance at it
   at any point to check students' boards are correct, or press **End game** for a full summary
   with the complete list of numbers called, in order.
5. First (or several) students to complete a line/full house wins — however you'd like to run it.

Every question is randomly generated, so you can play the same topic again and again with fresh
numbers each time ("Play again" on the summary screen keeps your topic selection). Pressing
"Choose a new topic" clears the previous selection so you always pick fresh.

## Hosting it on GitHub Pages (free)

1. **Create a new repository** on [github.com](https://github.com) — e.g. `maths-bingo`. Make it
   public (GitHub Pages needs a public repo unless you're on a paid plan).
2. **Upload the files.** On the repository page, click **Add file → Upload files**, then drag in
   everything from this folder (`index.html` and the `css`, `js`, and `img` folders), keeping the
   same folder structure. Commit the upload.
3. **Turn on GitHub Pages.** Go to the repository's **Settings → Pages**. Under "Build and
   deployment", set **Source** to "Deploy from a branch", pick the `main` branch and the `/ (root)`
   folder, then **Save**.
4. Wait a minute or two, then refresh that Settings → Pages screen — it will show you the live
   web address (something like `https://yourusername.github.io/maths-bingo/`). That's the link
   you can bookmark, put on the whiteboard, or share with colleagues.
5. Any time you want to change something (edit a question, tweak the styling), upload the changed
   file again the same way — the live site updates automatically within a minute or so.

If you're comfortable with git instead of the web upload screen, the usual `git add`, `git commit`,
`git push` to `main` works exactly the same way.

## Project structure

```
index.html        The page itself — setup, caller, and summary screens
css/style.css      All styling
img/rts-logo.png   The school crest (background removed), shown in the header
img/favicon.png    Square version of the crest used as the browser tab icon
js/curriculum.js   The topic list (strand > topic > subtopic, with the M/U codes from your
                   scheme of work)
js/generators.js   One question generator per subtopic code
js/utils.js        Small maths/randomising helper functions shared by the generators
js/app.js          Game logic: building a game from the selected topic, the caller flow, the
                   0-100 number grid
```

There's also a `test/` folder with the scripts used to check every question generator during
development (they need Node.js and aren't needed to run the site itself — feel free to delete
that folder if you don't want it in your repository).

## Editing or adding questions

Every subtopic has one generator function in `js/generators.js`, keyed by its code (e.g. `M763`
for "Using number lines"). Each one returns `{ q: "the question text", a: <a number 0-100> }`.
To tweak a question's wording or difficulty, find its code (cross-reference `js/curriculum.js`
for which code belongs to which subtopic) and edit the function. **The answer must always be a
whole number from 0 to 100** — that's the constraint the whole game is built around, since it's
the range students write on their whiteboards.

To add a completely new subtopic: add an entry to `js/curriculum.js` (with a new unique code),
then add a matching generator function in `js/generators.js` keyed by that same code.

## A note on some of the harder topics

A few subtopics near the top of the GCSE resit range (rearranging formulae, standard form,
quadratics, trigonometry, constructions/loci) don't naturally produce a "number from 0 to 100"
as their answer — e.g. solving a quadratic can give a negative root, and rearranging a formula
normally gives you another formula, not a number. For these, the question has been adapted so
the *final number asked for* still fits the 0–100 board (for example, asking for the positive
root only, or asking students to use a rearranged/substituted formula to find a specific value)
while still exercising the same underlying skill. A couple of topics (like constructing loci or
perpendicular bisectors) have been turned into a related numerical question, since the original
skill is a hands-on drawing task rather than a calculation. You may want to preface those rounds
with a reminder of what the written skill actually involves.

Because only one topic can be selected at a time, and the board only has 101 possible numbers
(0–100), some narrower topics will only reach a smaller slice of that range (the summary screen
always tells you how many numbers out of the total were actually called).

## Branding

Uses the school crest (`img/rts-logo.png`, background removed) in the header and as the browser
tab icon (`img/favicon.png`), and the official crest colours — blue `#004fa7` and gold `#fcc404`
— throughout (buttons, the header underline, the revealed-number badge, and the "called" numbers
on the grid). The motto "Ambition and Achievement for All" appears in the footer. To swap in an
updated crest, replace `img/rts-logo.png` and `img/favicon.png` with the new file (keeping the
same names) — the colours themselves live in `css/style.css` under `:root` at the top of the
file if you ever need to adjust them.
