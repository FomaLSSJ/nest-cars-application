import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car, CarSchema } from './schema/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { CarsMock, CarIndex, CarBrand } from './mock/car.mock';

describe('CarsController', () => {
  let module: TestingModule;
  let controller: CarsController;
  let service: CarsService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
        MongooseModule.forRoot(process.env.MONGO_URI),
      ],
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get<CarsService>(CarsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check CRUD methods for /cars route', () => {
    let carId: string;
    const CarAE86: CreateCarDto = CarsMock.getCar(CarIndex.AE86);

    it('create a new car', async () => {
      const createdCar: Car = await controller.create(CarAE86);
      carId = createdCar._id.toString();

      expect(createdCar).toBeDefined();
      expect(createdCar).toHaveProperty('_id');
      expect(createdCar).toHaveProperty('createdAt');
      expect(createdCar).toHaveProperty('updatedAt');
      expect(createdCar).toHaveProperty('name');
      expect(createdCar.name).toEqual(CarAE86.name);
      expect(createdCar).toHaveProperty('brand');
      expect(createdCar.brand).toEqual(CarAE86.brand);
      expect(createdCar).toHaveProperty('manufacture');
      expect(createdCar.manufacture).toEqual(CarAE86.manufacture);
      expect(createdCar).toHaveProperty('price');
      expect(createdCar.price).toEqual(CarAE86.price);
    });

    it('update the car by id', async () => {
      const newPrice: number = 250000;
      const updatedCar: Car = await controller.update(carId, {
        price: newPrice,
      });

      expect(updatedCar).toBeDefined();
      expect(updatedCar).toHaveProperty('price');
      expect(updatedCar.price).not.toEqual(CarAE86.price);
      expect(updatedCar.price).toEqual(newPrice);

      await controller.update(carId, { price: CarAE86.price });
    });

    it('get the car by id', async () => {
      const foundCar: Car = await controller.findOne(carId);

      expect(foundCar).toBeDefined();
      expect(foundCar).toHaveProperty('_id');
      expect(foundCar).toHaveProperty('createdAt');
      expect(foundCar).toHaveProperty('updatedAt');
      expect(foundCar).toHaveProperty('name');
      expect(foundCar.name).toEqual(CarAE86.name);
      expect(foundCar).toHaveProperty('brand');
      expect(foundCar.brand).toEqual(CarAE86.brand);
      expect(foundCar).toHaveProperty('manufacture');
      expect(foundCar.manufacture).toEqual(CarAE86.manufacture);
      expect(foundCar).toHaveProperty('price');
      expect(foundCar.price).toEqual(CarAE86.price);
    });

    it('get the whole list of cars', async () => {
      const foundCars: Car[] = await controller.findAll({});

      expect(foundCars).toBeDefined();
      expect(foundCars).toBeInstanceOf(Array);
      expect(foundCars[0]).toHaveProperty('_id');
      expect(foundCars[0]).toHaveProperty('createdAt');
      expect(foundCars[0]).toHaveProperty('updatedAt');
      expect(foundCars[0]).toHaveProperty('name');
      expect(foundCars[0].name).toEqual(CarAE86.name);
      expect(foundCars[0]).toHaveProperty('brand');
      expect(foundCars[0].brand).toEqual(CarAE86.brand);
      expect(foundCars[0]).toHaveProperty('manufacture');
      expect(foundCars[0].manufacture).toEqual(CarAE86.manufacture);
      expect(foundCars[0]).toHaveProperty('price');
      expect(foundCars[0].price).toEqual(CarAE86.price);
    });

    it('delete the car by id', async () => {
      await controller.deleteOne(carId);

      const foundCar: Car = await controller.findOne(carId);

      expect(foundCar).toBeNull();
    });
  });

  describe('check sorting and filtering options when request the cars list', () => {
    it('seeding the list of mock cars', async () => {
      await service.seed();
    });

    it('searching for cars by name', async () => {
      const sortedCars: Car[] = await controller.findAll({ search: 'apex' });
      const CarAE86: CreateCarDto = CarsMock.getCar(CarIndex.AE86);

      expect(sortedCars).toHaveLength(1);
      expect(sortedCars[0].name).toEqual(CarAE86.name);
    });

    it('sort the cars by brand', async () => {
      for (const brand in CarBrand) {
        const sortedCars: Car[] = await controller.findAll({
          brand: CarBrand[brand],
        });

        for (const car of sortedCars) {
          expect(car.brand).toEqual(CarBrand[brand]);
        }
      }
    });

    it('filter cars by price from', async () => {
      const priceFrom: number = 400000;
      const sortedCars: Car[] = await controller.findAll({
        price_from: priceFrom,
      });

      for (const car of sortedCars) {
        expect(car.price).toBeGreaterThanOrEqual(priceFrom);
      }
    });

    it('filter cars by price up to', async () => {
      const priceTo: number = 500000;
      const sortedCars: Car[] = await controller.findAll({
        price_to: priceTo,
      });

      for (const car of sortedCars) {
        expect(car.price).toBeLessThanOrEqual(priceTo);
      }
    });

    it('filter cars by price from and to', async () => {
      const priceFrom: number = 350000;
      const priceTo: number = 550000;
      const sortedCars: Car[] = await controller.findAll({
        price_from: priceFrom,
        price_to: priceTo,
      });

      for (const car of sortedCars) {
        expect(car.price).toBeGreaterThanOrEqual(priceFrom);
        expect(car.price).toBeLessThanOrEqual(priceTo);
      }
    });

    it('sort the machines by name in ascending order', async () => {
      const sortedCars: Car[] = await controller.findAll({ sort: 'name:asc' });

      expect(sortedCars).toStrictEqual(
        sortedCars.sort((a, b) => a.name.localeCompare(b.name)),
      );
    });

    it('sort the cars by name in descending order', async () => {
      const sortedCars: Car[] = await controller.findAll({ sort: 'name:desc' });

      expect(sortedCars).toStrictEqual(
        sortedCars.sort((a, b) => b.name.localeCompare(a.name)),
      );
    });

    it('get a limited list of cars', async () => {
      const sortedCars: Car[] = await controller.findAll({ limit: 5 });

      expect(sortedCars).toHaveLength(5);
    });

    it('delete the list of all mock cars', async () => {
      await service.deleteAll();
    });
  });
});
