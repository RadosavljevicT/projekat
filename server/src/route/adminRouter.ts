import { Router } from "express";
import { appDataSource } from "../dataSource";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import isAdminMiddleware from "../middleware/adminMiddleware";
import { Post } from '../entity/Post'

const router = Router()

router.use(isAdminMiddleware)

router.patch('/user/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await appDataSource.getRepository(User).findOne({ where: { id } });
  if (!user) {
    res.status(404).json({ error: 'Not found' });
    return;
  }
  await appDataSource.getRepository(User).update(id, req.body);
  res.sendStatus(204);
})

router.get('/message-report-monthly', async (req, res) => {
  const result = await appDataSource
    .getRepository(Message)
    .createQueryBuilder('message')
    .select('YEAR(message.createdAt)', 'year')
    .addSelect('MONTH(message.createdAt)', 'month')
    .addSelect('COUNT(*)', 'value')
    .groupBy("YEAR(message.createdAt)")
    .addGroupBy('MONTH(message.createdAt)')
    .getRawMany()

  res.json(result);
})

router.get('/message-hourly', async (req, res) => {
  const result = await appDataSource
    .getRepository(Message)
    .createQueryBuilder('message')
    .select('HOUR(message.createdAt)', 'hour')
    .addSelect('COUNT(*)', 'value')
    .groupBy("HOUR(message.createdAt)")
    .getRawMany()

  res.json(result);
})
router.get('/post-report-monthly', async (req, res) => {
  const result = await appDataSource
    .getRepository(Post)
    .createQueryBuilder('post')
    .select('YEAR(post.createdAt)', 'year')
    .addSelect('MONTH(post.createdAt)', 'month')
    .addSelect('COUNT(*)', 'value')
    .groupBy("YEAR(post.createdAt)")
    .addGroupBy('MONTH(post.createdAt)')
    .getRawMany()
  res.json(result);
})

router.get('/post-hourly', async (req, res) => {
  const result = await appDataSource
    .getRepository(Post)
    .createQueryBuilder('post')
    .select('HOUR(post.createdAt)', 'hour')
    .addSelect('COUNT(*)', 'value')
    .groupBy("HOUR(post.createdAt)")
    .getRawMany()

  res.json(result);
})
export default router;