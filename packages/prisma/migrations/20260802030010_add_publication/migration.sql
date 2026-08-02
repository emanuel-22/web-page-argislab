-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "authors" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "year" TEXT,
    "href" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationTopic" (
    "publicationId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "PublicationTopic_pkey" PRIMARY KEY ("publicationId","topicId")
);

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationTopic" ADD CONSTRAINT "PublicationTopic_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationTopic" ADD CONSTRAINT "PublicationTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
