import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { getGraphQLConfig } from '@/src/core/config/graphql.config'
import { PrismaModule } from '@/src/core/prisma/prisma.module'
import { RedisModule } from '@/src/core/redis/redis.module'
import { SessionModule } from '@/src/modules/auth/session/session.module'

import { AccountModule } from '../modules/auth/account/account.module'
import { IS_DEV_ENV } from '../shared/utils/is-dev.util'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		RedisModule,
		AccountModule,
		SessionModule
	]
})
export class CoreModule {}
