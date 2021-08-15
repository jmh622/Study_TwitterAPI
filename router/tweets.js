import { Router } from 'express';
import tweetsController from '../Controller/tweets.js';

const router = Router();

router.get('/', tweetsController.getAll);

router.get('/:id', tweetsController.getById);

router.post('/', tweetsController.create);

router.put('/:id', tweetsController.update);

router.delete('/:id', tweetsController.delete);

export default router;
