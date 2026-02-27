import { Module } from '@nestjs/common';
import {
  ConfigModule,
  DatabaseModule,
  AuthModule,
  FrameworkModule
} from '@elitenest/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    FrameworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
