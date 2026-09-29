# NuFlow – feltöltési és szerkesztési útmutató

## Tartalom

| Fájl / mappa | Mi ez |
| --- | --- |
| `index.html` | A portál (főoldal, kategóriák, cikkoldal) |
| `admin.html` | Posztkezelő: új poszt, szerkesztés, törlés, export |
| `posts.json` | Az összes poszt adatai – **ezt frissíted posztolás után** |
| `images/` | A meglévő posztok képei |
| `assets/` | Logó (világos és sötét háttérre) |
| `nuflow-store.js` | Posztok betöltése / mentése (portál + admin közös) |
| `support.js`, `_ds/` | Működéshez és stílushoz szükséges fájlok – ne töröld |

## Első feltöltés

1. Csomagold ki a zipet.
2. A **teljes tartalmat** (nem a mappát magát) töltsd fel a tárhely gyökérmappájába
   (általában `public_html` vagy `www`) FTP-vel (pl. FileZilla) vagy a tárhely fájlkezelőjével.
3. Nyisd meg a domaint – megjelenik a portál.

> Helyben, dupla kattintással nem működik (a böngésző tiltja a `posts.json` betöltését).
> Kipróbáláshoz tárhely vagy helyi szerver kell, pl. a mappában: `npx serve` vagy `python -m http.server`.

## Posztolás

1. Nyisd meg: `https://domained.hu/admin.html`
2. Írj / szerkessz / törölj posztot, majd **Mentés**.
   A változás először csak a te böngésződben látszik (a portálon bal lent „Helyi piszkozat látszik” jelzés).
3. **Exportálás** → letöltődik a `posts.json`.
4. Töltsd fel a tárhelyre, felülírva a régit. Kész – mindenki az új posztokat látja.

Tippek:
- Az adminban feltöltött képek a `posts.json`-ba kerülnek, külön nem kell feltölteni őket.
- Képet URL-lel vagy a tárhelyen lévő fájl nevével is megadhatsz (pl. `images/kep.jpg`).
- Másik gépen: nyisd meg az admint, és **Importálás**-sal töltsd be a legfrissebb `posts.json`-t.
- Az admin oldal címét bárki megnyithatja, de amit ott csinál, csak az ő böngészőjében marad.
  Ha nem szeretnéd kint tartani, ne töltsd fel az `admin.html`-t – a saját gépedről helyi szerverrel is használhatod.

## Dizájn próbálgatása

A portál címéhez `?tweaks`-t írva (pl. `https://domained.hu/?tweaks`) megjelenik a Tweaks panel.
Ez csak kipróbálásra való, nem ment. A végleges beállítások az `index.html` elején,
a `SITE_TWEAKS` résznél vannak – ott tudod (vagy a Claude Code) átírni őket.

## Szerkesztés Claude Code-dal

Nyisd meg ezt a mappát Claude Code-ban. A `CLAUDE.md` leírja a felépítést, így elég elmondanod, mit szeretnél
(pl. „legyen új menüpont Gaming néven”, „a lábléc legyen sötétkék”). Módosítás után töltsd fel a megváltozott fájlokat
– a `posts.json`-t csak akkor, ha a posztokat is módosítani akartad.
