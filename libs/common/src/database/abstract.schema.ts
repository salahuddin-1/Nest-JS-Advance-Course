import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

// it's a convention in MongoDB to use "_id" instead of "id" as the primary key

@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId }) // Specifies that this property should hold an ObjectId
  _id: Types.ObjectId; // Creates a unique identifier for the document e.g. 5f3e3e3e3e3e3e3e3e3e3e3e
}
