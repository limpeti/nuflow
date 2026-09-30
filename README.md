# NuFlow – feltöltési és szerkesztési útmutató

## Tartalom

| Fájl / mappa | Mi ez |
| --- | --- |
| `index.html` | A portál (főoldal, kategóriák, cikkoldal) |
| `admin.html` | Posztkezelő: új poszt, szerkesztés, törlés, export |
| `posts.json` | Az összes poszt adatai – **ezt frissíted posztolás után** |
| `vercel.json` | Vercel beállítás a `/cikk/…` címekhez – ne töröld |
| `_redirects` | Ugyanez Netlify-hoz (ha valaha oda költöznél) |
| `images/`, `assets/` | Posztképek, logó |
| `support.js`, `_ds/` | Működéshez és stílushoz szükséges fájlok – ne töröld |

## Első telepítés (GitHub → Netlify)

1. Hozz létre egy új GitHub repót, és töltsd fel bele a zip **teljes tartalmát** (a repo gyökerébe, ne almappába).
   Böngészőből: repo → *Add file* → *Upload files* → húzd be a fájlokat és mappákat → *Commit changes*.
2. Netlify → *Add new site* → *Import an existing project* → GitHub → válaszd ki a repót.
3. Beállítások: **Build command:** üres, **Publish directory:** üres (vagy `/`). → *Deploy*.
4. *Domain management*-ben állítsd be a saját domaint (pl. nuflow.hu).

Ettől kezdve minden GitHub-módosítás után a Netlify magától frissíti az oldalt (kb. 1 perc).

## Posztolás

1. Nyisd meg: `https://nuflow.hu/admin.html`
2. Írj / szerkessz / törölj posztot, majd **Mentés**. (Ez először csak a te böngésződben látszik.)
3. **Exportálás** → letöltődik a `posts.json`.
4. GitHub → a repóban *Add file* → *Upload files* → húzd be a `posts.json`-t → *Commit changes*.
   A régi fájlt automatikusan felülírja, a Netlify pedig egy percen belül élesíti.

Tippek:
- **URL név:** új posztnál a címből automatikusan készül (pl. `nuflow.hu/cikk/metallica-2027-worldtour`), de átírhatod.
  Régi posztoknál üresen hagyva marad a régi link (`#post-18`).
- Az adminban feltöltött képek a `posts.json`-ba kerülnek, külön nem kell feltölteni őket.
- Másik gépen: nyisd meg az admint, és **Importálás**-sal töltsd be a legfrissebb `posts.json`-t.
- Az admin oldal címét bárki megnyithatja, de amit ott csinál, csak az ő böngészőjében marad.

> Az `admin.html` a gépedről, dupla kattintással is működik: első megnyitáskor az **Importálás** gombbal töltsd be a mappában lévő `posts.json`-t.
> Az `index.html` helyben megnyitva csak a beépített minta posztokat mutatja – a valódi posztokat és a `/cikk/…` címeket a Netlify szolgálja ki.

## Dizájn próbálgatása

A portál címéhez `?tweaks`-t írva (pl. `https://nuflow.hu/?tweaks`) megjelenik a Tweaks panel.
Ez csak kipróbálásra való, nem ment. A végleges beállítások az `index.html` elején,
a `SITE_TWEAKS` résznél vannak.

## Szerkesztés Claude Code-dal

Klónozd le a GitHub repót, és nyisd meg Claude Code-ban. A `CLAUDE.md` leírja a felépítést, így elég elmondanod,
mit szeretnél. A változásokat commitold és pushold – a Netlify automatikusan frissít.
