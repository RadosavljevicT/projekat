import axios from "axios";
import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import { v4 } from 'uuid'
import * as fs from 'fs'
import path = require("path");
const router = Router();


router.post('/login', async (req, res) => {
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  });
  if (!user || user.blocked) {
    res.status(400).json({
      error: 'No such user'
    });
    return;
  }
  (req.session as any).user = user;
  req.session.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(user);
});

router.post('/register', async (req, res) => {
  const userRepository = appDataSource.getRepository(User);

  try {
    let imageUrl = req.body.imageUrl;
    if (!imageUrl) {
      const res = await axios({
        method: 'GET',
        url: `https://eu.ui-avatars.com/api/?background=random&name=${req.body.firstName}+${req.body.lastName}`,
        responseType: 'stream', // important
      })
      imageUrl = '/img/' + v4() + '.png';
      const writter = fs.createWriteStream(path.join(__dirname, '../..', imageUrl))
      res.data.pipe(writter);
      imageUrl = 'https://localhost:8000' + imageUrl;
    }
    const user = await userRepository.save({
      ...req.body,
      imageUrl,
      admin: false,
      blocked: false
    });
    (req.session as any).user = user;
    req.session.save(e => {
      if (e) {
        console.log(e);
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
})
router.get('/check', async (req, res) => {
  const user = (req.session as any).user;
  if (!user) {
    res.sendStatus(401);
    return;
  }
  res.json(user)
})

export default router;