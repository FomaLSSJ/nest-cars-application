import { FilterQuery, Model, SortOrder } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './schema/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FindAllCarDto } from './dto/find-all-car.dto';
import { CarsMock } from './mock/car.mock';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async create(body: CreateCarDto): Promise<Car> {
    const createdCar = new this.carModel(body);
    return createdCar.save();
  }

  async update(id: string, body: UpdateCarDto): Promise<Car> {
    return this.carModel.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );
  }

  async findAll(query: FindAllCarDto): Promise<Car[]> {
    const { search, brand, price_from, price_to, sort, limit } = query;
    const filter: FilterQuery<Car> = {};
    const order: [string, SortOrder][] = [];

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (brand) {
      filter.brand = { $eq: brand };
    }

    if (price_from) {
      filter.price ? null : (filter.price = {});
      filter.price['$gte'] = price_from;
    }

    if (price_to) {
      filter.price ? null : (filter.price = {});
      filter.price['$lte'] = price_to;
    }

    if (sort) {
      sort.split(',').some((x) => {
        const [key, value] = x.split(':');
        order.push([key, value as SortOrder]);
      });
    }

    return this.carModel.find(filter).sort(order).limit(limit).exec();
  }

  async findOne(id: string): Promise<Car> {
    return this.carModel.findById(id).exec();
  }

  async deleteAll(): Promise<void> {
    await this.carModel.deleteMany().exec();
  }

  async deleteOne(id: string): Promise<void> {
    await this.carModel.deleteOne({ _id: id }).exec();
  }

  async seed(): Promise<void> {
    await this.carModel.insertMany(CarsMock.list);
  }
}
