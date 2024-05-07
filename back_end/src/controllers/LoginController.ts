import { FastifyReply, FastifyRequest } from 'fastify';
import ValidUserService from '../service/ValidUserService';
import UserService from '../service/UserService';
export default class LoginController {
  constructor(
    private validUserService = new ValidUserService(),
    private userService = new UserService()
  ) {}

  public singIn = async (request: FastifyRequest, response: FastifyReply) => {
    const result = this.validUserService.validBodyUserRequest(request);
    if (!result.success) {
      return response.status(400).send({
        error: result.error,
        message: 'Something is wrong',
      });
    }

    const token = await this.userService.singIn(result.data);

    return response.status(200).send(token);
  };

  public singUp = async (request: FastifyRequest, response: FastifyReply) => {
    console.log(this.validUserService);
    const result = this.validUserService.validBodyUserRequest(request);
    if (!result.success) {
      return response.status(400).send({
        error: result.error,
        message: 'Something is wrong',
      });
    }
    const token = await this.userService.singUp(result.data);



    return response.status(200).send(token);
  };
}
