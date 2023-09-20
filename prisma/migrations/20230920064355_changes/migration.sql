/*
  Warnings:

  - You are about to drop the column `userid` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `user ` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- DropTable
DROP TABLE "user ";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
