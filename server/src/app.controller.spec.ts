import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsService } from './cars/cars.service';
import { Car, CarSchema } from './cars/schema/car.schema';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ expandVariables: true }),
        MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
        MongooseModule.forRoot(process.env.MONGO_URI),
      ],
      controllers: [AppController],
      providers: [AppService, CarsService],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
    it('health check should return { result: pong }', () => {
      expect(controller.getPing()).toStrictEqual<object>({ result: 'pong' });
    });
  });
});
