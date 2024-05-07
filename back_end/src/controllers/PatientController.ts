import { FastifyReply, FastifyRequest } from 'fastify';
import PatientService from '../service/PatientService';
import ValidPatientService from '../service/ValidPatientService';

export default class PatientController {
  constructor(
    private patientService = new PatientService(),
    private validPatientService = new ValidPatientService()
  ) {}

  public create = (request: FastifyRequest, response: FastifyReply) => {
    const result = this.validPatientService.validBodyPatientRequest(request);

    if (!result.success) {
      return response.send({
        error: result.error,
        message: 'Something is wrong',
      });
    }

    const data = result.data;

    const newPatient = this.patientService.createPatient(data);

    return response.status(201).send(newPatient);
  };

  public update = async (request: FastifyRequest, response: FastifyReply) => {
    const bodyResult =
      this.validPatientService.validBodyPatientRequest(request);
    const paramsResult =
      this.validPatientService.validParamsPatientRequest(request);

    if (!bodyResult.success) {
      return response.send({
        error: bodyResult.error,
        message: 'Something is wrong',
      });
    }

    if (!paramsResult.success) {
      return response.send({
        error: paramsResult.error,
        message: 'Something is wrong',
      });
    }

    const id = paramsResult.data.id;
    const data = bodyResult.data;

    const patientUpdated = this.patientService.update(id, data);

    return response.status(201).send(patientUpdated);
  };

  public show = async (request: FastifyRequest, response: FastifyReply) => {
    const paramsResult =
      this.validPatientService.validParamsPatientRequest(request);

    if (!paramsResult.success) {
      return response.send({
        error: paramsResult.error,
        message: 'Something is wrong',
      });
    }

    const { id } = paramsResult.data;

    const patient = await this.patientService.getById(id);

    return response.status(200).send(patient);
  };

  public list = async (request: FastifyRequest, response: FastifyReply) => {
    const patients = await this.patientService.getAll();
    return response.status(200).send(patients);
  };

  public delete = async (request: FastifyRequest, response: FastifyReply) => {
    const paramsResult =
      this.validPatientService.validParamsPatientRequest(request);

    if (!paramsResult.success) {
      return response.send({
        error: paramsResult.error,
        message: 'Something is wrong',
      });
    }

    const { id } = paramsResult.data;

    await this.patientService.delete(id);

    return response.status(204).send({message: "Patient deleted"});
  };
}
