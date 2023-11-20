import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const POSTGRES_CONST = Symbol("POSTGRES_CONST")

export const PostgresProvider: Provider = {
    provide: POSTGRES_CONST,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const postgresDataSource = new DataSource({
            type: 'postgres',
            host: configService.get("postgres.host"),
            port: configService.get("postgres.port"),
            username: configService.get("postgres.username"),
            password: configService.get("postgres.password"),
            database: configService.get("postgres.database"),
            entities: ['dist/**/*.entity.js', '**/*.entity.js'],
            synchronize: configService.get("postgres.synchronize"),
            // cache: true
        })

        return await postgresDataSource.initialize()
    },
}