-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookTopic" (
    "bookId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "BookTopic_pkey" PRIMARY KEY ("bookId","topicId")
);

-- CreateTable
CREATE TABLE "TalkTopic" (
    "talkId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "TalkTopic_pkey" PRIMARY KEY ("talkId","topicId")
);

-- CreateTable
CREATE TABLE "WebsiteTopic" (
    "websiteId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "WebsiteTopic_pkey" PRIMARY KEY ("websiteId","topicId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_categoryId_name_key" ON "Topic"("categoryId", "name");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable: add nullable categoryId first, existing rows get backfilled below before we enforce NOT NULL
ALTER TABLE "Book" ADD COLUMN "categoryId" INTEGER;
ALTER TABLE "Talk" ADD COLUMN "categoryId" INTEGER;
ALTER TABLE "Website" ADD COLUMN "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTopic" ADD CONSTRAINT "BookTopic_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookTopic" ADD CONSTRAINT "BookTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talk" ADD CONSTRAINT "Talk_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkTopic" ADD CONSTRAINT "TalkTopic_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "Talk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalkTopic" ADD CONSTRAINT "TalkTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTopic" ADD CONSTRAINT "WebsiteTopic_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteTopic" ADD CONSTRAINT "WebsiteTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed canonical taxonomy (mirrors the categories/subcategories already used by Book.category/topics)
INSERT INTO "Category" ("name", "slug") VALUES
    ('Ingeniería y desarrollo de software', 'ingenieria-software'),
    ('Agilidad, Kanban y mejora continua', 'agilidad-kanban'),
    ('Liderazgo, comunicación y cultura', 'liderazgo-cultura'),
    ('Producto, innovación y transformación digital', 'producto-innovacion'),
    ('Productividad y desarrollo profesional', 'productividad'),
    ('Bienestar, propósito y desarrollo personal', 'bienestar'),
    ('Estrategia, historia y pensamiento', 'estrategia-historia');

INSERT INTO "Topic" ("name", "categoryId")
SELECT topic_name, c.id
FROM "Category" c
JOIN (VALUES
    ('Ingeniería y desarrollo de software', 'Programación'),
    ('Ingeniería y desarrollo de software', 'Diseño y arquitectura'),
    ('Ingeniería y desarrollo de software', 'Calidad de software'),
    ('Ingeniería y desarrollo de software', 'Requisitos'),
    ('Ingeniería y desarrollo de software', 'Deuda técnica'),
    ('Ingeniería y desarrollo de software', 'Inteligencia artificial aplicada'),
    ('Agilidad, Kanban y mejora continua', 'Agilidad'),
    ('Agilidad, Kanban y mejora continua', 'Kanban'),
    ('Agilidad, Kanban y mejora continua', 'Scrum'),
    ('Agilidad, Kanban y mejora continua', 'Lean'),
    ('Agilidad, Kanban y mejora continua', 'Equipos'),
    ('Agilidad, Kanban y mejora continua', 'Mejora continua'),
    ('Agilidad, Kanban y mejora continua', 'Gestión del cambio'),
    ('Liderazgo, comunicación y cultura', 'Liderazgo'),
    ('Liderazgo, comunicación y cultura', 'Comunicación'),
    ('Liderazgo, comunicación y cultura', 'Cultura'),
    ('Liderazgo, comunicación y cultura', 'Trabajo en equipo'),
    ('Producto, innovación y transformación digital', 'Producto digital'),
    ('Producto, innovación y transformación digital', 'Innovación'),
    ('Producto, innovación y transformación digital', 'Emprendimiento'),
    ('Producto, innovación y transformación digital', 'OKR'),
    ('Producto, innovación y transformación digital', 'Transformación digital'),
    ('Producto, innovación y transformación digital', 'Riesgo'),
    ('Productividad y desarrollo profesional', 'Gestión del tiempo'),
    ('Productividad y desarrollo profesional', 'Productividad'),
    ('Productividad y desarrollo profesional', 'Desarrollo profesional'),
    ('Bienestar, propósito y desarrollo personal', 'Bienestar'),
    ('Bienestar, propósito y desarrollo personal', 'Propósito'),
    ('Bienestar, propósito y desarrollo personal', 'Desarrollo personal'),
    ('Estrategia, historia y pensamiento', 'Estrategia'),
    ('Estrategia, historia y pensamiento', 'Historia'),
    ('Estrategia, historia y pensamiento', 'Pensamiento')
) AS seed(category_name, topic_name) ON seed.category_name = c.name;

-- Backfill Book.categoryId from the legacy free-text category column
UPDATE "Book" b
SET "categoryId" = c.id
FROM "Category" c
WHERE c.name = b."category";

-- Backfill BookTopic from the legacy topics text[] column
INSERT INTO "BookTopic" ("bookId", "topicId")
SELECT b.id, t.id
FROM "Book" b
CROSS JOIN LATERAL unnest(b."topics") AS bt(topic_name)
JOIN "Topic" t ON t.name = bt.topic_name AND t."categoryId" = b."categoryId";

-- Backfill Talk.categoryId: map legacy free-text areas onto the canonical categories
UPDATE "Talk" tk
SET "categoryId" = c.id
FROM "Category" c
WHERE c.name = CASE tk."area"
    WHEN 'Agilidad y gestión' THEN 'Agilidad, Kanban y mejora continua'
    WHEN 'Ingeniería de Software' THEN 'Ingeniería y desarrollo de software'
    WHEN 'Inteligencia artificial aplicada' THEN 'Ingeniería y desarrollo de software'
    ELSE tk."area"
END;

-- Backfill TalkTopic where the legacy area matches an actual topic name (e.g. "Inteligencia artificial aplicada")
INSERT INTO "TalkTopic" ("talkId", "topicId")
SELECT tk.id, t.id
FROM "Talk" tk
JOIN "Topic" t ON t.name = tk."area" AND t."categoryId" = tk."categoryId";

-- Backfill Website.categoryId: map legacy free-text categories onto the canonical categories
UPDATE "Website" w
SET "categoryId" = c.id
FROM "Category" c
WHERE c.name = CASE w."category"
    WHEN 'Ingeniería de Software' THEN 'Ingeniería y desarrollo de software'
    ELSE w."category"
END;

-- Backfill WebsiteTopic where the legacy category matches an actual topic name
INSERT INTO "WebsiteTopic" ("websiteId", "topicId")
SELECT w.id, t.id
FROM "Website" w
JOIN "Topic" t ON t.name = w."category" AND t."categoryId" = w."categoryId";

-- Enforce NOT NULL now that every row has a categoryId
ALTER TABLE "Book" ALTER COLUMN "categoryId" SET NOT NULL;
ALTER TABLE "Talk" ALTER COLUMN "categoryId" SET NOT NULL;
ALTER TABLE "Website" ALTER COLUMN "categoryId" SET NOT NULL;

-- Drop the legacy free-text columns now superseded by categoryId/topics
ALTER TABLE "Book" DROP COLUMN "category",
DROP COLUMN "topics";
ALTER TABLE "Talk" DROP COLUMN "area";
ALTER TABLE "Website" DROP COLUMN "category";
