// Common repository for all entities

import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

// Our AbstractRepository where our Microservices can extend from
// and use the CRUD methods that we have implemented here
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  // Implement this property in the derived class
  protected abstract readonly logger: Logger;

  // CREATE A NEW DOCUMENT AND RETURN THE CREATED DOCUMENT
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    // Create a new document with a new ObjectId
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    // Save the document to the database
    const savedDoc = await createdDocument.save();

    // Return the saved document as a plain JavaScript object
    return savedDoc.toJSON() as unknown as TDocument;
  }

  // FIND A DOCUMENT BY ID
  async findOne(filterQuery: FilterQuery<TDocument>) {
    // {}: This empty object represents the projection. It's used to specify which
    // fields to include or exclude from the returned document. In this case, it's empty,
    // indicating that all fields should be returned.

    // { lean: true }: This option tells Mongoose to return a plain JavaScript object instead
    // of a Mongoose document. When lean is set to true, Mongoose skips the process of instantiating
    // a Mongoose document, resulting in better performance but sacrificing some Mongoose-specific
    // features and methods. This can be useful when you only need the raw data from the database without
    // the additional overhead of Mongoose documents.
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);

      throw new NotFoundException('Document not found');
    }

    return document;
  }

  // FIND THE FIRST DOCUMENT THAT MATCHES THE FILTER QUERY AND UPDATE IT
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    // { new: true }: This option tells Mongoose to return the updated document instead of the original one.

    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);

      throw new NotFoundException('Document not found');
    }

    return document;
  }

  // FIND ALL DOCUMENTS THAT MATCH THE FILTER QUERY
  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  // FINDS THE DOCUMENT THAT MATCHES THE FILTER QUERY AND DELETES IT
  // AND RETURNS THE DELETED DOCUMENT
  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
