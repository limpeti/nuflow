# NuFlow – projekt leírás Claude Code-hoz

Statikus magazinportál (zene, sport, fashion, mix). Nincs build lépés és backend: a fájlok közvetlenül mennek fel egy
sima tárhelyre. A tulajdonos magyarul kommunikál; a felületen minden szöveg magyar.

## Fájlok

- `index.html` – a portál. `admin.html` – posztkezelő. Mindkettő ún. „Design Component” formátum (lásd lent).
- `posts.json` – `{ "posts": [...] }`, a posztok egyetlen forrása éles oldalon.
- `nuflow-store.js` – ES modul: `loadPosts()` (IndexedDB piszkozat → `posts.json`), `setDraft`, `clearDraft`,
  `loadFile`, `huDate`, `youtubeId`, valamint régi alkategória-nevek normalizálása (`SUB_ALIASES`).
- `support.js` – a Design Component futtatókörnyezet (React 18-at CDN-ről tölt). **Ne módosítsd.**
- `_ds/modernist-…/styles.css` – design tokenek (`--font-heading`, `--font-body`, `--color-*`). `_ds_bundle.js` – ne módosítsd.
- `images/`, `assets/` – képek, logó (`nuflow-logo-v2.png`, sötét háttérre `nuflow-logo-v2-light.png`).

## Poszt adatszerkezet

```json
{ "id": 1, "group": "Zene", "sub": "Metalcore", "title": "…", "lead": "…", "date": "2026-09-27",
  "image": "images/post-1.webp | data:image/jpeg;base64,… | https://…",
  "body": [
    { "type": "p", "text": "…" },
    { "type": "h2", "text": "…" },
    { "type": "quote", "text": "…" },
    { "type": "img", "src": "…", "caption": "…" },
    { "type": "youtube", "url": "…", "id": "11-karakteres-videó-id" }
  ] }
```

Sorrend a portálon: `date` szerint csökkenő, azonos napon a tömb sorrendje. `sub` üres is lehet.

## Design Component formátum (index.html, admin.html)

- `<x-dc>` … `</x-dc>` között a sablon: HTML **csak inline stílusokkal**, `{{ path }}` helyőrzőkkel.
  A helyőrzők csak egyszerű útvonalak lehetnek (`{{ post.title }}`) – kifejezés nem (`{{ a + b }}` nem működik).
- Vezérlés: `<sc-for list="{{ items }}" as="item">`, `<sc-if value="{{ flag }}">`.
- Hover/fókusz: `style-hover="…"`, `style-before="…"` attribútumok.
- A `<script type="text/x-dc" data-dc-script>` blokkban a logika: `class Component extends DCLogic { … }`
  React osztálykomponens `render()` nélkül; a `renderVals()` adja vissza a sablon összes értékét.
  Minden számítás (feltétel, szűrés, formázás) ide kerül, és névvel adod át a sablonnak.
- A `<helmet>` a `<head>` megfelelője (title, stíluslapok, scriptek).

## Hol mi van (index.html logika)

- `MENU` – főmenü és almenük. Új kategóriához: `MENU`, `CAT_COLORS`, `BODY` (minta szöveg), és az admin `MENU` / `CAT_COLORS` is.
- `CAT_COLORS` – címkeszínek kategóriánként `[háttér, szöveg]`.
- `SITE_TWEAKS` – a végleges dizájnbeállítások (fejléc stílus, akcentszín, kártyastílus, vonalak, címkék stb.).
  A lehetséges értékeket a `tweakGroups` tömb sorolja fel. A `?tweaks` URL-paraméter megmutatja a próbapanelt.
- `let POSTS = [...]` – beépített tartalék, ha a `posts.json` nem töltődik be; a `componentDidMount` cseréli le.
- Cikkoldal: `#post-ID` hash nyitja meg közvetlenül.

## Szabályok

- A `posts.json`-t csak kérésre írd át (a tulajdonos az adminból exportálja).
- Az `index.html` és az `admin.html` kategórialistája maradjon szinkronban.
- Tesztelés helyi szerverrel: `npx serve` vagy `python -m http.server` (file:// alatt a `posts.json` nem töltődik be).
