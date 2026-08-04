# Design Reference

These are **design prototypes**, not part of the shipped site. The live product is
the Vite/React app at the repo root (`index.html` → `src/`).

- `Velari Home v3.dc.html` — current visual source-of-truth (gold/plum, dust plates,
  90s-CGI dioramas). The React hero is being matched to this language.
- `Velari Home v2.dc.html`, `Velari Home.dc.html` — earlier iterations, kept for history.
- `support.js` — runtime helper the `.dc.html` mockups load.

These use relative paths to `../img/` and `../fonts/`. To preview one directly, open it
from the repo root context, or ask and it can be wired to a temporary static server.
