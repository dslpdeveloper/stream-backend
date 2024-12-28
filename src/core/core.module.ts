import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';



import { PrismaModule } from './prisma/prisma.module';
import { IS_DEV_ENV } from '../shared/utils/is-dev.util';
import { getGraphQLConfig } from './config/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService]
    }),
    PrismaModule
  ],
})
export class CoreModule { }
