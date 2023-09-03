import { CreateCarDto } from '../dto/create-car.dto';

export enum CarBrand {
  Toyota = 'toyota',
  Honda = 'honda',
  Mazda = 'mazda',
  Mitsubishi = 'mitsubishi',
  Nissan = 'nissan',
}

export enum CarIndex {
  AE86,
  EG6,
  FC3S,
  FD3S,
  CE9A,
  CN9A,
  RPS13,
  S13,
  BNR32,
}

export class CarsMock {
  public static getCar(index: CarIndex): CreateCarDto {
    return this.list[index];
  }

  public static list: CreateCarDto[] = [
    {
      name: 'Sprinter Trueno 3door GT-APEX',
      brand: CarBrand.Toyota,
      manufacture: 1986,
      price: 300000,
    },
    {
      name: 'Civic SiR-II',
      brand: CarBrand.Honda,
      manufacture: 1993,
      price: 350000,
    },
    {
      name: 'SAVANNA RX-7 III',
      brand: CarBrand.Mazda,
      manufacture: 1990,
      price: 400000,
    },
    {
      name: 'RX-7 Type R',
      brand: CarBrand.Mazda,
      manufacture: 1995,
      price: 450000,
    },
    {
      name: 'Lancer Evolution III GSR',
      brand: CarBrand.Mitsubishi,
      manufacture: 1996,
      price: 500000,
    },
    {
      name: 'Lancer Evolution IV RS',
      brand: CarBrand.Mitsubishi,
      manufacture: 1997,
      price: 550000,
    },
    {
      name: 'SilEighty 180SX',
      brand: CarBrand.Nissan,
      manufacture: 1998,
      price: 600000,
    },
    {
      name: 'Silvia Ks',
      brand: CarBrand.Nissan,
      manufacture: 1994,
      price: 300000,
    },
    {
      name: 'Skyline GT-R V-Spec II',
      brand: CarBrand.Nissan,
      manufacture: 1994,
      price: 550000,
    },
  ];
}
