import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class SchemaRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) { }

    async findOneEntity(entityFilterQuery: FilterQuery<T>): Promise<T> {
        return this.entityModel.findOne(entityFilterQuery).exec()
    }

    async findAllEntities(entityFilterQuery: FilterQuery<T>): Promise<T[]> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: Partial<T>): Promise<T> {
        const entity = new this.entityModel(createEntityData);
        const savedEntity = await entity.save()
        return savedEntity.id
    }

    async findOneAndUpdateEntities(entityFilterQuery: FilterQuery<T>, updateEntityData: UpdateQuery<T>): Promise<T> {
        return this.entityModel.findOneAndUpdate(entityFilterQuery, updateEntityData, { new: true })
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
        return deleteResult.deletedCount >= 1;
    }
}