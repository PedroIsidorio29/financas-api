import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { LoginUserDto } from '@/user/dto/login-user.dto';
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

  @Get('email')
  findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}