import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './database/typeorm.config';
import { EventModule } from './event/event.module';
import { AtGuard } from './user/guards/at.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UserModule,
    EventModule,
  ],
  controllers: [],
  providers: [
    {
      /* Enable AtGuard for every endpoint until overridden by RtGuard explicitly. */
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
