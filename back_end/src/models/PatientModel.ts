import PatientInterface from '../interfaces/PatientInterface';
import { prisma } from '../lib/prisma';
export default class PatientModel {
  private connection = prisma.patient;

  public async create(data: PatientInterface) {
    return await this.connection.create({ data });
  }
  public async update(id: string, data: PatientInterface) {
    return await this.connection.update({
      where: {
        id,
      },
      data,
    });
  }
  public async delete(id: string) {
    return await this.connection.delete({
      where: {
        id,
      },
    });
  }

  public async getAll() {
    return await this.connection.findMany({
      include: {
        distric: {
          include: {
            city: {
              include: {
                state: {
                  include: {
                    country: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  public async getById(id: string) {
    return await this.connection.findUnique({
      where: {
        id,
      },
      include: {
        distric: {
          include: {
            city: {
              include: {
                state: {
                  include: {
                    country: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  public async getByName(search: string) {
    return await this.connection.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      include: {
        distric: {
          include: {
            city: {
              include: {
                state: {
                  include: {
                    country: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  public async getByCountry(search: string) {
    return await this.connection.findMany({
      where: {
        distric: {
          city: {
            state: {
              country: {
                id: search,
              },
            },
          },
        },
      },
    });
  }
  public async getByState(search: string) {
    return await this.connection.findMany({
      where: {
        distric: {
          city: {
            state: {
              id: search,
            },
          },
        },
      },
    });
  }
  public async getByCity(search: string) {
    return await this.connection.findMany({
      where: {
        distric: {
          city: {
            id: search,
          },
        },
      },
    });
  }
  public async getByDistrict(search: string) {
    return await this.connection.findMany({
      where: {
        distric: {
          id: search,
        },
      },
    });
  }
}
