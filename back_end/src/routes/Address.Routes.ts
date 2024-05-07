import { FastifyInstance } from 'fastify';
import AddressController from '../controllers/AddressController';

export async function addressRoutes(app: FastifyInstance) {
  const addressController = new AddressController();

  app.get('/countries', addressController.getCountries);
  app.get('/states/:id', addressController.getStates);
  app.get('/cities/:id', addressController.getCities);
  app.get('/districts/:id', addressController.getDistricts);
}
