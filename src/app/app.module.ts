import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
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
    UserModule,
    AuthModule
  ],
})
export class AppModule { }
