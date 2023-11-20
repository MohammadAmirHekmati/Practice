import { Inject, Injectable } from "@nestjs/common";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { LoginUserDto } from "../../Modules/Login/Dtos/login.dto";
import { UserEntity } from "../../Entities/user.entity";
import { ICommandRepository, POSTGRES_CONST } from "src/Common";

@Injectable()
export class UserCommandRepository extends Repository<UserEntity> implements ICommandRepository<UserEntity, LoginUserDto, string>{
    constructor(@Inject(POSTGRES_CONST) private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async createEntity(createDto: LoginUserDto, queryRunner?: QueryRunner): Promise<UserEntity> {
        const createUser = new UserEntity()
        createUser.username = createDto.username
        createUser.fullName = createDto.fullName
        createUser.password = createDto.password
        if (queryRunner) return await queryRunner.manager.save(createUser)
        return await this.save(await this.create(createUser))
    }

    deleteEntity(entityId: string, queryRunner?: QueryRunner): Promise<any> {
        if (queryRunner) return queryRunner.manager.delete(UserEntity, entityId)
        return this.delete({ id: entityId })
    }

    updateEntity(updateEntity: UserEntity, queryRunner?: QueryRunner): Promise<UserEntity> {
        if (queryRunner) return queryRunner.manager.save(UserEntity, updateEntity)
        return this.save(updateEntity)
    }
}