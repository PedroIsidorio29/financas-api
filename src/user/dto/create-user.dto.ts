import { IsEmail } from '@/common/decorators/is-email.decorator';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "O campo nome é obrigatório!" })
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6, { message: "A senha deve conter no mínimo 6 caracteres!" })
  password: string;
}
