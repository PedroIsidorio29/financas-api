import { NonEmpty, IsEmail } from '@/common/decorators/validation.decorator';

export class CreateUserDto {
  @NonEmpty("O campo senha é obrigatório!")
  name: string;

  @IsEmail('Informe um email valido')
  email: string;

  @NonEmpty("O campo senha é obrigatório!")
  @IsEmail('123')
  password: string;
}
// @MinLength(6, { message: "A senha deve conter no mínimo 6 caracteres!" })
