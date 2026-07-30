/**
 * Carga a la base de datos los libros que hoy están hardcodeados en apps/web/data/books.ts.
 * Es idempotente: hace upsert por título, así que se puede correr más de una vez.
 *
 * Uso: npm run books:migrate
 */
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@repo/prisma';
import { BOOKS } from '../apps/web/data/books';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../packages/prisma/.env') });

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  let created = 0;
  let updated = 0;

  for (const book of BOOKS) {
    const existing = await prisma.book.findFirst({ where: { title: book.title } });

    const data = {
      title: book.title,
      category: book.category,
      author: book.author,
      blurb: book.blurb,
      href: book.href,
      coverUrl: book.coverUrl,
      topics: book.topics,
    };

    if (existing) {
      await prisma.book.update({ where: { id: existing.id }, data });
      updated += 1;
    } else {
      await prisma.book.create({ data });
      created += 1;
    }
  }

  console.log(`Listo: ${created} libros creados, ${updated} actualizados (total ${BOOKS.length}).`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
