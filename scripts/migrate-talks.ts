/**
 * Carga a la base de datos las charlas que hoy están hardcodeadas en apps/web/data/talks.ts.
 * Es idempotente: hace upsert por título, así que se puede correr más de una vez.
 *
 * Uso: npm run talks:migrate
 */
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@repo/prisma';
import { TALKS } from '../apps/web/data/talks';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../packages/prisma/.env') });

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  let created = 0;
  let updated = 0;

  for (const talk of TALKS) {
    const existing = await prisma.talk.findFirst({ where: { title: talk.title } });

    const data = {
      title: talk.title,
      area: talk.area,
      href: talk.href,
      description: talk.description,
      thumbnailUrl: talk.thumbnailUrl,
    };

    if (existing) {
      await prisma.talk.update({ where: { id: existing.id }, data });
      updated += 1;
    } else {
      await prisma.talk.create({ data });
      created += 1;
    }
  }

  console.log(`Listo: ${created} charlas creadas, ${updated} actualizadas (total ${TALKS.length}).`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
