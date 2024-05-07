import argon2 from 'argon2';
import app from '../app';
import UserInterface from '../interfaces/UserInterface';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  public async singUp(user: UserInterface) {
    const userAlreadyExists = await this.userModel.getByUserName(user.username);

    if (userAlreadyExists) {
      return { message: 'User already exists' };
    }

    user.password = await argon2.hash(user.password);

    const newUser = await this.userModel.create(user);

    const token = app.jwt.sign(
      {
        username: newUser.username,
      },
      {
        sub: newUser.id,
        expiresIn: '30 days',
      }
    );

    return { token };
  }

  public async singIn(user: UserInterface) {
    const userAlreadyExists = await this.userModel.getByUserName(user.username);

    if (!userAlreadyExists) {
      return { error: 'User not found' };
    }

    const isPasswordValid = await argon2.verify(
      userAlreadyExists.password,
      user.password
    );

    if (!isPasswordValid) {
      return { message: 'Username or Password are wrong' };
    }

    const token = app.jwt.sign(
      {
        username: userAlreadyExists.username,
      },
      {
        sub: userAlreadyExists.id,
        expiresIn: '30 days',
      }
    );

    return { token };
  }
}
