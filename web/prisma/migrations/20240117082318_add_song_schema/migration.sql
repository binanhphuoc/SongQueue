-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "songname" TEXT NOT NULL,
    "singer" TEXT NOT NULL,
    "tableno" INTEGER NOT NULL,
    "relationship" TEXT NOT NULL,
    "performers" TEXT NOT NULL,
    "isplaying" INTEGER NOT NULL DEFAULT 0,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);
