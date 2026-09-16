import { User, UserSchema } from '@/user/schemas/user.schema';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController]
})

export class UserModule { }