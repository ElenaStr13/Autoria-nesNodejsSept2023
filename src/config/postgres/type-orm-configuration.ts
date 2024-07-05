import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';

import { PostgresqlConfigModule } from './config.module';
import { PostgresqlConfigService } from './configuration.service';

export class TypeOrmConfiguration {
  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [PostgresqlConfigModule],
      useFactory: (configService: PostgresqlConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.database,
        synchronize: true,
        migrationsRun: false,
        entities: [
          path.join(
            process.cwd(),
            'dist',
            'database',
            '**',
            '*.entity{.ts,.js}',
          ),
        ],
        migrationsTableName: 'migrations',
      }),
      inject: [PostgresqlConfigService],
    };
  }
}