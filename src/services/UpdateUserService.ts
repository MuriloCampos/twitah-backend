import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  name: string;
  avatar_filename: string;
  cover_filename: string;
}

class UpdateUserService {
  public async execute({ user_id, name, avatar_filename, cover_filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user) {
      throw new Error('Cant find user');
    }

    if (user.avatar) {
      // Delete previous avatar

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      fs.access(userAvatarFilePath, async (err) => {
        if (err) {
            console.log("The file does not exist.");
        } else {
          await fs.promises.unlink(userAvatarFilePath);
        }
      });
    }

    if (user.cover) {
      // Delete previous cover

      const userCoverFilePath = path.join(uploadConfig.directory, user.cover);

      fs.access(userCoverFilePath, async (err) => {
        if (err) {
            console.log("The file does not exist.");
        } else {
          await fs.promises.unlink(userCoverFilePath);
        }
      });
    }

    user.name = name;
    user.avatar = avatar_filename;
    user.cover = cover_filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
