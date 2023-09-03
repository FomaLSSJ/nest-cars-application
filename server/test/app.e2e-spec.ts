import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { connection } from 'mongoose';
import { AppModule } from './../src/app.module';
import { CarsMock, CarIndex } from '../src/cars/mock/car.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let carId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/ping (GET)', async () => {
    return request(app.getHttpServer()).get('/ping').expect(200).expect({
      result: 'pong',
    });
  });

  it('/cars (POST)', async () => {
    return request(app.getHttpServer())
      .post('/cars')
      .send(CarsMock.getCar(CarIndex.AE86))
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('_id');
        carId = res.body._id;
      });
  });

  it('/cars/:id (PUT)', async () => {
    const newPrice: number = 380000;

    return request(app.getHttpServer())
      .put(`/cars/${carId}`)
      .send({ price: newPrice })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('price');
        expect(res.body.price).toEqual(380000);
      });
  });

  it('/cars (GET)', async () => {
    return request(app.getHttpServer())
      .get('/cars')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]._id).toEqual(carId);
      });
  });

  it('/cars/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/cars/${carId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('_id');
        expect(res.body._id).toEqual(carId);
      });
  });

  it('/cars/:id (DELETE)', async () => {
    return request(app.getHttpServer()).delete(`/cars/${carId}`).expect(200);
  });
});
