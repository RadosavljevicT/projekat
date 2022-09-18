import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";



const router = Router();

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await appDataSource.getRepository(User).findOne({
    where: {
      id
    },
    relations: {
      posts: {
        animalType: true,
        comments: {
          user: true
        },
      }
    },

  })
  res.json(user);
})

router.get('/', async (req, res) => {
  const search = req.query.search as string | undefined;
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 20;
  const builder = appDataSource.getRepository(User).createQueryBuilder('user')
  if (search && search.trim().length > 0) {
    builder.where(`user.email LIKE :search`)
      .orWhere(`CONCAT(user.firstName,' ', user.lastName) LIKE :search`)
      .setParameter('search', '%' + search + '%');
  }
  const [data, count] = await builder.limit(page).offset(page * size).getManyAndCount()
  res.json({
    content: data,
    totalElements: count,
    size: data.length,
    page: page
  })
})

router.post('/logout', async (req, res) => {
  (req.session as any).user = undefined;
  req.session.destroy(e => {
    if (e) {
      console.log(e);
    }
  });
  res.sendStatus(204);
})


export default router;