import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './schema/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FindAllCarDto } from './dto/find-all-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  async create(@Body() body: CreateCarDto): Promise<Car> {
    return this.carsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.update(id, body);
  }

  @Get()
  async findAll(@Query() query: FindAllCarDto): Promise<Car[]> {
    return this.carsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    await this.carsService.deleteOne(id);
  }
}
