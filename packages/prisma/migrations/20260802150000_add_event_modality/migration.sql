-- Replace the boolean "isVirtual" flag with a "modality" field that also supports "Híbrido"
ALTER TABLE "Event" ADD COLUMN "modality" TEXT NOT NULL DEFAULT 'Presencial';

UPDATE "Event" SET "modality" = CASE WHEN "isVirtual" THEN 'Virtual' ELSE 'Presencial' END;

ALTER TABLE "Event" DROP COLUMN "isVirtual";
