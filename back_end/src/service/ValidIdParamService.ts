import { FastifyRequest } from 'fastify';
import z from 'zod';

export default class ValidIdParamService {
  public validParamsRequest(request: FastifyRequest) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    return paramsSchema.safeParse(request.params);
  }
}
