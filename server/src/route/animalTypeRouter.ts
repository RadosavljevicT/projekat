import { Router } from "express";
import { appDataSource } from "../dataSource";
import { AnimalType } from "../entity/AnimalType";


const router = Router();

router.get('/', async (_req, res) => {
  res.json(await appDataSource.getRepository(AnimalType).find());
})

export default router;