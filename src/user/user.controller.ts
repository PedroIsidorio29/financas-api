import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Body, Controller, Post, } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password
    );
  }
}