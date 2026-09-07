/**
 * Descarga las portadas de libros que hoy cuelgan de dominios externos,
 * las redimensiona y las guarda en apps/web/public/covers/, y reescribe
 * los `coverUrl` de apps/web/data/books.ts para que apunten a las locales.
 *
 * Uso:  node scripts/download-covers.mjs
 *
 * Las que fallan (403, timeout, etc.) se dejan con la URL original y se
 * listan al final para bajarlas a mano.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const BOOKS_FILE = path.join(ROOT, 'apps/web/data/books.ts');
const OUT_DIR = path.join(ROOT, 'apps/web/public/covers');
const WIDTH = 320; // ancho al que se redimensionan (las tarjetas muestran ~144px @2x)
const TIMEOUT_MS = 15000;

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Extrae [{ title, coverUrl }] de books.ts sin ejecutar el módulo. */
function parseBooks(src) {
  const re = /title:\s*'((?:\\.|[^'\\])*)',(?:(?!title:)[\s\S])*?coverUrl:\s*'([^']+)'/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    out.push({ title: m[1].replace(/\\'/g, "'"), coverUrl: m[2] });
  }
  return out;
}

async function fetchBuffer(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        referer: new URL(url).origin + '/',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(t);
  }
}

const src = await readFile(BOOKS_FILE, 'utf8');
const books = parseBooks(src);
const remote = books.filter((b) => /^https?:\/\//.test(b.coverUrl));

console.log(`${books.length} portadas encontradas · ${remote.length} remotas a descargar\n`);
await mkdir(OUT_DIR, { recursive: true });

let newSrc = src;
const usedSlugs = new Set();
const ok = [];
const failed = [];

for (const book of remote) {
  let slug = slugify(book.title) || 'libro';
  let i = 2;
  while (usedSlugs.has(slug)) slug = `${slugify(book.title)}-${i++}`;
  usedSlugs.add(slug);

  const rel = `/covers/${slug}.webp`;
  const dest = path.join(OUT_DIR, `${slug}.webp`);

  try {
    if (!existsSync(dest)) {
      const buf = await fetchBuffer(book.coverUrl);
      await sharp(buf)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest);
    }
    const before = newSrc;
    newSrc = newSrc.replace(new RegExp(`coverUrl:\\s*'${escapeRe(book.coverUrl)}'`), `coverUrl: '${rel}'`);
    if (newSrc === before) throw new Error('descargada pero no se pudo reescribir en books.ts');
    ok.push({ title: book.title, rel });
    console.log(`  ✓ ${book.title}  →  ${rel}`);
  } catch (err) {
    failed.push({ title: book.title, url: book.coverUrl, reason: String(err.message || err) });
    console.log(`  ✗ ${book.title}  (${err.message || err})`);
  }
}

if (newSrc !== src) await writeFile(BOOKS_FILE, newSrc);

console.log(`\n${ok.length} descargadas y reescritas · ${failed.length} fallaron`);
if (failed.length) {
  console.log('\nFallaron (quedan con la URL original):');
  for (const f of failed) console.log(`  - ${f.title}\n    ${f.url}\n    (${f.reason})`);
}
