import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  name: string;
}

class CreateUserService {
  public async execute({ name }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = usersRepository.create({ name });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
