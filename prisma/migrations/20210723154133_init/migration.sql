-- CreateTable
CREATE TABLE "Artist" (
    "ArtistId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    PRIMARY KEY ("ArtistId")
);

-- CreateTable
CREATE TABLE "Album" (
    "AlbumId" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "ArtistId" INTEGER NOT NULL,

    PRIMARY KEY ("AlbumId")
);

-- AddForeignKey
ALTER TABLE "Album" ADD FOREIGN KEY ("ArtistId") REFERENCES "Artist"("ArtistId") ON DELETE CASCADE ON UPDATE CASCADE;
