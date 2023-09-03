import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsService } from './cars.service';
import { Car, CarSchema } from './schema/car.schema';

describe('CarsService', () => {
  let module: TestingModule;
  let service: CarsService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
        MongooseModule.forRoot(process.env.MONGO_URI),
      ],
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
