import { Router } from "express";
import { appDataSource } from "../dataSource";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import accessMiddleware from "../middleware/accessMiddleware";

const router = Router();

router.get('/', async (_req, res) => {

  res.json(await appDataSource.getRepository(Post).find({
    relations: {
      comments: {
        user: true
      },
      animalType: true,
      user: true
    },
    order: {
      id: 'DESC'
    }
  }))
})

router.post('/', async (req, res) => {
  const user = (req.session as any).user as User;

  const post = await appDataSource.getRepository(Post).save({
    ...req.body,
    user
  })
  res.json(post);
})

router.post('/:postId/comment', async (req, res) => {
  const id = req.params.postId;
  const user = (req.session as any).user as User;
  const comment = await appDataSource.getRepository(Comment).save({
    ...req.body,
    user,
    postId: Number(id),
  })
  res.json(comment);
})
router.delete('/:postId/comment/:id', accessMiddleware(Comment, c => c.userId), async (req, res) => {
  const id = req.params.id;
  await appDataSource.getRepository(Comment).delete({
    id: Number(id),
    postId: Number(req.params.postId)
  })
  res.sendStatus(204);
})

router.use('/:id', accessMiddleware(Post, p => p.userId))

router.patch('/:id', async (req, res) => {
  const user = (req.session as any).user as User;
  const post = await appDataSource.getRepository(Post).save({
    ...(req as any).entity,
    ...req.body,
    user
  })
  res.json(post);
})

router.delete('/:id', async (req, res) => {
  try {
    await appDataSource.getRepository(Post).delete(req.params.id)
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error' })
  }
})


export default router;