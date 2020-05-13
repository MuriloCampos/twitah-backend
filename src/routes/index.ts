import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import User from '../models/User';
import Tweet from '../models/Tweet';

interface File {
  fieldname: string;
  filename: string;
}

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/users', async (request, response) => {
  try {
    const { name } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

routes.get('/users', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();
  const user = users[0];

  Object.assign(user, {
    avatar_url: `${process.env.API_URL}/files/${user?.avatar}`,
    cover_url: `${process.env.API_URL}/files/${user?.cover}`
  });

  return response.json(user);
});

routes.put('/users', upload.any(), async (request, response) => {
  try {
    const updateUser = new UpdateUserService();

    const { name } = request.body;
    let avatar_filename = 'undefined';
    let cover_filename = 'undefined';

    if(request.files.length){
      const files: File[] = request.files as File[];

      for(let i = 0; i < files.length; ++i) {
        if(files[i].fieldname === 'avatar'){
          avatar_filename = files[i].filename;
        }

        if(files[i].fieldname === 'cover'){
          cover_filename = files[i].filename;
        }
      }
    }

    const user = await updateUser.execute({
      user_id: 'da188d42-0948-4a3e-b0b5-a9f2ad5d49f6',
      name,
      avatar_filename,
      cover_filename
    });
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

routes.post('/tweets', async (request, response) => {
  const { message, date } = request.body;

  const tweetsRepository = getRepository(Tweet);
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();
  const user = users[0];

  const newTweet = tweetsRepository.create({
    message,
    date,
    user_id: user.id
  });

  await tweetsRepository.save(newTweet);

  return response.json(newTweet);
});

routes.get('/tweets', async (request, response) => {
  const tweetsRepository = getRepository(Tweet);

  const tweets = await tweetsRepository.find({
    order: {
        date: "DESC",
    }
});

  return response.json(tweets);
})

export default routes;
