import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema({ timestamps: true })
export class Car {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  manufacture: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false, default: 'usd' })
  currency: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
