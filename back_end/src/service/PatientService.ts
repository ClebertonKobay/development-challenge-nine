import PatientInterface from '../interfaces/PatientInterface';
import PatientModel from '../models/PatientModel';

export default class PatientService {
  constructor(private patientModel = new PatientModel()) {}

  public async createPatient(patientData: PatientInterface) {
    const patient = await this.patientModel.create(patientData);
    return patient;
  }

  public async update(id: string, patientData: PatientInterface) {
    const patientFound = await this.patientModel.getById(id);
    if (!patientFound) {
      throw new Error('Paciente não encontrado');
    }
    const patientUpdated = await this.patientModel.update(id, patientData);

    if (!patientUpdated) {
      throw new Error('Houve algum problema com a atualização');
    }

    return patientUpdated;
  }

  public async delete(id: string) {
    const patientFound = await this.patientModel.getById(id);
    if (!patientFound) {
      throw new Error('Paciente não encontrado');
    }
    await this.patientModel.delete(patientFound.id);

    return true;
  }

  public async getAll() {
    const patients = await this.patientModel.getAll();
    return patients.map((patient) => {
      return {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        birthDay: patient.birthDay,
        address: patient.address,
        addressNumber: patient.addressNumber,
        district: patient.distric.name,
        city: patient.distric.city.name,
        state: patient.distric.city.state.name,
        country: patient.distric.city.state.country.name,
      };
    });
  }

  public async getById(id: string) {
    const patientFound = await this.patientModel.getById(id);
    if (!patientFound) {
      throw new Error('Paciente não encontrado');
    }

    return patientFound;
  }
}
