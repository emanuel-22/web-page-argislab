/**
 * Crea o actualiza el usuario admin del backoffice.
 *
 * Uso:
 *   npm run admin:create -- --email=admin@argislab.com --password=miPasswordSegura
 *
 * Si no se pasan --email/--password, los pide de forma interactiva.
 */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@repo/prisma';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../packages/prisma/.env') });

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => {
    rl.close();
    resolve(answer);
  }));
}

function argValue(flag: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${flag}=`))?.split('=').slice(1).join('=');
}

async function main() {
  const email = (argValue('email') ?? (await ask('Email del admin: '))).trim().toLowerCase();
  const password = (argValue('password') ?? (await ask('Password del admin (mínimo 6 caracteres): '))).trim();

  if (!email || !password || password.length < 6) {
    console.error('Email y password (mínimo 6 caracteres) son obligatorios.');
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Usuario admin listo: ${admin.email}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
