import { FastifyInstance } from 'fastify';
import PatientController from '../controllers/PatientController';

export async function patientRoutes(app: FastifyInstance) {
  const patientController = new PatientController();

  app.addHook('preHandler', async (request) => {
    await request.jwtVerify();
  });

  app.get('/', patientController.list);
  app.post('/', patientController.create);
  app.put('/:id', patientController.update);
  app.get('/:id', patientController.show);
  app.delete('/:id', patientController.delete);
}
