export default interface PatientInterface {
  name: string;
  email: string;
  birthDay: Date;
  address: string;
  addressNumber: number;
  distric: {
    id: string;
    name: string;
    city: {
      id: string;
      name: string;
      state: {
        id: string;
        name: string;
        country: {
          id: string;
          name: string;
        };
      };
    };
  };
}
