import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import ValidIdParamService from '../service/ValidIdParamService';
import GetAddressService from '../service/getAddressService';
export default class AddressController {
  constructor(
    private validIdParamService = new ValidIdParamService(),
    private getAddressService = new GetAddressService()
  ) {}
  public getCountries = async (
    request: FastifyRequest,
    response: FastifyReply
  ) => {
    const countries = await this.getAddressService.getCountries();
    return response.status(200).send(countries);
  };
  public getStates = async (
    request: FastifyRequest,
    response: FastifyReply
  ) => {
    const result = this.validIdParamService.validParamsRequest(request);
    if (!result.success) {
      return response.send({
        error: result.error,
        message: 'Something is wrong',
      });
    }
    const states = await this.getAddressService.getStates(result.data.id);

    return response.status(200).send(states);
  };
  public getCities = async (
    request: FastifyRequest,
    response: FastifyReply
  ) => {
    const result = this.validIdParamService.validParamsRequest(request);
    if (!result.success) {
      return response.send({
        error: result.error,
        message: 'Something is wrong',
      });
    }
    const cities = await this.getAddressService.getCities(result.data.id);

    return response.status(200).send(cities);
  };
  public getDistricts = async (
    request: FastifyRequest,
    response: FastifyReply
  ) => {
    const result = this.validIdParamService.validParamsRequest(request);
    if (!result.success) {
      return response.send({
        error: result.error,
        message: 'Something is wrong',
      });
    }
    const districts = await this.getAddressService.getDistricts(result.data.id);

    return response.status(200).send(districts);
  };
}
