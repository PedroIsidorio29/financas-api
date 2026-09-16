import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
})

const mongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
})

@Module({
  imports: [
    configModule,
    mongooseModule,
  ],
})
export class AppModule { }
