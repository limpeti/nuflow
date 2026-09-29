// NuFlow posztok tárolása: helyi piszkozat (IndexedDB) → posts.json
const DB = 'nuflow', STORE = 'kv', KEY = 'posts';

function open() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function tx(mode, fn) {
  const db = await open();
  return new Promise((res, rej) => {
    const t = db.transaction(STORE, mode);
    const req = fn(t.objectStore(STORE));
    t.oncomplete = () => res(req && req.result);
    t.onerror = () => rej(t.error);
  });
}

export const getDraft = () => tx('readonly', s => s.get(KEY)).catch(() => null);
export const setDraft = posts => tx('readwrite', s => s.put(posts, KEY));
export const clearDraft = () => tx('readwrite', s => s.delete(KEY));

export async function loadFile() {
  try {
    const r = await fetch('posts.json', { cache: 'no-store' });
    if (!r.ok) return null;
    const j = await r.json();
    return Array.isArray(j) ? j : j.posts;
  } catch (e) { return null; }
}

const SUB_ALIASES = { 'Többi': 'Több', 'Egyéb': 'Több', 'Hiphop/Rap': 'Hiphop', 'Nu Metal': 'NuMetal' };
const normalize = posts => posts.map(p => (SUB_ALIASES[p.sub] ? { ...p, sub: SUB_ALIASES[p.sub] } : p));

export async function loadPosts() {
  const d = await getDraft();
  if (d && d.length) {
    const n = normalize(d);
    if (n.some((p, i) => p !== d[i])) setDraft(n).catch(() => {});
    return { posts: n, source: 'draft' };
  }
  const f = await loadFile();
  if (f) return { posts: normalize(f), source: 'file' };
  return null;
}

const HU_MONTHS = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'];
export function huDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
  return m ? `${m[1]}. ${HU_MONTHS[+m[2] - 1]} ${+m[3]}.` : (iso || '');
}

export function youtubeId(url) {
  const s = (url || '').trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : '';
}
