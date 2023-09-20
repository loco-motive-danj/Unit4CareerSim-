const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {

  for (let i = 1; i <= 3; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        password: `password${i}`,  
      },
    });

   
    for (let j = 1; j <= 3; j++) {
      await prisma.post.create({
        data: {
          title: `Post ${j} from user${i}`,
          content: `This is content for Post ${j} from user${i}`,
          userId: user.id,
        },
      });
    }
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
