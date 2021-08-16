import { Router } from 'express';
import tweetsController from '../Controller/tweets.js';
import tweetValidation from '../Validation/tweets.js';

const router = Router();

router.get('/', tweetsController.getAll);

router.get('/:id', tweetsController.getById);

router.post('/', tweetValidation.create, tweetsController.create);

router.put('/:id', tweetValidation.update, tweetsController.update);

router.delete('/:id', tweetValidation.delete, tweetsController.delete);

export default router;
