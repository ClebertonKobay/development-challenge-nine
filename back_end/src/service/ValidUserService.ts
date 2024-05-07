import { FastifyRequest } from 'fastify';
import z from 'zod';

export default class ValidUserService {
  public validBodyUserRequest(request: FastifyRequest) {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    return bodySchema.safeParse(request.body);
  }
  public validUserPatientRequest(request: FastifyRequest) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    return paramsSchema.safeParse(request.params);
  }
}
