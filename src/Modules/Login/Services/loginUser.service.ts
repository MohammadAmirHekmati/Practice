import { Inject, Injectable } from '@nestjs/common';
import { UserCommandRepository } from '../../../Repositories/Commands/userCommand.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { LoginUserDto } from '../Dtos/login.dto';
import { UserEntity } from '../../../Entities/user.entity';
import { BaseTransaction, POSTGRES_CONST } from 'src/Common';

@Injectable()
export class LoginUserService extends BaseTransaction<LoginUserDto, UserEntity> {
  constructor(
    private userCommandRep: UserCommandRepository,
    @Inject(POSTGRES_CONST) private postgresDataSource: DataSource,
  ) { 
    super(postgresDataSource)
  }

  async loginUser(body: LoginUserDto) {
    await this.validation(body);
    return this.run(body);
  }

  private async validation(body: LoginUserDto) {
    // ...
  }

  async executeTransaction(data: LoginUserDto, queryRunner: QueryRunner): Promise<UserEntity> {
    return await this.userCommandRep.createEntity(data, queryRunner);
}

}
