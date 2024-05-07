import { FastifyInstance } from 'fastify';
import LoginController from '../controllers/LoginController';

export async function userRoutes(app: FastifyInstance) {
  const loginController = new LoginController();
  app.post('/singIn', loginController.singIn);
  app.post('/singUp', loginController.singUp);
}
