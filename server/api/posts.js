const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req,res,next)=>{
    try{
        const allPosts = await prisma.post.findMany();
        res.send(allPosts)
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try{
        const allPosts = await prisma.post.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(allPosts)
    }catch(err){
        next(err)
    }
})


router.post("/", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    console.log(req.body);
    try {
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          userId: req.user.id
        }
      });
      res.status(201).send(post);
    } catch (err) {
      next(err);
    }
  });
  
  router.put("/:id", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
      if (!post || post.userId !== req.user.id) {
        return res.status(401).send("NOOO!!!");
      }
  
      const updatedPost = await prisma.post.update({
        where: { id: parseInt(req.params.id) },
        data: {
          title: req.body.title,
          content: req.body.content,
          userId: req.body.userId
        }
      });
      res.send(updatedPost);
    } catch (err) {
      next(err);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) } });
      if (!post || post.userId !== req.user.id) {
        return res.status(401).send("NOOOO!!!");
      }
  
      const deleted = await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
      res.status(201).send({message: "Delete Successful!", deleted: deleted});
    } catch (err) {
      next(err);
    }
  });

 
module.exports = router;
  