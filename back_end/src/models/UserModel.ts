import UserInterface from '../interfaces/UserInterface';
import { prisma } from '../lib/prisma';

export default class UserModel {
  private connection = prisma.user;

  public async create(data: UserInterface) {
    return await this.connection.create({ data });
  }

  public async getByUserName(search: string) {
    return await this.connection.findUnique({
      where: {
        username: search,
      },
      
    });
  }
  public async update(id: string, data: UserInterface) {
    return await this.connection.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: string) {
    return await this.connection.delete({
      where: {
        id,
      },
    });
  }
}
