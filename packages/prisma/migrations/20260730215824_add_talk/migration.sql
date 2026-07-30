-- CreateTable
CREATE TABLE "Talk" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "description" TEXT,
    "href" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Talk_pkey" PRIMARY KEY ("id")
);
