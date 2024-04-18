import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { DatabaseConfig } from '../config/database-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: DatabaseConfig.DB_TYPE,
        host: DatabaseConfig.DB_HOST,
        port: DatabaseConfig.DB_PORT,
        database: DatabaseConfig.DB_DATABASE,
        username: DatabaseConfig.DB_USERNAME,
        password: DatabaseConfig.DB_PASSWORD,
        synchronize: DatabaseConfig.DB_SYNCHRONIZE,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {
  public static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
