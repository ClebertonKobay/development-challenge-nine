import { FastifyRequest } from 'fastify';
import z from 'zod';

export default class ValidPatientService {
  public validBodyPatientRequest(request: FastifyRequest) {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      birthDay: z.coerce.date(),
      address: z.string(),
      addressNumber: z.coerce.number(),
      districtId: z.string().uuid(),
    });

    return bodySchema.safeParse(request.body);
  }
  public validParamsPatientRequest(request: FastifyRequest) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    return paramsSchema.safeParse(request.params);
  }
}
