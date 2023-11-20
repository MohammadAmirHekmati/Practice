import { QueryRunner } from "typeorm";
import { FilterQuery, UpdateQuery } from "mongoose";

export interface IQueryRepository<Entity> {
  findOneEntity(entityFilterQuery: FilterQuery<Entity>): Promise<Entity>
  findAllEntities(entityFilterQuery: FilterQuery<Entity>): Promise<Entity[]>
  findOneAndUpdateEntities(entityFilterQuery: FilterQuery<Entity>, updateEntityData: UpdateQuery<unknown>): Promise<Entity>
}

export interface ICommandRepository<Entity, CreateEntityDto, Key> {
  createEntity(createEntityDto: CreateEntityDto, queryRunner?: QueryRunner): Promise<Entity>
  deleteEntity(entityId: Key, queryRunner?: QueryRunner): Promise<any>
  updateEntity(updateEntity: Entity, queryRunner?: QueryRunner): Promise<Entity>
}