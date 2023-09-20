-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "userid" INTEGER,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user " (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password " TEXT,

    CONSTRAINT "user _pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user _username_key" ON "user "("username");

