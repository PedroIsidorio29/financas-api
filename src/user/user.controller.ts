import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.create(name, email, password);
  }
}