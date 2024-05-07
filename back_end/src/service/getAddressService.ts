import { prisma } from '../lib/prisma';

export default class GetAddressService {
  public async getCountries() {
    const countries = await prisma.country.findMany();
    return countries;
  }
  public async getStates(id: string) {
    const states = await prisma.state.findMany({
      where: {
        countryId: id,
      },
    });
    return states;
  }
  public async getCities(id: string) {
    const cities = await prisma.city.findMany({
      where: {
        stateId: id,
      },
    });
    return cities;
  }
  public async getDistricts(id: string) {
    const districts = await prisma.district.findMany({
      where: {
        cityId: id,
      },
    });
    return districts;
  }
}
