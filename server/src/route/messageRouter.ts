import { Router } from "express";
import { appDataSource } from "../dataSource";
import { Message } from "../entity/Message";
import { User } from "../entity/User";


const router = Router();


router.get('/:otherId', async (req, res) => {
  const user = (req.session as any).user as User;
  const otherId = Number(req.params.otherId);
  const messages = await appDataSource.getRepository(Message).find({
    where: [
      { receiverId: user.id, senderId: otherId },
      { receiverId: otherId, senderId: user.id },
    ],
    order: {
      createdAt: 'ASC'
    }
  })
  res.json(messages);
})
router.post('/:otherId', async (req, res) => {
  const user = (req.session as any).user as User;
  const otherId = Number(req.params.otherId);
  const message = await appDataSource.getRepository(Message).save({
    content: req.body.content,
    senderId: user.id,
    receiverId: otherId
  })
  res.json(message);
})
export default router;
